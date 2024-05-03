import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CameraView() {

    const navigate = useNavigate();

    const [photos, setphotos] = useState<string[]>([]);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);

    useEffect(() => {
        getMediaStream(constraints);
        requestNotificationPermission();
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
            setIsPhotoTaken(true);

            AddNotification();
        } else {
            console.error('No video width and height');
        }
    }

    const AddNotification = () => {
        if ('Notification' in window) {
          Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                if ('vibrate' in navigator) {
                    navigator.vibrate(1000);
                }
                new Notification('Notification', {
                    body: 'Vous avez pris une photo',
                });
            } else {
              throw new Error('Permission refusée');
            }
          });
        } else {
          throw new Error("L'API Notification n'est pas disponible dans ce navigateur.");
        }
    }

  return (
    <div className="container-dev">
        <div className="BtnTake">
            <button id="snapBtn" onClick={takePhoto}>Photo</button>
            <button className="btn-Gallerie" onClick={() => navigate('/galleriephoto')}>Gallerie</button>
        </div>
        <div className="container">
            <div className="container-video">
                <video id="cam" muted>Not available</video>
                {isPhotoTaken && <img className="photoTaken" src={photos[photos.length - 1]} alt="Captured" />}
            </div>
            <canvas id="canvas"></canvas>
        </div>
    </div>
  )
}
