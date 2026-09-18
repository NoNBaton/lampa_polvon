import { NextResponse } from "next/server";

// ВАЖНО: На Netlify (Serverless) global переменные сбрасываются.
// Для теста это сработает, но если между нажатием кнопки и вводом цены пройдет > 10 сек,
// бот может "забыть", какой заказ мы редактируем. В идеале тут нужен Redis/Database.
global.awaitingPrice = global.awaitingPrice || {};

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_CHAT_ID; // ID чата админа

    if (!token) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN not set" },
        { status: 500 },
      );
    }

    // --- 1. ОБРАБОТКА НАЖАТИЯ КНОПКИ (Callback Query) ---
    if (body.callback_query) {
      const callback = body.callback_query;
      const data = callback.data || "";
      const fromChatId = callback.message.chat.id;

      // Обязательно отвечаем Telegram, что получили колбэк
      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: callback.id }),
      });

      if (data.startsWith("set_price_")) {
        const orderId = data.replace("set_price_", "");
        // Запоминаем, что этот админ сейчас вводит цену для этого заказа
        global.awaitingPrice[fromChatId] = orderId;

        // Просим ввести цену с ForceReply (чтобы ответ привязался к сообщению)
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✍️ Введите цену для заказа *#${orderId}* (ответьте на это сообщение):`,
            parse_mode: "Markdown",
            reply_markup: { force_reply: true },
          }),
        });
      }
      return NextResponse.json({ ok: true });
    }

    // --- 2. ОБРАБОТКА ВВОДА ЦЕНЫ (Ответ на сообщение) ---
    if (body.message && body.message.reply_to_message && body.message.text) {
      const msg = body.message;
      const fromChatId = msg.chat.id;

      // Проверяем, ждем ли мы цену от этого пользователя
      const targetOrderId = global.awaitingPrice[fromChatId];

      if (targetOrderId) {
        const enteredPrice = msg.text.trim();

        // Удаляем из состояния ожидания
        delete global.awaitingPrice[fromChatId];

        // ЗДЕСЬ МОЖНО ДОБАВИТЬ ЛОГИКУ СОХРАНЕНИЯ ЦЕНЫ В БАЗУ ДАННЫХ

        // Подтверждаем админу
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✅ Цена для заказа *#${targetOrderId}* установлена: *${escapeMarkdown(enteredPrice)}*`,
            parse_mode: "Markdown",
          }),
        });

        return NextResponse.json({ ok: true });
      }
    }

    // --- 3. ОБРАБОТКА НОВОГО ЗАКАЗА С САЙТА ---
    const { name, phone, region, volume, message } = body;

    // Если нет имени/телефона и это не апдейт от ТГ — игнорируем
    if (!name || !phone) {
      return NextResponse.json({ ok: true, ignored: "Not a form submission" });
    }

    const orderId = "ORD" + Date.now().toString().slice(-6);

    const text =
      `📬 *Новый заказ #${orderId}*\n\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📞 *Телефон:* ${escapeMarkdown(phone)}\n` +
      `📍 *Регион:* ${escapeMarkdown(region || "Не указан")}\n` +
      `📦 *Состав заказа:* ${escapeMarkdown(volume || "Не указан")}\n` +
      `💬 *Сообщение:* ${escapeMarkdown(message || "Отсутствует")}`;

    // Отправляем сообщение с инлайн-кнопкой
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
      console.error("TG error:", await res.text());
      return NextResponse.json({ error: "TG API Error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
