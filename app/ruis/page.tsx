'use client';
import { useState, useEffect } from 'react';
import CheckoutOverlay from '@/components/CheckoutOverlay';

const POSTERS = [
  { id: 1, title: "BRAK", price: "€75", thumb: "/posters/ruis/brak-thumb.jpg", full: "/posters/ruis/brak-full.jpg", desc: "Broken signal. The scanner head moving too fast, or the surface refusing to cooperate — the result is this." },
  { id: 2, title: "GRIJS", price: "€70", thumb: "/posters/ruis/grijs-thumb.jpg", full: "/posters/ruis/grijs-full.jpg", desc: "Grey static. The colour between channels, between signals — the noise the machine makes when it has nothing to say." },
  { id: 3, title: "STOR", price: "€80", thumb: "/posters/ruis/stor-thumb.jpg", full: "/posters/ruis/stor-full.jpg", desc: "Interference. Something disrupting the read — a hand, a shadow, a surface that refused to be flat." },
  { id: 4, title: "RAWK", price: "€85", thumb: "/posters/ruis/rawk-thumb.jpg", full: "/posters/ruis/rawk-full.jpg", desc: "Raw and corrupted. Data the machine couldn't process cleanly — the error that became the image." }
];

export default function Ruis() {
  const [mounted, setMounted] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<typeof POSTERS[0] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<typeof POSTERS[0][]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('poster-cart');
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error("Cart error:", e); }
    }
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPoster]);

  const updateCart = (newCart: typeof POSTERS[0][]) => {
    setCart(newCart);
    localStorage.setItem('poster-cart', JSON.stringify(newCart));
  };

  const addToCart = (poster: typeof POSTERS[0]) => {
    updateCart([...cart, poster]);
    setSelectedPoster(null);
    setIsZoomed(false);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCheckoutOpen(true);
  };

  if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

  return (
    <main className="min-h-screen font-mono overflow-x-hidden" style={{ background: '#0a0a0a', color: '#39ff14' }}>
      <style>{`
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes glitch-shift {
          0% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
          25% { clip-path: inset(40% 0 50% 0); transform: translate(4px, 0); }
          50% { clip-path: inset(70% 0 20% 0); transform: translate(-2px, 0); }
          75% { clip-path: inset(20% 0 70% 0); transform: translate(2px, 0); }
          100% { clip-path: inset(95% 0 0 0); transform: translate(0, 0); }
        }
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          color: #ff0040;
          animation: glitch-shift 0.15s steps(1) forwards;
        }
        .scanline {
          position: fixed; inset: 0; height: 2px;
          background: rgba(57,255,20,0.08);
          animation: scanline 6s linear infinite;
          pointer-events: none; z-index: 999;
        }
      `}</style>

      <div className="scanline" />

      <div className="text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b" style={{ borderColor: '#39ff14', color: '#39ff14', background: '#0a0a0a' }}>
        FREE_CARBON-NEUTRAL_WORLDWIDE_SHIPPING — ALL_EDITIONS
      </div>

      <nav className="flex justify-between items-center p-6 border-b sticky top-0 z-40" style={{ borderColor: '#39ff1440', background: 'rgba(10,10,10,0.95)' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[9px] font-mono uppercase tracking-widest transition-colors" style={{ color: '#39ff1460' }}>← KALT</a>
          <div className="w-px h-4" style={{ background: '#39ff1430' }} />
          <div>
            <h1 className={`text-3xl font-black tracking-tighter italic leading-none relative ${glitch ? 'glitch-text' : ''}`} data-text="RUIS" style={{ color: '#39ff14' }}>RUIS</h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] mt-0.5" style={{ color: '#39ff1460' }}>Scanner Abstractions</p>
          </div>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-xs font-black border-2 px-6 py-2 uppercase tracking-widest transition-all shadow-[2px_2px_0px_0px_rgba(57,255,20,0.4)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none" style={{ borderColor: '#39ff14', color: '#39ff14' }}>
          <span className="md:hidden">⊹ {cart.length}</span>
          <span className="hidden md:inline">Collection ({cart.length})</span>
        </button>
      </nav>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full" style={{ borderLeft: '1px solid #39ff1430' }}>
        {POSTERS.map((poster) => (
          <div key={poster.id} className="group cursor-pointer w-full" style={{ borderRight: '1px solid #39ff1430', borderBottom: '1px solid #39ff1430' }} onClick={() => setSelectedPoster(poster)}>
            <div className="aspect-[3/4] overflow-hidden border-b relative" style={{ borderColor: '#39ff1430' }}>
              <img src={poster.thumb} alt={poster.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100" />
            </div>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-end">
                <h3 className="text-sm md:text-lg font-black tracking-widest" style={{ color: '#39ff14' }}>{poster.title}</h3>
                <p className="text-xs md:text-sm font-black" style={{ color: '#39ff1480' }}>{poster.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: '#0a0a0a' }}>

          {/* MOBILE */}
          <div className="md:hidden flex flex-col min-h-screen">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 z-10" style={{ borderColor: '#39ff1440', background: '#0a0a0a' }}>
              <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: '#39ff1460' }}>RUIS // NOISE_GENERATOR</p>
              <button onClick={() => { setSelectedPoster(null); setShowDesc(false); }} className="text-xs font-black border-2 px-4 py-1 uppercase" style={{ borderColor: '#39ff14', color: '#39ff14' }}>EXIT ✕</button>
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden border-b" style={{ borderColor: '#39ff1440' }}>
              <img src={selectedPoster.full} className="w-full h-full object-cover" alt={selectedPoster.title} />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: '#39ff1460' }}>SERIES_03</p>
                <h2 className="text-4xl font-black uppercase tracking-widest" style={{ color: '#39ff14' }}>{selectedPoster.title}</h2>
              </div>
              <p className="text-sm leading-relaxed italic border-l-2 pl-4" style={{ borderColor: '#39ff1460', color: '#39ff1480' }}>{selectedPoster.desc}</p>
              <div className="p-4 border text-[10px] uppercase space-y-2" style={{ borderColor: '#39ff1430', background: '#39ff1405' }}>
                <div className="flex justify-between" style={{ color: '#39ff1460' }}><span>Output</span><span style={{ color: '#39ff14' }}>200gsm Silk stock</span></div>
                <div className="flex justify-between" style={{ color: '#39ff1460' }}><span>Ink</span><span style={{ color: '#39ff14' }}>Pigment Giclée</span></div>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-3 border-b pb-1 inline-block" style={{ borderColor: '#39ff1440', color: '#39ff1460' }}>More from RUIS</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                    <div key={related.id} className="cursor-pointer border aspect-[3/4] overflow-hidden" style={{ borderColor: '#39ff1430' }} onClick={() => { setSelectedPoster(related); }}>
                      <img src={related.thumb} className="w-full h-full object-cover grayscale opacity-50" alt={related.title} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(selectedPoster)} className="w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_#39ff1440] active:translate-x-1 active:translate-y-1 active:shadow-none" style={{ background: '#39ff14', color: '#0a0a0a' }}>
                EXECUTE ORDER — {selectedPoster.price}
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-center gap-16 w-full h-screen p-12 max-w-7xl mx-auto">
            <button onClick={() => { setSelectedPoster(null); setIsZoomed(false); setShowDesc(false); }} className="absolute top-4 right-4 text-xs font-black border-2 border-[#39ff14] px-4 py-2 uppercase z-[70] bg-black text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0a0a0a] transition-all">EXIT ✕</button>
            <div className={`relative overflow-hidden border-4 border-[#39ff14] flex-1 h-[85vh] transition-all ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in shadow-[12px_12px_0px_0px_#39ff1440]'}`} onClick={() => setIsZoomed(!isZoomed)}>
              <img src={selectedPoster.full} className={`w-full h-full object-contain transition-transform duration-500 ${isZoomed ? 'scale-[3]' : 'scale-100'}`} alt="Detail" />
            </div>
            <div className="w-96 flex flex-col h-[85vh]">
              <div className="pb-6 border-b border-[#39ff1440] mb-6">
                <p className="text-[10px] uppercase tracking-[0.4em] mb-2 text-[#39ff1460]">SERIES_03 // NOISE_GENERATOR</p>
                <h2 className="text-5xl font-black uppercase tracking-widest text-[#39ff14]">{selectedPoster.title}</h2>
              </div>
              <div className="flex-1 space-y-8 overflow-y-auto">
                <div>
                  <button onClick={() => setShowDesc(!showDesc)} className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-2 text-[#39ff1460] hover:text-[#39ff14]">
                    <span>{showDesc ? '−' : '+'}</span> {showDesc ? 'CLOSE_NOTE' : 'SYSTEM_LOG'}
                  </button>
                  {showDesc && <p className="text-sm leading-relaxed border-l-2 border-[#39ff1460] pl-6 mt-4 italic text-[#39ff1480]">{selectedPoster.desc}</p>}
                </div>
                <div className="p-6 border border-[#39ff1430] bg-[#39ff1405] text-[10px] uppercase space-y-2">
                  <div className="flex justify-between text-[#39ff1460]"><span>Output</span><span className="text-[#39ff14]">200gsm Silk stock</span></div>
                  <div className="flex justify-between text-[#39ff1460]"><span>Ink</span><span className="text-[#39ff14]">Pigment Giclée</span></div>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-4 border-b border-[#39ff1440] pb-1 inline-block text-[#39ff1460]">More from RUIS</p>
                  <div className="grid grid-cols-3 gap-3">
                    {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                      <div key={related.id} className="cursor-pointer border border-[#39ff1430] aspect-[3/4] overflow-hidden group" onClick={() => { setSelectedPoster(related); setIsZoomed(false); }}>
                        <img src={related.thumb} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-all" alt={related.title} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t-4 border-[#39ff14] mt-6">
                <button onClick={() => addToCart(selectedPoster)} className="w-full bg-[#39ff14] text-[#0a0a0a] py-6 text-sm font-black uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_#39ff1440] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                  EXECUTE ORDER — {selectedPoster.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full border-l-4 p-8 flex flex-col shadow-[-20px_0_50px_rgba(57,255,20,0.1)]" style={{ background: '#0a0a0a', borderColor: '#39ff14' }}>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black tracking-widest">YOUR_COLLECTION</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold border px-4 py-1 uppercase" style={{ borderColor: '#39ff14', color: '#39ff14' }}>CLOSE</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-40 flex items-center justify-center border border-dashed" style={{ borderColor: '#39ff1430' }}>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: '#39ff1450' }}>NO_EDITIONS_SELECTED</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-8 pb-8 border-b-2 last:border-0" style={{ borderColor: '#39ff1420' }}>
                    <img src={item.thumb} className="w-24 h-24 object-cover border grayscale" style={{ borderColor: '#39ff1440' }} alt={item.title} />
                    <div className="flex-1">
                      <h4 className="font-black tracking-widest text-sm">{item.title}</h4>
                      <p className="text-xs mt-1" style={{ color: '#39ff1460' }}>{item.price}</p>
                      <button onClick={() => removeFromCart(idx)} className="text-[9px] uppercase font-bold underline tracking-widest mt-2" style={{ color: '#ff0040' }}>REMOVE_—</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t-4 pt-8" style={{ borderColor: '#39ff14' }}>
              <div className="flex justify-between font-black text-2xl mb-8 tracking-widest">
                <span>TOTAL</span><span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] border-2 transition-all disabled:opacity-30" style={{ background: '#39ff14', color: '#0a0a0a', borderColor: '#39ff14' }}>
                EXECUTE_ORDER
              </button>
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && (
        <CheckoutOverlay cart={cart} onClose={() => setCheckoutOpen(false)} />
      )}
    </main>
  );
}