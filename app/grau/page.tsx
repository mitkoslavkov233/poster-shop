'use client';
import { useState, useEffect } from 'react';
import CheckoutOverlay from '@/components/CheckoutOverlay';

const POSTERS = [
  { id: 1, title: "TOR", price: "€85", thumb: "/posters/grau/tor-thumb.jpg", full: "/posters/grau/tor-full.jpg", desc: "A brutalist study on perception. Sharp angles meet industrial metallics in this distorted take on corporate symbolism." },
  { id: 2, title: "FICKA", price: "€75", thumb: "/posters/grau/ficka-thumb.jpg", full: "/posters/grau/ficka-full.jpg", desc: "Neon green spray meeting the heavy dark of midnight. A rhythmic capture of city lights and lanterns in the urban void." },
  { id: 3, title: "DOZY", price: "€65", thumb: "/posters/grau/dozy-thumb.jpg", full: "/posters/grau/dozy-full.jpg", desc: "Monochrome chaos. A high-contrast exploration of street calligraphy and numeric symbols found in the wild." },
  { id: 4, title: "BOCH", price: "€90", thumb: "/posters/grau/boch-thumb.jpg", full: "/posters/grau/boch-full.jpg", desc: "Rich brick textures meet scorched earth. A tactile, heavy-atmosphere piece that brings warmth and grit to a space." },
  { id: 5, title: "C-LI", price: "€80", thumb: "/posters/grau/c-li-thumb.jpg", full: "/posters/grau/c-li-full.jpg", desc: "The beauty of what's left behind. A clean, block-oriented composition focusing on depth and architectural shadows." },
  { id: 6, title: "STERN", price: "€95", thumb: "/posters/grau/stern-thumb.jpg", full: "/posters/grau/stern-full.jpg", desc: "Slick, fast, and metallic. A high-octane macro view of automotive curves and reflective silver surfaces." },
  { id: 7, title: "COCO", price: "€70", thumb: "/posters/grau/coco-thumb.jpg", full: "/posters/grau/coco-full.jpg", desc: "Raw gesture. Violent red spray overlapping thick black ink—a capture of energy and street-level artistic urgency." },
  { id: 8, title: "CHEERY STEEL", price: "€75", thumb: "/posters/grau/cheery-steel-thumb.jpg", full: "/posters/grau/cheery-steel-full.jpg", desc: "Minimalism through destruction. Subtle off-white tones and textures of weathered, layered paper on sun-bleached surfaces." }
];

