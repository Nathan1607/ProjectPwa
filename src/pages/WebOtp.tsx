'use client'
 
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function WebOtp() {
  
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
 
  useEffect(() => {
    const fetchOTP = async () => {
      if ('OTPCredential' in window) {
        const ac = new AbortController();
        const otpOption = {
          otp: { transport: ['sms'] },
          signal: ac.signal,
        };
 
        try {
          const otpCredential = await navigator.credentials.get(otpOption);
          if (otpCredential && 'code' in otpCredential) {
            const otpCode = (otpCredential as any).code;
            if (otpCode) {
              console.log('OTP read:', otpCode);
              setOtp(otpCode);
            } else {
              setOtpError('No OTP code found in the credential');
            }
          }
        } catch (err) {
          console.error('Failed to auto-read OTP:', err);
          setOtpError('Failed to auto-read OTP: ');
        }
 
        return () => {
          ac.abort();
        };
      } else {
        setOtpError('WebOTP API is not supported in this browser.');
      }
    };
 
    fetchOTP();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2em' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <form>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            autoComplete="one-time-code"
            required
          />
          <input type="submit" color="primary">Submit</input>
        </form>
        <Box>
          { otpError ? (
            <Typography color="error">{otpError}</Typography>
          ) : (
            <Typography>My OTP code is: {otp}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
