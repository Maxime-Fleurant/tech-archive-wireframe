import React, { useState, useEffect } from 'react';
import Ticker from './components/Ticker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ItemOfTheDay from './components/ItemOfTheDay';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';

type ViewState = 'HOME' | 'PRODUCT';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigateToProduct = () => {
    window.scrollTo(0, 0);
    setCurrentView('PRODUCT');
  };

  const navigateToHome = () => {
    window.scrollTo(0, 0);
    setCurrentView('HOME');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col pt-8 transition-colors duration-300">
      {/* Ticker (Fixed at very top) */}
      <div onClick={navigateToProduct} className="cursor-pointer">
        <Ticker />
      </div>

      {/* Navigation (Sticky) */}
      {/* Added sticky class here to ensure Navbar sticks below the Ticker */}
      <div 
        className="sticky top-8 z-50"
        onClick={(e) => {
          // Rudimentary delegation: if a link/button is clicked, go to product
          if ((e.target as HTMLElement).closest('a, button, .cursor-pointer')) {
              // Logic to handle internal navigation if needed
          }
        }}
      >
        <Navbar 
            onSearchOpen={() => setIsSearchOpen(true)} 
            theme={theme}
            onToggleTheme={toggleTheme}
        />
      </div>

      {/* Main Content Router */}
      <main className="flex-grow flex flex-col">
        {currentView === 'HOME' ? (
            <>
                {/* Wrap components in divs that trigger navigation on click for demo purposes */}
                <div onClick={navigateToProduct} className="cursor-pointer">
                    <Hero />
                </div>
                <div onClick={navigateToProduct} className="cursor-pointer">
                    <ItemOfTheDay />
                </div>
            </>
        ) : (
            <ProductPage onBack={navigateToHome} />
        )}
      </main>

      {/* Footer - Always Visible */}
      <div onClick={navigateToProduct} className="cursor-pointer">
        <Footer />
      </div>

      {/* Modals */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}

export default App;