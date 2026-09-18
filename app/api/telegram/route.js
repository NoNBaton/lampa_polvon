import { NextResponse } from "next/server";

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 500 });
    }

    // 1. ОБРАБОТКА НАЖАТИЯ КНОПКИ В TELEGRAM
    if (body.callback_query) {
      const callback = body.callback_query;
      const data = callback.data || "";
      const fromChatId = callback.message.chat.id;

      // Обязательно отвечаем Telegram
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callback.id }),
      });

      if (data.startsWith("set_price_")) {
        const orderId = data.replace("set_price_", "");

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

    // 2. ОБРАБОТКА ВВОДА ЦЕНЫ (Ответ на сообщение)
    if (body.message && body.message.reply_to_message && body.message.text) {
      const msg = body.message;
      const fromChatId = msg.chat.id;
      const replyText = msg.reply_to_message.text || "";

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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
