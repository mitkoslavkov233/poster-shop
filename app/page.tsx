'use client';
import { useState, useEffect } from 'react';

const SERIES = [
  {
    id: 'grau', name: 'GRAU', subtitle: 'Streets of Sofia',
    description: "A portable scanner dragged through the streets of Sofia. Surfaces the city didn't know were being recorded — brick, metal, shadow, mark.",
    count: 8, href: '/grau',
    bg: 'bg-white', text: 'text-black', hoverBg: 'hover:bg-black', hoverText: 'hover:text-white',
    nameStyle: 'font-black italic tracking-tighter', subtitleStyle: 'font-mono uppercase tracking-[0.4em]', descStyle: 'italic',
  },
  {
    id: 'malt', name: 'MALT', subtitle: 'Painting Fragments',
    description: 'Close-up scans of raw canvas. Paint layers that were never meant to be seen this close — texture, gesture, the physical act of making.',
    count: 4, href: '/malt',
    bg: 'bg-stone-100', text: 'text-stone-900', hoverBg: 'hover:bg-stone-800', hoverText: 'hover:text-stone-100',
    nameStyle: 'font-black italic tracking-tight', subtitleStyle: 'font-serif tracking-wide', descStyle: 'font-serif italic',
  },
  {
    id: 'ruis', name: 'RUIS', subtitle: 'Scanner Abstractions',
    description: 'The scanner as noise generator. Signal distortion, glitch lines, the machine misreading light and producing something unintended.',
    count: 4, href: '/ruis',
    bg: 'bg-neutral-900', text: 'text-green-400', hoverBg: 'hover:bg-green-400', hoverText: 'hover:text-black',
    nameStyle: 'font-black tracking-widest', subtitleStyle: 'font-mono uppercase tracking-[0.5em]', descStyle: 'font-mono',
  },
  {
    id: 'klip', name: 'KLIP', subtitle: 'Collages',
    description: 'Cut, assembled, layered. Figurative fragments and found text pressed into new compositions. The image as construction site.',
    count: 4, href: '/klip',
    bg: 'bg-yellow-300', text: 'text-black', hoverBg: 'hover:bg-black', hoverText: 'hover:text-yellow-300',
    nameStyle: 'font-black uppercase tracking-tighter', subtitleStyle: 'uppercase tracking-widest font-bold', descStyle: '',
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('poster-cart');
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error("Cart error:", e); }
    }
  }, []);

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('poster-cart', JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((sum: number, item: any) => {
    const price = parseFloat((item.price || '0').replace(/[^\d.]/g, ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <div className="bg-black text-white text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b border-black">
        Free Carbon-Neutral Worldwide Shipping — All Editions
      </div>

      <nav className="flex justify-between items-center p-6 border-b border-black sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">KALT</h1>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mt-0.5">Limited Edition Prints — Four Series</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 hidden md:block">DASILOSHERAZKOSH</p>
          <button onClick={() => setIsCartOpen(true)} className="text-xs font-bold border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
            <span className="md:hidden">⊹ {cart.length}</span>
            <span className="hidden md:inline">Collection ({cart.length})</span>
          </button>
        </div>
      </nav>

      <div className="border-b border-black px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 mb-6">KALT Studio — Sofia, Bulgaria</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8">Four<br />Series.<br />One Studio.</h2>
          <p className="text-sm text-neutral-500 leading-relaxed italic max-w-sm">Each series is a distinct body of work — different tools, different surfaces, different intent. All produced by a single artist using a portable scanner as the primary instrument.</p>
        </div>
        <div className="md:text-right">
          <div className="inline-block border-l-2 border-black pl-6 text-left">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Editions from</p>
            <p className="text-4xl font-black tracking-tighter">€65</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mt-3">Ships carbon-neutral to all of Europe</p>
          </div>
        </div>
      </div>

      <div className="border-b border-black">
        {SERIES.map((series, index) => (
          <a key={series.id} href={series.href}
            className={`block border-b border-black last:border-0 group transition-all duration-300 ${series.bg} ${series.text} ${hoveredSeries === series.id ? `${series.hoverBg} ${series.hoverText}` : ''}`}
            onMouseEnter={() => setHoveredSeries(series.id)}
            onMouseLeave={() => setHoveredSeries(null)}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-1 p-6 flex items-start opacity-40">
                <span className="text-[10px] font-mono uppercase tracking-widest">0{index + 1}</span>
              </div>
              <div className="md:col-span-3 p-6 md:border-r border-black/20 flex flex-col justify-between">
                <div>
                  <h2 className={`text-6xl md:text-8xl leading-none ${series.nameStyle}`}>{series.name}</h2>
                  <p className={`text-[10px] mt-3 opacity-60 ${series.subtitleStyle}`}>{series.subtitle}</p>
                </div>
              </div>
              <div className="md:col-span-6 p-6 md:p-12 flex items-center md:border-r border-black/20">
                <p className={`text-sm leading-relaxed max-w-lg opacity-70 ${series.descStyle}`}>{series.description}</p>
              </div>
              <div className="md:col-span-2 p-6 flex items-center justify-end md:justify-center">
                <div className="text-right">
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2 opacity-40">{series.count} Editions</p>
                  <p className={`text-lg font-black uppercase tracking-tighter ${series.nameStyle}`}>
                    {hoveredSeries === series.id ? 'Enter →' : 'View'}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* TRUST STRIP */}
      <div className="border-b border-black bg-neutral-50 px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest font-black mb-1">Small Runs Only</p>
          <p className="text-xs text-neutral-500 italic">Each edition is limited. When it's gone, it's gone.</p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest font-black mb-1">Not a Print Shop</p>
          <p className="text-xs text-neutral-500 italic">Every piece originates from a single artist's vision.</p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest font-black mb-1">Collector Pricing</p>
          <p className="text-xs text-neutral-500 italic">Gallery quality. Independent studio price.</p>
        </div>
      </div>

      <footer className="border-t border-black bg-white p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

      {/* CART SIDEBAR */}
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
                cart.map((item: any, idx: number) => (
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
                <span>Total</span><span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="w-full bg-black text-white py-6 text-sm font-black uppercase tracking-[0.2em] border-2 border-black hover:bg-white hover:text-black transition-all text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                Explore Series
              </button>
              <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 text-center mt-4">Add items from a series to checkout</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}