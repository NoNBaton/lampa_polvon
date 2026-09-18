import "./globals.css";
import RegisterModal from "./components/RegisterModal/page";
import NavBar from "./components/NavBar/page";
import { Providers } from "./providers";
import Footer from "./components/Footer/page";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { WishlistProvider } from "./context/WishlistContext";
import PreloaderWrapper from "./components/PreloaderWrapper";

export default async function RootLayout({ children }) {
  const messages = await getMessages();

  return (
    <html lang="ru">
      <body>
        <PreloaderWrapper />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <WishlistProvider>
              <NavBar />
              <RegisterModal />
              {children}
              <Footer />
            </WishlistProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
