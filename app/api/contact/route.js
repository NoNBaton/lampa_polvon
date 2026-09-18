import { NextResponse } from "next/server";

// Функция экранирования Markdown (чтобы не было ошибок отправки при спецсимволах)
function escapeMarkdown(text = "") {
  return String(text).replace(/[_*`\[\]~>#+\-=|{}.!]/g, "\\$&");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const siteUrl = process.env.NEXTAUTH_URL; // Убедитесь, что эта переменная задана в Netlify как https://polvonlamp.netlify.app

    // Если нет токена, возвращаем ошибку, так как уведомление админу — обязательная часть
    if (!token) {
      return NextResponse.json(
        { error: "TELEGRAM_BOT_TOKEN не настроен" },
        { status: 500 },
      );
    }

    // Обработка данных формы
    const { name, phone, region, volume, message } = body;

    // Валидация: если нет имени или телефона — это не заявка
    if (!name || !phone) {
      return NextResponse.json({
        ok: true,
        ignored: "Not a contact form submission",
      });
    }

    // Создаем ID заказа ( ORD + последние 6 цифр таймстампа)
    const orderId = "ORD" + Date.now().toString().slice(-6);

    // Формируем текст сообщения с Markdown
    const text =
      `📬 *Новый заказ #${orderId}*\n\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📞 *Телефон:* ${escapeMarkdown(phone)}\n` +
      `📍 *Регион:* ${escapeMarkdown(region || "Не указан")}\n` +
      `📦 *Состав заказа:* ${escapeMarkdown(volume || "Не указан")}\n` +
      `💬 *Сообщение:* ${escapeMarkdown(message || "Отсутствует")}`;

    // Определяем чат для отправки (всегда отправляем админу)
    const targetChat = chatId;

    if (!targetChat) {
      return NextResponse.json(
        { error: "TELEGRAM_CHAT_ID не настроен" },
        { status: 500 },
      );
    }

    // Формируем Inline-кнопки (без callback_data, так как вебхука нет)
    const inline_keyboard = [];

    // Кнопка 1: Открывает админ-панель на сайте для указания цены
    if (siteUrl) {
      inline_keyboard.push([
        {
          text: "💰 Указать цену на сайте",
          url: `${siteUrl}/admin/orders/${orderId}`, // Замените на реальный URL вашей админки
        },
      ]);
    }

    // Кнопка 2: Открывает ЛС с менеджером в Telegram
    // Замените YOUR_MANAGER_USERNAME на реальный юзернейм менеджера без @
    const managerUsername = process.env.MANAGER_TELEGRAM_USERNAME;
    if (managerUsername) {
      inline_keyboard.push([
        {
          text: "👨‍💻 Написать менеджеру в ЛС",
          url: `https://t.me/${managerUsername}`,
        },
      ]);
    }

    // Отправляем сообщение в Telegram напрямую
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: targetChat,
          text: text,
          parse_mode: "Markdown",
          reply_markup:
            inline_keyboard.length > 0
              ? {
                  inline_keyboard: inline_keyboard,
                }
              : undefined,
        }),
      },
    );

    // Обработка ошибок Telegram API
    if (!res.ok) {
      const errData = await res.text();
      console.error("Telegram API error:", errData);
      return NextResponse.json(
        { error: "Ошибка при отправке в Telegram", details: errData },
        { status: 500 },
      );
    }

    // Все прошло успешно
    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET метод больше не используется глобально для хранения заказов,
// так как Serverless не хранит состояние.
export async function GET(request) {
  return NextResponse.json(
    { error: "Этот метод больше не поддерживается" },
    { status: 405 },
  );
}
