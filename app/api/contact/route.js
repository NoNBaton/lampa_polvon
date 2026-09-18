import { NextResponse } from "next/server";

// Временное хранилище заказов в памяти
global.ordersDb = global.ordersDb || {};

function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

// 1. ОТПРАВКА НОВОГО ЗАКАЗА С САЙТА В TELEGRAM
export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !adminChatId) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены" },
        { status: 500 },
      );
    }

    const { name, phone, region, volume, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 },
      );
    }

    // Генерируем ID заказа без лишнего дефиса
    const orderId = "ORD" + Date.now().toString().slice(-6);

    // Сохраняем заказ в локальную память
    global.ordersDb[orderId] = {
      orderId,
      name,
      phone,
      region: region || "Не указан",
      volume: volume || "Не указан",
      message: message || "Отсутствует",
      price: null,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

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
      const errData = await res.text();
      console.error("Telegram API error:", errData);
      return NextResponse.json(
        { error: "Ошибка отправки в Telegram", details: errData },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ЗАКАЗЕ ДЛЯ ФРОНТЕНДА
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId || !global.ordersDb[orderId]) {
    return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
  }

  return NextResponse.json(global.ordersDb[orderId], { status: 200 });
}
