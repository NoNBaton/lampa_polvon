import ScrollBackground from "./components/ScrollBackground";
import ScrollSection from "./components/ScrollSection";
import Hero from "./components/Hero/page";
import Ab from "./components/About/page";
import Categories from "./components/Categories/page";
import News from "./components/News/page";
import Portfolio from "./components/Portfolio/Portfolio";
export default function Home() {
  return (
    <ScrollBackground>
      <main className="min-h-screen">
        <ScrollSection>
          <Hero />
        </ScrollSection>
        <ScrollSection>
          <Ab />
        </ScrollSection>
        <ScrollSection>
          <Categories />
        </ScrollSection>
        <ScrollSection>
          <Portfolio />
        </ScrollSection>
        <ScrollSection>
          <News />
        </ScrollSection>
      </main>
    </ScrollBackground>
  );
}
