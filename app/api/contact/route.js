import { NextResponse } from "next/server";

// В production замените global на Redis/DB, но для теста оставляем global
global.ordersDb = global.ordersDb || {};
global.awaitingPrice = global.awaitingPrice || {};

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN не настроен" },
        { status: 500 },
      );
    }

    // 1. ОБРАБОТКА НАЖАТИЯ КНОПКИ В TELEGRAM (Callback Query)
    if (body.callback_query) {
      const callback = body.callback_query;
      const callbackId = callback.id;
      const data = callback.data || "";
      const fromChatId = callback.message.chat.id;

      await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callback_query_id: callbackId,
          text: "Введите цену в чате",
        }),
      });

      if (data.startsWith("set_price_")) {
        const orderId = data.replace("set_price_", "");
        global.awaitingPrice[fromChatId] = orderId;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✍️ Введите цену для заказа *#${orderId}* (ответьте на это сообщение):`,
            parse_mode: "Markdown",
            reply_markup: {
              force_reply: true,
              selective: true,
            },
          }),
        });
      }

      return NextResponse.json({ ok: true });
    }

    // 2. ОБРАБОТКА ВВОДА ЦЕНЫ В TELEGRAM (текстовое сообщение от админа)
    if (
      body.message &&
      body.message.text &&
      !body.message.text.startsWith("/")
    ) {
      const msg = body.message;
      const fromChatId = msg.chat.id;
      const targetOrderId = global.awaitingPrice[fromChatId];

      if (targetOrderId) {
        const enteredPrice = msg.text.trim();

        if (!global.ordersDb[targetOrderId]) {
          global.ordersDb[targetOrderId] = { orderId: targetOrderId };
        }

        global.ordersDb[targetOrderId].price = enteredPrice;
        global.ordersDb[targetOrderId].status = "confirmed";

        delete global.awaitingPrice[fromChatId];

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: fromChatId,
            text: `✅ Цена для заказа *#${targetOrderId}* установлена: *${escapeMarkdown(
              enteredPrice,
            )}*`,
            parse_mode: "Markdown",
          }),
        });

        return NextResponse.json({ ok: true });
      }
    }

    // 3. ОБРАБОТКА НОВОГО ЗАКАЗА С САЙТА (когда json приходит с полями name/phone)
    const { name, phone, region, volume, message } = body;

    // Если это не системный апдейт от телеграма и нет имени/телефона — игнорируем или возвращаем ошибку
    if (!name || !phone) {
      return NextResponse.json({
        ok: true,
        ignored: "Not a contact form submission",
      });
    }

    const orderId = "ORD" + Date.now().toString().slice(-6);

    global.ordersDb[orderId] = {
      orderId,
      name,
      phone,
      region: region || "Не указан",
      volume: volume || "Не указан",
      message: message || "Отсутствует",
      price: null,
      status: "pending",
    };

    const text =
      `📬 *Новый заказ #${orderId}*\n\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📞 *Телефон:* ${escapeMarkdown(phone)}\n` +
      `📍 *Регион:* ${escapeMarkdown(region || "Не указан")}\n` +
      `📦 *Состав заказа:* ${escapeMarkdown(volume || "Не указан")}\n` +
      `💬 *Сообщение:* ${escapeMarkdown(message || "Отсутствует")}`;

    const targetChat = chatId || (body.message && body.message.chat.id);

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: targetChat,
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
      const errData = await res.text();
      console.error("Telegram API error:", errData);
      return NextResponse.json(
        { error: "Ошибка при отправке в Telegram", details: errData },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId || !global.ordersDb[orderId]) {
    return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
  }

  return NextResponse.json(global.ordersDb[orderId], { status: 200 });
}
