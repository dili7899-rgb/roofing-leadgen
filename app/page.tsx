'use client'; 

import { useState } from 'react'; 

export default function HomePage() { 
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({ 
    address: '', 
    isOwner: '', 
    issueType: 'Storm Damage',
    firstName: '', 
    lastName: '', 
    phone: '', 
  }); 

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('1') && cleaned.length === 11) return `+${cleaned}`;
    if (cleaned.length === 10) return `+1${cleaned}`;
    return phone.startsWith('+') ? phone : `+${cleaned}`;
  };

  // Direct submission to API (saves to Supabase + sends to MarketCall)
  const handleSubmit = async () => { 
    setLoading(true); 
    const certUrl = (document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement)?.value || ''; 
    const formattedPhone = formatPhoneNumber(formData.phone);
    
    const res = await fetch('/api/lead/submit', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
        ...formData, 
        phone: formattedPhone, 
        trustedFormCertUrl: certUrl 
      }), 
    }); 
    
    setLoading(false); 
    if (res.ok) {
      setStep(5); // Successful submission -> Confirmation screen
    } else {
      alert('Error submitting your request. Please check your information and try again.'); 
    }
  }; 

  return ( 
    // Removed justify-between to prevent awkward spacing, using standard flex-col
    <main className="min-h-screen bg-slate-50 flex flex-col p-4 pb-24 md:pb-4"> 
      
      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto w-full py-4 px-4 flex justify-between items-center border-b border-slate-100 mb-6">
        <div className="font-bold text-lg text-slate-900">USARoofDamageCheck.com</div>
        <a 
          href="tel:+18442047475" 
          className="hidden md:flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
        >
          <span>📞</span>
          <span>(844) 204-7475</span>
        </a>
      </header>

      {/* MAIN CONTENT / FORM SECTION */}
      <div className="flex-grow flex items-center justify-center py-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 border border-slate-100"> 
          
          {/* TOP CLICK-TO-CALL BANNER */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Need Immediate Assistance? Speak With A Pro:
            </p>
            <a
              href="tel:+18442047475"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg py-3 px-4 rounded-xl shadow transition"
            >
              <span>📞</span>
              <span>CALL NOW: (844) 204-7475</span>
            </a>
          </div>

          {step < 5 && ( 
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden"> 
              <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div> 
            </div> 
          )} 

          {/* STEP 1 - Address */}
          {step === 1 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-2">Check Inspection Eligibility</h2> 
              <p className="text-sm text-slate-500 mb-4">Enter street address in TX/CO.</p> 
              <input 
                type="text" 
                placeholder="123 Main St, Dallas, TX" 
                className="w-full p-3 border border-slate-300 rounded-lg mb-4 text-slate-900 focus:outline-none focus:border-blue-600" 
                value={formData.address} 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
              /> 
              <button 
                disabled={!formData.address} 
                onClick={() => setStep(2)} 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
              >
                Next Step
              </button> 
            </div> 
          )} 

          {/* STEP 2 - Ownership */}
          {step === 2 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-4">Property Ownership</h2> 
              <p className="text-sm text-slate-600 mb-2">Are you the homeowner?</p> 
              <div className="grid grid-cols-2 gap-3 mb-6"> 
                <button 
                  onClick={() => { setFormData({ ...formData, isOwner: 'YES' }); setStep(3); }} 
                  className="p-4 border-2 rounded-lg font-bold text-lg hover:border-blue-600 hover:bg-blue-50 text-slate-900 transition"
                >
                  YES
                </button> 
                <button 
                  onClick={() => alert('Only available for homeowners.')} 
                  className="p-4 border-2 rounded-lg font-bold text-lg hover:border-red-400 hover:bg-red-50 text-slate-900 transition"
                >
                  NO
                </button> 
              </div> 
              <button onClick={() => setStep(1)} className="text-xs text-slate-500 underline">← Back</button>
            </div> 
          )} 

          {/* STEP 3 - Reason */}
          {step === 3 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-4">Inspection Reason</h2> 
              <div className="flex flex-col gap-3 mb-6"> 
                {[
                  { id: 'Storm Damage', label: 'Hail / Wind Storm Damage' },
                  { id: 'Active Leak', label: 'Active Roof Leak' },
                  { id: 'Old Roof Replacement', label: 'Aging Roof (10+ years old)' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setFormData({ ...formData, issueType: item.id }); setStep(4); }} 
                    className="p-3 border-2 text-left rounded-lg font-medium hover:border-blue-600 hover:bg-blue-50 text-slate-900 transition"
                  >
                    {item.label}
                  </button> 
                ))}
              </div> 
              <button onClick={() => setStep(2)} className="text-xs text-slate-500 underline">← Back</button>
            </div> 
          )} 

          {/* STEP 4 - Final Submit */}
          {step === 4 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Details</h2> 
              <div className="space-y-3 mb-4"> 
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" 
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                /> 
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                /> 
                <input 
                  type="tel" 
                  placeholder="(214) 555-0199" 
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600" 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                /> 
              </div> 
              <p className="text-[10px] text-slate-400 mb-4">
                By clicking below, I agree to receive automated calls/SMS regarding roof inspection options. Consent is not a condition of purchase.
              </p> 
              <button 
                disabled={loading || !formData.phone || !formData.firstName} 
                onClick={handleSubmit} 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
              >
                {loading ? 'Submitting...' : 'Get My Roofing Assessment'}
              </button> 
              <button onClick={() => setStep(3)} className="mt-3 text-xs text-slate-500 underline block text-center w-full">← Back</button>
            </div> 
          )} 

          {/* STEP 5 - Confirmation */}
          {step === 5 && ( 
            <div className="text-center py-6"> 
              <div className="text-6xl mb-4">✅</div> 
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Confirmed!</h2> 
              <p className="text-slate-600 text-sm mb-6">An inspector will contact you shortly from a local number.</p> 

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-900 mb-2">
                  Want to speak with an agent right now?
                </p>
                <a
                  href="tel:+18442047475"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg shadow transition"
                >
                  📞 Call Now: (844) 204-7475
                </a>
              </div>
            </div> 
          )} 
        </div> 
      </div>

      {/* MOBILE STICKY CALL BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-2xl md:hidden z-50">
        <a
          href="tel:+18442047475"
          className="flex items-center justify-center gap-2 w-full bg-green-600 active:bg-green-700 text-white font-bold py-3 rounded-xl text-lg shadow"
        >
          <span>📞</span>
          <span>CALL NOW: (844) 204-7475</span>
        </a>
      </div>

    </main> 
  ); 
}
