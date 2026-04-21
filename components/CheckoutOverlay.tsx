'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  cart: { title: string; price: string; thumb: string }[];
  onClose: () => void;
}

export default function CheckoutOverlay({ cart, onClose }: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
    } catch (err: any) {
      setError(err.message);
    }
  }, [cart]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white border-4 border-black mx-4 flex flex-col shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center px-6 py-4 border-b-4 border-black flex-shrink-0">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter italic">Complete Order</h2>
            <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 mt-0.5">
              {cart.length} edition{cart.length !== 1 ? 's' : ''} — Secure checkout
            </p>
          </div>
          <button onClick={onClose} className="text-xs font-black border-2 border-black px-4 py-1 hover:bg-black hover:text-white transition-all uppercase tracking-widest">✕</button>
        </div>
        <div className="overflow-y-auto flex-1 p-4">
          {error && (
            <div className="p-6 text-center">
              <p className="text-red-600 font-mono text-sm">{error}</p>
              <p className="text-neutral-400 text-xs mt-2">Check your .env.local keys and restart the terminal.</p>
            </div>
          )}
          {!clientSecret && !error && (
            <div className="flex items-center justify-center h-40">
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 animate-pulse">Loading secure checkout...</p>
            </div>
          )}
          {clientSecret && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>
  );
}