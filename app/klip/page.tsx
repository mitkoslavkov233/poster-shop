'use client';
import { useState, useEffect } from 'react';
import CheckoutOverlay from '../../components/CheckoutOverlay';

const POSTERS = [
  { id: 1, title: "KNIP", price: "€75", thumb: "/posters/klip/knip-thumb.jpg", full: "/posters/klip/knip-full.jpg", desc: "Cut and reassembled. Two images that never knew each other, forced into the same frame until they make sense." },
  { id: 2, title: "VLEK", price: "€70", thumb: "/posters/klip/vlek-thumb.jpg", full: "/posters/klip/vlek-full.jpg", desc: "The stain that stays. A mark that survived every layer placed over it — visible only because it refused to disappear." },
  { id: 3, title: "BLEK", price: "€80", thumb: "/posters/klip/blek-thumb.jpg", full: "/posters/klip/blek-full.jpg", desc: "Faded ink on found paper. Text that lost its meaning, image that lost its context — together they find a new one." },
  { id: 4, title: "PLAK", price: "€85", thumb: "/posters/klip/plak-thumb.jpg", full: "/posters/klip/plak-full.jpg", desc: "Pasted, layered, built up. The collage as construction — each element placed with intention, or without it." }
];

export default function Klip() {
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
    if (saved) setCart(JSON.parse(saved));
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

  if (!mounted) return <div className="min-h-screen" style={{ background: '#f5e800' }} />;

  return (
    <main className="min-h-screen font-sans" style={{ background: '#f5e800', color: '#0a0a0a' }}>
      <style>{`
        @keyframes tape {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        .tape { animation: tape 3s ease-in-out infinite; }
        .cut-border { border: 3px solid #0a0a0a; box-shadow: 4px 4px 0 #0a0a0a; }
      `}</style>

      <div className="text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b-4 border-black" style={{ background: '#0a0a0a', color: '#f5e800' }}>
        Free Carbon-Neutral Worldwide Shipping — All Editions
      </div>

      <nav className="flex justify-between items-center p-6 border-b-4 border-black sticky top-0 z-40" style={{ background: 'rgba(245,232,0,0.95)' }}>
        <div className="flex items-center gap-4">
          <a href="/" className="text-[9px] font-mono uppercase tracking-widest text-black/50 hover:text-black">← KALT</a>
          <div className="w-px h-4 bg-black/30" />
          <h1 className="text-3xl font-black uppercase italic" style={{ letterSpacing: '-0.02em' }}>KLIP</h1>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-xs font-black border-4 border-black px-6 py-2 uppercase cut-border hover:bg-black hover:text-yellow-300 transition-all">
          <span className="md:hidden">⊹ {cart.length}</span>
          <span className="hidden md:inline">Collection ({cart.length})</span>
        </button>
      </nav>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-l-4 border-black">
        {POSTERS.map((poster) => (
          <div key={poster.id} className="group cursor-pointer border-r-4 border-b-4 border-black" onClick={() => setSelectedPoster(poster)}>
            <div className="aspect-[3/4] overflow-hidden border-b-4 border-black relative">
              <img src={poster.thumb} alt={poster.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
            </div>
            <div className="p-3 md:p-6">
              <div className="flex justify-between items-end">
                <h3 className="text-sm md:text-lg font-black uppercase">{poster.title}</h3>
                <p className="text-xs md:text-sm font-black">{poster.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: '#f5e800' }}>

          {/* MOBILE */}
          <div className="md:hidden flex flex-col min-h-screen">
            <div className="flex justify-between items-center p-4 border-b-4 border-black sticky top-0 z-10" style={{ background: '#f5e800' }}>
              <p className="text-[9px] font-mono uppercase tracking-widest text-black/50">KLIP — Collages</p>
              <button onClick={() => { setSelectedPoster(null); setShowDesc(false); }} className="text-xs font-black border-4 border-black px-4 py-1 uppercase bg-yellow-300">Exit ✕</button>
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden border-b-4 border-black">
              <img src={selectedPoster.full} className="w-full h-full object-cover" alt={selectedPoster.title} />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <h2 className="text-4xl font-black uppercase italic leading-none">{selectedPoster.title}</h2>
              </div>
              <p className="text-sm leading-relaxed italic border-l-4 border-black pl-4">{selectedPoster.desc}</p>
              <div className="p-4 border-2 border-black bg-black/5 font-mono text-[10px] uppercase tracking-widest font-bold space-y-2">
                <div className="flex justify-between"><span>Stock</span><span>200gsm Silk</span></div>
                <div className="flex justify-between"><span>Studio</span><span>KALT Sofia</span></div>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-3 border-b-2 border-black pb-1 inline-block">More from KLIP</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                    <div key={related.id} className="cursor-pointer border-2 border-black aspect-[3/4] overflow-hidden" onClick={() => setSelectedPoster(related)}>
                      <img src={related.thumb} className="w-full h-full object-cover" alt={related.title} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(selectedPoster)} className="w-full bg-black text-yellow-300 py-5 text-sm font-black uppercase tracking-[0.2em] border-2 border-black shadow-[6px_6px_0px_0px_#000]">
                Add to Collection — {selectedPoster.price}
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-center gap-16 w-full h-screen p-12 max-w-7xl mx-auto">
            <button onClick={() => { setSelectedPoster(null); setIsZoomed(false); setShowDesc(false); }} className="absolute top-4 right-4 text-xs font-black border-4 border-black px-4 py-2 uppercase z-[70] bg-yellow-300">Exit ✕</button>
            <div className={`relative overflow-hidden border-4 border-black flex-1 h-[85vh] transition-all duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in shadow-[12px_12px_0px_0px_#000]'}`} onClick={() => setIsZoomed(!isZoomed)}>
              <img src={selectedPoster.full} className={`w-full h-full object-contain transition-transform duration-500 ${isZoomed ? 'scale-[3]' : 'scale-100'}`} alt="Detail" />
            </div>
            <div className="w-96 flex flex-col h-[85vh] overflow-y-auto">
              <h2 className="text-5xl font-black uppercase italic mb-6 leading-none">{selectedPoster.title}</h2>
              <div className="flex-1 space-y-8">
                <div>
                  <button onClick={() => setShowDesc(!showDesc)} className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-60 hover:opacity-100">
                    {showDesc ? '− Hide Note' : '+ Artist Note'}
                  </button>
                  {showDesc && <p className="text-sm leading-relaxed border-l-4 border-black pl-6 mt-4 italic">{selectedPoster.desc}</p>}
                </div>
                <div className="p-6 border-2 border-black bg-black/5 font-mono text-[10px] uppercase tracking-widest font-bold space-y-2">
                  <div className="flex justify-between"><span>Stock</span><span>200gsm Silk</span></div>
                  <div className="flex justify-between"><span>Studio</span><span>KALT Sofia</span></div>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest font-black mb-4 border-b-2 border-black pb-1 inline-block">More from KLIP</p>
                  <div className="grid grid-cols-3 gap-3">
                    {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                      <div key={related.id} className="cursor-pointer border-2 border-black aspect-[3/4] overflow-hidden" onClick={() => setSelectedPoster(related)}>
                        <img src={related.thumb} className="w-full h-full object-cover" alt={related.title} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => addToCart(selectedPoster)} className="w-full bg-black text-yellow-300 py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-black mt-8 shadow-[6px_6px_0px_0px_#000]">
                Add to Collection — {selectedPoster.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full border-l-4 border-black p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)]" style={{ background: '#f5e800' }}>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black uppercase italic">Your Collection</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold border-4 border-black px-4 py-1">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-black/20">
                  <p className="text-black/40 font-bold uppercase text-[10px] tracking-widest">No editions selected</p>
                </div>
              ) : cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 mb-8 pb-8 border-b-2 border-black/10 last:border-0">
                  <img src={item.thumb} className="w-20 h-20 object-cover border-2 border-black" alt={item.title} />
                  <div className="flex-1">
                    <h4 className="font-black uppercase text-sm">{item.title}</h4>
                    <p className="text-xs font-mono mt-1 text-black/60">{item.price}</p>
                    <button onClick={() => removeFromCart(idx)} className="text-[9px] uppercase font-bold text-red-700 underline mt-2">Remove —</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-4 border-black pt-8">
              <div className="flex justify-between font-black text-2xl mb-8 uppercase">
                <span>Total</span><span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full py-6 text-sm font-black uppercase tracking-[0.2em] border-4 border-black bg-black text-yellow-300 cut-border disabled:opacity-30">Complete Order</button>
            </div>
          </div>
        </div>
      )}

      {checkoutOpen && <CheckoutOverlay cart={cart} onClose={() => setCheckoutOpen(false)} />}
    </main>
  );
}