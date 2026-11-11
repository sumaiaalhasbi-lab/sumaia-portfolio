import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker, { About } from '@/components/Ticker';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import { Process, FAQ, FooterCTA } from '@/components/Process';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-bg-light text-ink-light dark:bg-bg-dark dark:text-ink-dark">
        <Navbar />
        <main>
          <Hero />
          <Ticker />
          <About />
          <Services />
          <Portfolio />
          <Process />
          <FAQ />
          <FooterCTA />
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
