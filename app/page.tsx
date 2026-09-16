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
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between p-4"> 
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 border border-slate-100"> 
          {step < 5 && ( 
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden"> 
              <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div> 
            </div> 
          )} 

          {/* STEP 1 */}
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

          {/* STEP 2 */}
          {step === 2 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-4">Property Ownership</h2> 
              <p className="text-sm text-slate-600 mb-2">Are you the homeowner?</p> 
              <div className="grid grid-cols-2 gap-3 mb-6"> 
                <button 
                  onClick={() => { setFormData({ ...formData, isOwner: 'YES' }); setStep(3); }} 
                  className="p-4 border-2 rounded-lg font-bold hover:border-blue-600 text-slate-900 transition"
                >
                  YES
                </button> 
                <button 
                  onClick={() => alert('Only available for homeowners.')} 
                  className="p-4 border-2 rounded-lg font-bold hover:border-red-400 text-slate-900 transition"
                >
                  NO
                </button> 
              </div> 
              <button onClick={() => setStep(1)} className="text-xs text-slate-500 underline">← Back</button>
            </div> 
          )} 

          {/* STEP 3 */}
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
                    className="p-3 border-2 text-left rounded-lg font-medium hover:border-blue-600 text-slate-900 transition"
                  >
                    {item.label}
                  </button> 
                ))}
              </div> 
              <button onClick={() => setStep(2)} className="text-xs text-slate-500 underline">← Back</button>
            </div> 
          )} 

          {/* STEP 4 - FINAL STEP (NO SMS, DIRECT SUBMIT) */}
          {step === 4 && ( 
            <div> 
              <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Details</h2> 
              <div className="space-y-3 mb-4"> 
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full p-3 border rounded-lg text-slate-900" 
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                /> 
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full p-3 border rounded-lg text-slate-900" 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                /> 
                <input 
                  type="tel" 
                  placeholder="(214) 555-0199" 
                  className="w-full p-3 border rounded-lg text-slate-900" 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                /> 
              </div> 
              <p className="text-[10px] text-slate-400 mb-4">
                By clicking below, I agree to receive automated calls/SMS regarding roof inspection options. TCPA Compliant.
              </p> 
              <button 
                disabled={loading || !formData.phone || !formData.firstName} 
                onClick={handleSubmit} 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
              >
                {loading ? 'Submitting...' : 'Get My Roofing Assessment'}
              </button> 
              <button onClick={() => setStep(3)} className="mt-3 text-xs text-slate-500 underline block">← Back</button>
            </div> 
          )} 

          {/* STEP 5 - SUCCESS CONFIRMATION */}
          {step === 5 && ( 
            <div className="text-center py-6"> 
              <div className="text-5xl mb-4">✅</div> 
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Confirmed!</h2> 
              <p className="text-slate-600 text-sm">An inspector will contact you shortly.</p> 
            </div> 
          )} 
        </div> 
      </div>

      <footer className="max-w-3xl mx-auto text-center py-4 text-[11px] text-slate-400 leading-relaxed border-t border-slate-200">
        Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.
      </footer>
    </main> 
  ); 
}