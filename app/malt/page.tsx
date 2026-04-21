'use client';
import { useState, useEffect } from 'react';
import CheckoutOverlay from '../../components/CheckoutOverlay';

const POSTERS = [
  { id: 1, title: "FLOK", price: "€75", thumb: "/posters/malt/flok-thumb.jpg", full: "/posters/malt/flok-full.jpg", desc: "Dense, clustered pigment. Paint pressed into canvas until the surface gives way — colour meeting resistance." },
  { id: 2, title: "STOF", price: "€80", thumb: "/posters/malt/stof-thumb.jpg", full: "/posters/malt/stof-full.jpg", desc: "The matter of painting. Raw material before it becomes image — pigment, binder, the physical fact of the work." },
  { id: 3, title: "BREI", price: "€70", thumb: "/posters/malt/brei-thumb.jpg", full: "/posters/malt/brei-full.jpg", desc: "Wet paint pulled across wet paint. The moment before it sets — gesture frozen mid-motion, colour not yet decided." },
  { id: 4, title: "KRAS", price: "€85", thumb: "/posters/malt/kras-thumb.jpg", full: "/posters/malt/kras-full.jpg", desc: "A mark made without thinking. The scratch beneath the surface, the action that started everything." }
];

export default function Malt() {
  const [mounted, setMounted] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<typeof POSTERS[0] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<typeof POSTERS[0][]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('poster-cart');
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error("Cart error:", e); }
    }
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

  if (!mounted) return <div className="min-h-screen" style={{ background: '#f5f0eb' }} />;

  return (
    <main className="min-h-screen font-sans" style={{ background: '#f5f0eb', color: '#2a1f1a' }}>
      <div style={{ background: '#2a1f1a', color: '#f5f0eb' }} className="text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b border-stone-800">
        Free Carbon-Neutral Worldwide Shipping — All Editions
      </div>

      <nav className="flex justify-between items-center p-6 border-b border-stone-400 sticky top-0 backdrop-blur-md z-40" style={{ background: 'rgba(245,240,235,0.92)' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[9px] font-mono uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors">← KALT</a>
          <div className="w-px h-4 bg-stone-300" />
          <div>
            <h1 className="text-3xl font-black italic leading-none" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>MALT</h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>Painting Fragments</p>
          </div>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-xs font-black border-2 px-6 py-2 uppercase tracking-widest transition-all shadow-[2px_2px_0px_0px_rgba(42,31,26,1)]" style={{ borderColor: '#2a1f1a', color: '#2a1f1a' }}>
          <span className="md:hidden">⊹ {cart.length}</span>
          <span className="hidden md:inline">Collection ({cart.length})</span>
        </button>
      </nav>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-l border-stone-400">
        {POSTERS.map((poster) => (
          <div key={poster.id} className="group cursor-pointer border-r border-b border-stone-400" onClick={() => setSelectedPoster(poster)}>
            <div className="aspect-[3/4] overflow-hidden bg-[#e8e0d8] border-b border-stone-400">
              <img src={poster.thumb} alt={poster.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
            </div>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-end">
                <h3 className="text-sm md:text-lg font-black italic" style={{ fontFamily: 'Georgia, serif' }}>{poster.title}</h3>
                <p className="text-xs md:text-sm font-mono font-black text-stone-600">{poster.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: '#f5f0eb' }}>

          {/* MOBILE */}
          <div className="md:hidden flex flex-col min-h-screen">
            <div className="flex justify-between items-center p-4 border-b-2 border-stone-400 sticky top-0 z-10" style={{ background: '#f5f0eb' }}>
              <p className="text-[9px] font-mono uppercase tracking-widest text-stone-400">MALT — Painting Fragments</p>
              <button onClick={() => { setSelectedPoster(null); setShowDesc(false); }} className="text-xs font-black border-2 border-stone-800 px-4 py-1 uppercase">Exit ✕</button>
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden border-b-2 border-stone-400">
              <img src={selectedPoster.full} className="w-full h-full object-cover" alt={selectedPoster.title} />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-stone-400 mb-2">Edition</p>
                <h2 className="text-4xl font-black italic leading-none" style={{ fontFamily: 'Georgia, serif' }}>{selectedPoster.title}</h2>
                <div className="h-1.5 w-12 mt-4" style={{ background: '#2a1f1a' }} />
              </div>
              <p className="text-sm leading-relaxed italic border-l-4 border-stone-300 pl-4 text-stone-600" style={{ fontFamily: 'Georgia, serif' }}>{selectedPoster.desc}</p>
              <div className="p-4 border border-stone-300 bg-stone-100/50 font-mono text-[10px] uppercase space-y-2">
                <div className="flex justify-between text-stone-400"><span>Stock</span><span style={{ color: '#2a1f1a' }}>200gsm Silk</span></div>
                <div className="flex justify-between text-stone-400"><span>Ink</span><span style={{ color: '#2a1f1a' }}>Pigment Giclée</span></div>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-3 border-b border-stone-400 pb-1 inline-block text-stone-400">More from MALT</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                    <div key={related.id} className="cursor-pointer border border-stone-300 aspect-[3/4] overflow-hidden" onClick={() => setSelectedPoster(related)}>
                      <img src={related.thumb} className="w-full h-full object-cover" alt={related.title} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(selectedPoster)} className="w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_#2a1f1a40]" style={{ background: '#2a1f1a', color: '#f5f0eb' }}>
                Add to Collection — {selectedPoster.price}
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-center gap-16 w-full h-screen p-12 max-w-7xl mx-auto">
            <button onClick={() => { setSelectedPoster(null); setIsZoomed(false); setShowDesc(false); }}
              className="absolute top-4 right-4 text-xs font-black border-2 border-[#2a1f1a] px-4 py-2 uppercase z-[70] bg-[#f5f0eb]">
              Exit ✕
            </button>
            <div className={`relative overflow-hidden border-4 border-[#2a1f1a] flex-1 h-[85vh] transition-all duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in shadow-[12px_12px_0px_0px_#2a1f1a]'}`}
              onClick={() => setIsZoomed(!isZoomed)}>
              <img src={selectedPoster.full} className={`w-full h-full object-contain transition-transform duration-500 ${isZoomed ? 'scale-[3]' : 'scale-100'}`} alt="Detail" />
            </div>
            <div className="w-96 flex flex-col h-[85vh] overflow-y-auto">
              <div className="pb-6 border-b border-stone-400/40 mb-6">
                <p className="text-[10px] uppercase tracking-[0.4em] mb-2 font-mono text-stone-400">SERIES_02 // MALT</p>
                <h2 className="text-5xl font-black italic leading-none" style={{ fontFamily: 'Georgia, serif' }}>{selectedPoster.title}</h2>
                <div className="h-1.5 w-16 bg-[#2a1f1a] mt-6" />
              </div>
              <div className="flex-1 space-y-8">
                <div>
                  <button onClick={() => setShowDesc(!showDesc)} className="text-[9px] font-mono uppercase tracking-widest flex items-center gap-2 text-stone-400">
                    <span>{showDesc ? '−' : '+'}</span> {showDesc ? 'Hide Note' : 'Artist Note'}
                  </button>
                  {showDesc && <p className="text-sm leading-relaxed border-l-4 border-stone-300 pl-6 mt-4 italic text-stone-600" style={{ fontFamily: 'Georgia, serif' }}>{selectedPoster.desc}</p>}
                </div>
                <div className="p-6 border border-stone-300 bg-stone-100/50 font-mono text-[10px] uppercase space-y-2">
                  <div className="flex justify-between text-stone-400"><span>Stock</span><span className="text-[#2a1f1a]">200gsm Silk</span></div>
                  <div className="flex justify-between text-stone-400"><span>Ink</span><span className="text-[#2a1f1a]">Pigment Giclée</span></div>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-4 border-b border-stone-400 pb-1 inline-block text-stone-400">More from MALT</p>
                  <div className="grid grid-cols-3 gap-3">
                    {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                      <div key={related.id} className="cursor-pointer border border-stone-300 aspect-[3/4] overflow-hidden group" onClick={() => setSelectedPoster(related)}>
                        <img src={related.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt={related.title} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t-4 border-[#2a1f1a] mt-6">
                <button onClick={() => addToCart(selectedPoster)} className="w-full bg-[#2a1f1a] text-[#f5f0eb] py-6 text-sm font-black uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_#2a1f1a40] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                  Add to Collection — {selectedPoster.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full border-l-4 p-8 flex flex-col" style={{ background: '#f5f0eb', borderColor: '#2a1f1a' }}>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>Your Collection</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold border-2 border-stone-800 px-4 py-1">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-stone-300">
                  <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">No editions selected</p>
                </div>
              ) : cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-8 pb-8 border-b-2 border-stone-200 last:border-0">
                  <img src={item.thumb} className="w-24 h-24 object-cover border-2 border-stone-400" alt={item.title} />
                  <div className="flex-1">
                    <h4 className="font-black italic text-sm" style={{ fontFamily: 'Georgia, serif' }}>{item.title}</h4>
                    <p className="font-mono text-xs text-stone-500 mt-1">{item.price}</p>
                    <button onClick={() => removeFromCart(idx)} className="text-[9px] uppercase font-bold text-red-700 underline tracking-widest mt-2">Remove —</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-4 border-stone-800 pt-8">
              <div className="flex justify-between font-black text-2xl mb-8 italic" style={{ fontFamily: 'Georgia, serif' }}>
                <span>Total</span><span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_#2a1f1a] disabled:opacity-30" style={{ background: '#2a1f1a', color: '#f5f0eb' }}>
                Complete Order
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