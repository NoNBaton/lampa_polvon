import { NextResponse } from "next/server";

// Глобальная память для сохранения статусов и цен на сервере
global.ordersDb = global.ordersDb || {};

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN не установлен" },
        { status: 500 },
      );
    }

    // 1. ОБРАБОТКА НАЖАТИЯ КНОПКИ "💰 Указать цену"
    if (body.callback_query) {
      const callback = body.callback_query;
      const data = callback.data || "";
      const fromChatId = callback.message.chat.id;

      // Обязательно подтверждаем Telegram получение события нажатия
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callback.id }),
      });

      if (data.startsWith("set_price_")) {
        const orderId = data.replace("set_price_", "");

        // Отправляем запрос цены с ForceReply
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✍️ Напишите цену для заказа #${orderId} в ответ на это сообщение:`,
            reply_markup: {
              force_reply: true,
              selective: true,
            },
          }),
        });
      }
      return NextResponse.json({ ok: true });
    }

    // 2. ОБРАБОТКА ВВОДА ЦЕНЫ (Ответ админа на сообщение бота)
    if (body.message && body.message.reply_to_message && body.message.text) {
      const msg = body.message;
      const fromChatId = msg.chat.id;
      const replyText = msg.reply_to_message.text || "";

      // Извлекаем номер заказа (например, ORD905714)
      const match = replyText.match(/ORD\d+/);
      if (match) {
        const orderId = match[0];
        const enteredPrice = msg.text.trim();

        // Обновляем/создаем данные заказа в глобальном хранилище
        if (!global.ordersDb[orderId]) {
          global.ordersDb[orderId] = {};
        }

        global.ordersDb[orderId].price = enteredPrice;
        global.ordersDb[orderId].status = "confirmed";

        // Подтверждаем в Telegram
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✅ Цена для заказа *#${orderId}* установлена: *${escapeMarkdown(
              enteredPrice,
            )} сум*`,
            parse_mode: "Markdown",
          }),
        });

        return NextResponse.json({ ok: true });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
