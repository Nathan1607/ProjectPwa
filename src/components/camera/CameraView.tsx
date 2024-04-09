import { useEffect, useState } from "react";

export default function CameraView() {

    const [photos, setphotos] = useState<string[]>([]);


    useEffect(() => {
        getMediaStream(constraints);
        requestNotificationPermission();
    });

    useEffect(() => {
        localStorage.setItem('photos', JSON.stringify(photos));
    }, [photos]);    

    let mediaStream = null;

    const constraints = { 
        audio: false, 
        video: { 
            width: {ideal: 640}, 
            height: {ideal: 480},
            facingMode: "user"
        } 
    };

    async function getMediaStream(constraints: any) {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('cam') as HTMLVideoElement;
            if (video) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = () => {
                    video.play();
                }
            }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    function requestNotificationPermission() {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                }
            });
        }
    }

    function takePhoto() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let video = document.getElementById('cam') as HTMLVideoElement;

        let context = canvas.getContext('2d');

        const height = video.videoHeight;
        const width = video.videoWidth;

        if( width && height ) {
            canvas.width = width;
            canvas.height = height;

            context?.drawImage(video, 0, 0, width, height);    

            const data = canvas.toDataURL('image/png');

            setphotos(prevPhotos => [...prevPhotos, data])

            if (navigator.serviceWorker && navigator.serviceWorker.controller && Notification.permission === 'granted') {
                showNotification("Photo prise !");
            } else {
                console.error('Service worker not available or notification permission not granted');
            }

        } else {
            console.error('No video width and height');
        }
    }

    function showNotification(message: string) {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Notification', {
                    body: message,
                });
            });
        }
    }

  return (
    <div>
        <button id="snapBtn" onClick={takePhoto}>Photo</button>
        <br />
        <br />
        <video id="cam" muted>Not available</video>
        <canvas id="canvas"></canvas> 
    </div>
  )
}
