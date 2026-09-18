import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing env vars:", { token: !!token, chatId: !!chatId });
      return NextResponse.json(
        {
          error: "Переменные TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы",
        },
        { status: 500 },
      );
    }

    const { name, phone, region, volume, message } = body;

    // Формируем простой текст
    const text =
      `📬 *Новый заказ с сайта*\n\n` +
      `👤 *Имя:* ${name || "Не указано"}\n` +
      `📞 *Телефон:* ${phone || "Не указан"}\n` +
      `📍 *Регион:* ${region || "Не указан"}\n` +
      `📦 *Состав заказа:* ${volume || "Не указан"}\n` +
      `💬 *Сообщение:* ${message || "Отсутствует"}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      },
    );

    const tgData = await res.json();

    if (!res.ok || !tgData.ok) {
      console.error("Telegram API Error:", tgData);
      return NextResponse.json(
        { error: "Ошибка Telegram API", details: tgData },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
