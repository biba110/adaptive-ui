'use client';

import { useState } from 'react';

// --- LAYOUT 1: STANDARD RETAIL SHOPPER ---
const StandardShopperUI = () => (
  <div className="space-y-6 animate-fadeIn mt-10">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
      <span className="bg-blue-400/30 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Standard Retail Portal</span>
      <h2 className="text-4xl font-extrabold mt-3 mb-2">Everyday Quality, Exceptional Value</h2>
      <p className="text-blue-100 max-w-xl">Explore our featured daily items and trending catalog curated for retail customers.</p>
      <div className="mt-6 flex gap-3">
        <button className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-50 transition">Browse Catalog</button>
      </div>
    </div>
  </div>
);

// --- LAYOUT 2: BULK WHOLESALE PORTAL ---
const BulkWholesaleUI = () => (
  <div className="space-y-6 animate-fadeIn mt-10">
    <div className="bg-slate-950 rounded-2xl p-8 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase">Wholesale Account Detected</span>
      <h2 className="text-4xl font-mono font-bold mt-3 mb-2 text-emerald-400">B2B Volume Distribution</h2>
      <p className="text-slate-300 max-w-xl">High-quantity inventory tier unlocked. Tiered pricing and invoice terms active.</p>
      <div className="mt-6 flex gap-3">
        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg shadow-lg transition">Bulk Order Manifest</button>
      </div>
    </div>
  </div>
);

