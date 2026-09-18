import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Инициализируем плагин
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

// Оборачиваем экспорт
export default withNextIntl(nextConfig);