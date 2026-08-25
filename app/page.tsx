'use client'; 

import { useState } from 'react'; 

export default function RoofingCalculator() { 
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({ 
    address: '', 
    isOwner: '', 
    firstName: '', 
    lastName: '', 
    phone: '', 
    otpCode: '', 
  }); 

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('1') && cleaned.length === 11) return `+${cleaned}`;
    if (cleaned.length === 10) return `+1${cleaned}`;
    return phone.startsWith('+') ? phone : `+${cleaned}`;
  };

  const sendOtp = async () => { 
    setLoading(true); 
    const formattedPhone = formatPhoneNumber(formData.phone);
    const res = await fetch('/api/verify/send', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ phone: formattedPhone }), 
    }); 
    setLoading(false); 
    if (res.ok) setStep(4); 
    else alert('Error sending SMS. Please verify the phone number.'); 
  }; 

  const handleSubmit = async () => { 
    setLoading(true); 
    const certUrl = (document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement)?.value || ''; 
    const formattedPhone = formatPhoneNumber(formData.phone);
    const res = await fetch('/api/lead/submit', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ ...formData, phone: formattedPhone, certUrl }), 
    }); 
    setLoading(false); 
    if (res.ok) setStep(5); 
    else alert('Invalid SMS Code!'); 
  }; 

  return ( 
    <main className="min-h-screen flex items-center justify-center p-4"> 
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 border border-slate-100"> 
        {step < 5 && ( 
          <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden"> 
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div> 
          </div> 
        )} 

        {step === 1 && ( 
          <div> 
            <h2 className="text-xl font-bold text-slate-900 mb-2">Check Inspection Eligibility</h2> 
            <p className="text-sm text-slate-500 mb-4">Enter street address in TX/CO.</p> 
            <input 
              type="text" 
              placeholder="123 Main St, Dallas, TX" 
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 text-slate-900" 
              value={formData.address} 
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
            /> 
            <button 
              disabled={!formData.address} 
              onClick={() => setStep(2)} 
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              Next Step
            </button> 
          </div> 
        )} 

        {step === 2 && ( 
          <div> 
            <h2 className="text-xl font-bold text-slate-900 mb-4">Property Ownership</h2> 
            <p className="text-sm text-slate-600 mb-2">Are you the homeowner?</p> 
            <div className="grid grid-cols-2 gap-3 mb-6"> 
              <button 
                onClick={() => { setFormData({ ...formData, isOwner: 'YES' }); setStep(3); }} 
                className="p-4 border-2 rounded-lg font-bold hover:border-blue-600 text-slate-900"
              >
                YES
              </button> 
              <button 
                onClick={() => alert('Only available for homeowners.')} 
                className="p-4 border-2 rounded-lg font-bold hover:border-red-400 text-slate-900"
              >
                NO
              </button> 
            </div> 
          </div> 
        )} 

        {step === 3 && ( 
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
              By clicking below, I agree to receive automated calls/SMS regarding roof inspection options.
            </p> 
            <button 
              disabled={loading || !formData.phone} 
              onClick={sendOtp} 
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Sending SMS...' : 'Verify via SMS'}
            </button> 
          </div> 
        )} 

        {step === 4 && ( 
          <div> 
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verification Code</h2> 
            <input 
              type="text" 
              maxLength={6} 
              placeholder="1234" 
              className="w-full p-3 border rounded-lg mb-4 text-center text-2xl text-slate-900" 
              onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })} 
            /> 
            <button 
              disabled={loading || !formData.otpCode} 
              onClick={handleSubmit} 
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Validating...' : 'Complete'}
            </button> 
          </div> 
        )} 

        {step === 5 && ( 
          <div className="text-center py-6"> 
            <div className="text-5xl mb-4">✅</div> 
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Confirmed!</h2> 
            <p className="text-slate-600 text-sm">An inspector will contact you shortly.</p> 
          </div> 
        )} 
      </div> 
    </main> 
  ); 
}