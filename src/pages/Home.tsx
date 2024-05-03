import { useEffect } from 'react';
import Header from '../components/header/Header';
import '../style/Home.css';

export default function App() {

  useEffect(() => {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', e => {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        if (form) {
          form.addEventListener('submit', e => {
            ac.abort();
          });
        }
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal,
        }).then(otp => {
          if (otp) {
            (input as HTMLInputElement).value = otp.code;
            if (form) form.submit();
          }
        }).catch(err => {
          console.log(err);
        });
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <h1>Vous êtes sur la page Home</h1>
      <br />
      <p>WebOTP</p>
      <form>
        <input autoComplete="one-time-code" required />
        <input type="submit" />
      </form>
    </div>
  );
}
