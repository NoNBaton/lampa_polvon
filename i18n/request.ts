import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; // если есть файл routing, или можно проще через headers/cookies

export default getRequestConfig(async ({ requestLocale }) => {
  // Получаем текущий язык из запроса Next.js
  let locale = await requestLocale;

  // Если язык не определен, ставим русский по умолчанию
  if (!locale || !['ru', 'en'].includes(locale)) {
    locale = 'ru';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});