'use client'
 
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
 
export default function WebOTP() {
    const [otp, setOtp] = useState("");
    
    useEffect(() => {
        if ("OTPCredential" in window) {
 
            console.log("OTPCredential is good");
            
            const ac = new AbortController();
            const otpOption = {
                otp: { transport: ["sms"] },
                signal: ac.signal
            };
            setTimeout(() => {
                // abort after 10 minutes
                ac.abort();
            }, 10 * 60 * 1000);
            navigator.credentials.get(otpOption).then((otp :any) => {
                console.log('OPT GET');
                alert('OPT GET');
                if (otp) {
                    setOtp(otp.code);
                }
            }).catch(err => {
                console.log(err);
                alert(err);
            });
          } else {
            alert('OTP ELSE')
          }
    }, []);
  
    return (
      <>
        <Header />
        <h2>Your OTP is: {otp}</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp}
        />
      </>
    );
};
 