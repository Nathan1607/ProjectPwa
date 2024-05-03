import { useState } from 'react';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {

  const [otpCode, setOtpCode] = useState('');

  // useEffect(() => {
  //   OTP();
  // }, []);

    async function receiveOTP() {
    try {
      const content = await navigator.credentials.get({
        otp: { transport: ['sms'] },
      });
      if (content !== null) {
        alert('Received OTP: ' + content.code); 
        // setOtpCode(content.code);
        if (!!content.code) window.navigator.vibrate(500);
        console.log('OTP received content:', {content});
        setOtpCode(content.code);
      }
    } catch (error) {
      console.error('OTP Retrieval failed:', error);
    }

  }

  // async function OTP() {
  //   if ('OTPCredential' in window) {
  //     console.log('WebOTP is supported')
  //     window.addEventListener('DOMContentLoaded', e => {
  //       console.log(e);
  //       const input = document.querySelector('input[autocomplete="one-time-code"]');
  //       if (!input) return;
  //       const ac = new AbortController();
  //       const form = input.closest('form');
  //       if (form) {
  //         form.addEventListener('submit', e => {
  //           console.log(e);
  //           ac.abort();
  //         });
  //       }
  //       navigator.credentials.get({
  //         otp: { transport:['sms'] },
  //         signal: ac.signal,
  //       }).then(otp => {
  //         if (otp) {
  //           (input as HTMLInputElement).value = otp.code;
  //           if (form) form.submit();
  //         }
  //       }).catch(err => {
  //         console.log(err);
  //       });
  //     });
  //   }
  // }

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <p>WebOTP</p>
      <form>
        <button onClick={()=> receiveOTP()}>Receive OTP</button>
        <input autoComplete="one-time-code" required />
        <input type="submit" value={otpCode} />
      </form>
    </div>
  );
}