export default function Grau() {
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

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <div className="bg-black text-white text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b border-black">
        Free Carbon-Neutral Worldwide Shipping — All Editions
      </div>

      {/* NAV */}
      <nav className="flex justify-between items-center p-6 border-b border-black sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-4">
          <a href="/" className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">← KALT</a>
          <div className="w-px h-4 bg-neutral-200" />
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">GRAU</h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mt-0.5">Streets of Sofia</p>
          </div>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="text-xs font-bold border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
          <span className="md:hidden">⊹ {cart.length}</span><span className="hidden md:inline">Collection ({cart.length})</span>
        </button>
      </nav>

      <div className="border-b border-black px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 mb-4">Series 01 — 8 Editions</p>
          <p className="text-sm text-neutral-500 leading-relaxed italic max-w-sm">A portable scanner dragged through the streets of Sofia. Each edition captures surfaces the city didn't know were being recorded — brick, metal, shadow, mark.</p>
        </div>
        <div className="md:text-right">
          <div className="inline-block border-l-2 border-black pl-6 text-left">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Editions from</p>
            <p className="text-4xl font-black tracking-tighter">€65</p>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border-l border-black">
        {POSTERS.map((poster) => (
          <div key={poster.id} className="group cursor-pointer border-r border-b border-black bg-white" onClick={() => setSelectedPoster(poster)}>
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100 border-b border-black">
              <img src={poster.thumb} alt={poster.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
            </div>
            <div className="p-3 md:p-6 transition-colors group-hover:bg-neutral-50">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-sm md:text-lg font-black uppercase tracking-tighter">{poster.title}</h3>
                  <p className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest hidden md:block">Edition No. {poster.id.toString().padStart(3, '0')}</p>
                </div>
                <p className="text-xs md:text-sm font-mono font-black">{poster.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="border-t border-black bg-white p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="border-l-2 border-black pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">Print Quality</h4>
            <p className="text-sm text-neutral-600 leading-relaxed italic font-medium">Museum-grade Giclée. 200gsm Silk stock. UV-resistant pigment inks built to last decades.</p>
          </div>
          <div className="border-l-2 border-black pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">Delivery</h4>
            <p className="text-sm text-neutral-600 leading-relaxed italic font-medium">Carbon-neutral shipping across Europe. Rolled in heavy-duty archival tubing.</p>
          </div>
          <div className="border-l-2 border-black pl-6">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4">The Studio</h4>
            <p className="text-sm text-neutral-600 leading-relaxed italic font-medium">Street-scanned in Sofia. Printed for walls that mean something.</p>
            <p className="text-sm text-neutral-600 leading-relaxed underline font-bold mt-2">studio@kalt.art</p>
          </div>
        </div>
      </footer>

      {/* CART OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full border-l-4 border-black p-8 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Your Collection</h2>
                <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mt-1">Selected Editions</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-xs font-bold border-2 border-black px-4 py-1 hover:bg-black hover:text-white transition-all uppercase">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-neutral-200">
                  <p className="text-neutral-400 font-bold uppercase text-[10px] tracking-widest">No editions selected</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-8 pb-8 border-b-2 border-neutral-100 last:border-0">
                    <img src={item.thumb} className="w-24 h-24 object-cover border-2 border-black" alt={item.title} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-black uppercase text-sm">{item.title}</h4>
                        <p className="font-mono text-xs text-neutral-500 mt-1">{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-[9px] uppercase font-bold text-red-600 text-left underline tracking-widest">Remove —</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t-4 border-black pt-8">
              <div className="flex justify-between font-black text-2xl mb-8 tracking-tighter uppercase italic">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-black text-white py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:bg-neutral-200 disabled:shadow-none disabled:border-neutral-200">
                Complete Order
              </button>
              <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 text-center mt-4">Secure checkout via Stripe</p>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          {/* MOBILE */}
          <div className="md:hidden flex flex-col min-h-screen">
            <div className="flex justify-between items-center p-4 border-b-2 border-black sticky top-0 bg-white z-10">
              <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">GRAU — Streets of Sofia</p>
              <button onClick={() => { setSelectedPoster(null); setShowDesc(false); }} className="text-xs font-black border-2 border-black px-4 py-1 uppercase">Exit ✕</button>
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden border-b-2 border-black">
              <img src={selectedPoster.full} className="w-full h-full object-cover" alt={selectedPoster.title} />
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Edition</p>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{selectedPoster.title}</h2>
                <div className="h-1.5 w-12 bg-black mt-4" />
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed italic border-l-4 border-neutral-100 pl-4">{selectedPoster.desc}</p>
              <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-[10px] uppercase tracking-widest space-y-2">
                <div className="flex justify-between text-neutral-400"><span>Stock</span><span className="text-black">200gsm Silk</span></div>
                <div className="flex justify-between text-neutral-400"><span>Ink</span><span className="text-black">Pigment Giclée</span></div>
                <div className="flex justify-between text-neutral-400"><span>Origin</span><span className="text-black">KALT Studios, Sofia</span></div>
              </div>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest font-bold mb-3 border-b border-black pb-1 inline-block">More from GRAU</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                    <div key={related.id} className="cursor-pointer border border-black aspect-[3/4] overflow-hidden" onClick={() => { setSelectedPoster(related); setIsZoomed(false); }}>
                      <img src={related.thumb} className="w-full h-full object-cover grayscale" alt={related.title} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(selectedPoster)} className="w-full bg-black text-white py-5 text-sm font-black uppercase tracking-[0.2em] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                Add to Collection — {selectedPoster.price}
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-center gap-16 w-full h-full p-12 max-w-7xl mx-auto">
            <button onClick={() => { setSelectedPoster(null); setIsZoomed(false); setShowDesc(false); }} className="absolute top-4 right-4 text-xs font-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all uppercase tracking-widest z-[70] bg-white">Exit ✕</button>
            <div className={`relative overflow-hidden border-4 border-black bg-neutral-100 flex-1 h-[85vh] transition-all duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'}`} onClick={() => setIsZoomed(!isZoomed)} onMouseMove={(e) => { if (!isZoomed) return; const { left, top, width, height } = e.currentTarget.getBoundingClientRect(); const x = ((e.pageX - left) / width) * 100; const y = ((e.pageY - (top + window.scrollY)) / height) * 100; const img = e.currentTarget.querySelector('img'); if (img) (img as HTMLImageElement).style.transformOrigin = `${x}% ${y}%`; }}>
              <img src={selectedPoster.full} className={`w-full h-full object-contain transition-transform duration-500 ease-out pointer-events-none ${isZoomed ? 'scale-[3]' : 'scale-100'}`} alt="Detail" />
            </div>
            <div className="w-96 flex flex-col h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="pb-6 border-b border-neutral-100 mb-6">
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.4em] mb-2 font-bold">GRAU — Streets of Sofia</p>
                <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">{selectedPoster.title}</h2>
                <div className="h-1.5 w-16 bg-black mt-6" />
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                <div>
                  <button onClick={() => setShowDesc(!showDesc)} className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-2">
                    <span>{showDesc ? '−' : '+'}</span> {showDesc ? 'Hide note' : 'Artist note'}
                  </button>
                  {showDesc && <p className="text-neutral-600 text-sm leading-relaxed italic border-l-4 border-neutral-100 pl-6 mt-4">{selectedPoster.desc}</p>}
                </div>
                <div className="space-y-4 bg-neutral-50 p-6 border border-neutral-200 font-mono text-[10px] uppercase tracking-widest font-black">
                  <div className="flex justify-between text-neutral-400"><span>Stock</span><span className="text-black">200gsm Silk</span></div>
                  <div className="flex justify-between text-neutral-400"><span>Ink</span><span className="text-black">Pigment Giclée</span></div>
                  <div className="flex justify-between text-neutral-400"><span>Origin</span><span className="text-black">KALT Studios, Sofia</span></div>
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest font-bold mb-4 border-b border-black pb-1 inline-block">More from GRAU</p>
                  <div className="grid grid-cols-3 gap-3">
                    {POSTERS.filter(p => p.id !== selectedPoster.id).slice(0, 3).map((related) => (
                      <div key={related.id} className="group cursor-pointer border border-black aspect-[3/4] overflow-hidden relative" onClick={() => { setSelectedPoster(related); setIsZoomed(false); }}>
                        <img src={related.thumb} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110" alt={related.title} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t-4 border-black mt-6">
                <button onClick={() => addToCart(selectedPoster)} className="bg-black text-white w-full py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  Add to Collection — {selectedPoster.price}
                </button>
              </div>
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