// --- LAYOUT 3: LUXURY VIP BOUTIQUE ---
const LuxuryVIPUI = () => (
  <div className="space-y-6 animate-fadeIn mt-10">
    <div className="bg-stone-900 rounded-2xl p-10 text-stone-100 border border-amber-500/20 shadow-2xl">
      <span className="text-amber-400 text-xs font-serif tracking-widest uppercase border-b border-amber-400/40 pb-1">Private Client Experience</span>
      <h2 className="text-4xl font-serif mt-4 mb-3 tracking-wide text-stone-50">High-Value VIP Concierge</h2>
      <p className="text-stone-400 font-light max-w-xl text-sm leading-relaxed">Dedicated account assistance, early access drops, and bespoke packaging configurations.</p>
      <div className="mt-8 flex gap-4">
        <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-serif font-medium px-8 py-3 tracking-wider text-xs uppercase transition">View Private Lookbook</button>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE & CONTROLLER ---
export default function Home() {
  const [clusterId, setClusterId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugData, setDebugData] = useState<{ input: any, returnedCluster: number } | null>(null);
  
  // 6 State variables for conversational inputs
  const [spent, setSpent] = useState("");
  const [mins, setMins] = useState("");
  const [abandon, setAbandon] = useState("");
  const [discount, setDiscount] = useState("");
  const [returns, setReturns] = useState("");
  const [support, setSupport] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spent || !mins || !abandon || !discount || !returns || !support) return;

    setLoading(true);
    try {
   
      const response = await fetch("https://ecom-backend-4hzs.onrender.com/predict-segment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          total_spent: Number(spent),
          session_minutes: Number(mins),
          cart_abandonment: Number(abandon),
          discount_usage: Number(discount),
          return_rate: Number(returns),
          support_tickets: Number(support)
        }),
      });
      
      const data = await response.json();
      setClusterId(data.cluster_id);
      setDebugData({ 
        input: { spent, mins, abandon, discount, returns, support }, 
        returnedCluster: data.cluster_id 
      });
    } catch (error) {
      console.error(error);
      alert("FastAPI backend issue: Ensure the Render server is up and running.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClusterId(null);
    setDebugData(null);
    setSpent(""); setMins(""); setAbandon(""); setDiscount(""); setReturns(""); setSupport("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans p-6 md:p-12 selection:bg-[#FFEA00] selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* DEBUG PANEL */}
        {debugData && (
          <div className="mb-6 flex justify-end">
            <div className="bg-[#1a1a1a] text-gray-400 font-mono text-xs p-3 rounded-lg border border-[#B99494]/20">
               <span className="text-[#FFEA00]">Cluster ID:</span> {debugData.returnedCluster}
            </div>
          </div>
        )}

        {/* VERTICAL FORM CARD - VISUAL THINKER THEME */}
        <div className="max-w-md mx-auto bg-[#0d0d0d] p-8 rounded-3xl border border-[#B99494]/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>

          {/* HEADER & BRANDING */}
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            {/* Custom Avatar from public folder */}
            <div className="relative mb-5 group">
              <div className="absolute inset-0 bg-[#FFEA00] rounded-2xl transform rotate-6 translate-x-1 translate-y-1 transition-transform group-hover:rotate-12"></div>
              <img 
                src="/Frame 32.jpg" 
                alt="Visual Thinker Biba" 
                className="w-24 h-24 rounded-2xl object-cover relative z-10 border-2 border-[#0d0d0d]"
              />
            </div>
            
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Ecom by <span className="text-[#B99494]">Biba</span></h2>
            
            <div className="mt-3 bg-[#FFEA00] px-3 py-1 inline-block transform -rotate-2">
              <p className="text-xs font-bold text-black uppercase tracking-widest">
                Data-Driven Personalization
              </p>
            </div>

            <p className="text-sm text-[#B99494] mt-5 leading-relaxed px-2">
              Answer these quick questions below to reveal a personalized shopping experience based on your habits.
            </p>
          </div>

          {/* VERTICAL INPUT FIELDS (CONVERSATIONAL UI) */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 relative z-10">
            
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                1. Roughly how much do you spend yearly? ($)
              </label>
              <input type="number" value={spent} onChange={e => setSpent(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="e.g. 500" required />
            </div>
            
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                2. Avg. minutes you browse before buying?
              </label>
              <input type="number" value={mins} onChange={e => setMins(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="e.g. 15 (Slow) or 2 (Quick)" required />
            </div>
              
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                3. Do you often leave items in the cart? (0-10)
              </label>
              <input type="number" value={abandon} onChange={e => setAbandon(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="0 (Never) to 10 (Always)" required />
            </div>
            
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                4. How often do you wait for sales? (0-10)
              </label>
              <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="0 (Rarely) to 10 (Always)" required />
            </div>
              
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                5. Out of 100 items, how many do you return?
              </label>
              <input type="number" value={returns} onChange={e => setReturns(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="e.g. 5" required />
            </div>
            
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#FFEA00] uppercase tracking-widest mb-1.5 ml-1">
                6. How many times have you contacted support?
              </label>
              <input type="number" value={support} onChange={e => setSupport(e.target.value)} className="w-full border-b-2 border-[#B99494]/30 bg-[#1a1a1a] rounded-none px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFEA00] focus:bg-[#222] transition-all placeholder-gray-600" placeholder="e.g. 0 or 1" required />
            </div>
            
            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 mt-4">
              <button type="submit" className="w-full bg-[#FFEA00] text-black font-extrabold uppercase tracking-wide py-4 rounded-none hover:bg-white transition-colors border-2 border-[#FFEA00] hover:border-white shadow-[4px_4px_0px_#B99494] active:shadow-none active:translate-y-1 active:translate-x-1">
                Reveal My Personalized Store
              </button>
              <button type="button" onClick={handleReset} className="w-full bg-transparent text-[#B99494] font-semibold py-3 rounded-none hover:bg-white/5 transition-colors border border-transparent hover:border-[#B99494]/30">
                Start Over
              </button>
            </div>
          </form>
        </div>

        {/* RENDERED UI BASED ON CLUSTER */}
        <div className="mt-12">
          {loading ? (
             <div className="p-10 text-center text-[#FFEA00] font-mono animate-pulse tracking-widest">ANALYZING YOUR BEHAVIOR...</div>
          ) : (
            <>
              {/* Note: Update the mapping of 0, 1, and 2 based on what your Jupyter Notebook output is for each specific persona */}
              {clusterId === 0 && <StandardShopperUI />}
              {clusterId === 1 && <BulkWholesaleUI />}
              {clusterId === 2 && <LuxuryVIPUI />}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
