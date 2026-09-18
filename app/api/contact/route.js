import { NextResponse } from "next/server";

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN not set" },
        { status: 500 },
      );
    }

    // 1. ОБРАБОТКА НАЖАТИЯ КНОПКИ "Указать цену"
    if (body.callback_query) {
      const callback = body.callback_query;
      const data = callback.data || "";
      const fromChatId = callback.message.chat.id;

      // Обязательно подтверждаем клик по кнопке
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callback.id }),
      });

      if (data.startsWith("set_price_")) {
        const orderId = data.replace("set_price_", "");

        // Отправляем запрос цены и просим ответить (ForceReply)
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✍️ Напишите цену для заказа #${orderId} в ответ на это сообщение:`,
            reply_markup: { force_reply: true },
          }),
        });
      }
      return NextResponse.json({ ok: true });
    }

    // 2. ОБРАБОТКА ОТВЕТА С ЦЕНОЙ
    if (body.message && body.message.reply_to_message && body.message.text) {
      const msg = body.message;
      const fromChatId = msg.chat.id;
      const replyText = msg.reply_to_message.text || "";

      // Извлекаем номер заказа из сообщения бота
      const match = replyText.match(/#ORD\d+/);
      if (match) {
        const orderId = match[0];
        const enteredPrice = msg.text.trim();

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✅ Цена для заказа *${orderId}* установлена: *${escapeMarkdown(enteredPrice)}*`,
            parse_mode: "Markdown",
          }),
        });

        return NextResponse.json({ ok: true });
      }
    }

    // 3. ОТПРАВКА НОВОГО ЗАКАЗА С САЙТА
    const { name, phone, region, volume, message } = body;

    if (!name || !phone) {
      return NextResponse.json({
        ok: true,
        ignored: "Not a contact form submission",
      });
    }

    const orderId = "ORD" + Date.now().toString().slice(-6);

    const text =
      `📬 *Новый заказ #${orderId}*\n\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📞 *Телефон:* ${escapeMarkdown(phone)}\n` +
      `📍 *Регион:* ${escapeMarkdown(region || "Не указан")}\n` +
      `📦 *Состав заказа:* ${escapeMarkdown(volume || "Не указан")}\n` +
      `💬 *Сообщение:* ${escapeMarkdown(message || "Отсутствует")}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: text,
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "💰 Указать цену",
                  callback_data: `set_price_${orderId}`,
                },
              ],
            ],
          },
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "TG API Error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
