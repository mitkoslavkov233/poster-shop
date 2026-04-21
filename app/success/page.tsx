export default function Success() {
  return (
    <main className="min-h-screen bg-white font-sans text-black flex flex-col">
      {/* BANNER */}
      <div className="bg-black text-white text-[10px] uppercase tracking-[0.4em] py-4 text-center font-black border-b border-black">
        Free Carbon-Neutral Worldwide Shipping — All Editions
      </div>

      {/* NAV */}
      <nav className="flex justify-between items-center p-6 border-b border-black">
        <a href="/">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">KALT</h1>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 mt-0.5">Limited Edition Prints — Sofia Series</p>
        </a>
      </nav>

      {/* SUCCESS CONTENT */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-lg w-full border-l-4 border-black pl-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 mb-6">Order Confirmed</p>
          <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8">
            It's on<br />its way.
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed italic mb-12">
            Your edition has been reserved and will be prepared for shipment. 
            You'll receive a confirmation email shortly. 
            Every piece is rolled with care in archival tubing — it arrives the way it was made.
          </p>
          <a 
            href="/"
            className="inline-block text-xs font-black border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Back to the Series
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black p-8 text-center">
        <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Questions — studio@kalt.art</p>
      </footer>
    </main>
  );
}