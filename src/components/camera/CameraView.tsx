import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CameraView() {

    const navigate = useNavigate();
    const [photos, setPhotos] = useState<string[]>([]);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [offlineQueue, setOfflineQueue] = useState<string[]>([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const storedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
        setPhotos(storedPhotos);
        getMediaStream(constraints);
        requestNotificationPermission();

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('photos', JSON.stringify(photos));
    }, [photos]);

    useEffect(() => {
        const storedOfflineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
        setOfflineQueue(storedOfflineQueue);
    }, []);

    useEffect(() => {
        localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
    }, [offlineQueue]);

    let mediaStream: MediaStream | null = null;

    const constraints = { 
        audio: false, 
        video: { 
            width: { ideal: 640 }, 
            height: { ideal: 480 },
            facingMode: "user"
        } 
    };

    async function getMediaStream(constraints: MediaStreamConstraints) {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('cam') as HTMLVideoElement;
            if (video) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
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
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const video = document.getElementById('cam') as HTMLVideoElement;
        const context = canvas.getContext('2d');
        const height = video.videoHeight;
        const width = video.videoWidth;

        if (width && height && context) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            const data = canvas.toDataURL('image/png');
            
            if (navigator.onLine) {
                setPhotos(prevPhotos => {
                    const newPhotos = [...prevPhotos, data];
                    localStorage.setItem('photos', JSON.stringify(newPhotos));
                    return newPhotos;
                });
                sendNotification('Vous avez pris une photo');
                setIsPhotoTaken(true);
            } else {
                setOfflineQueue(prevQueue => {
                    const newQueue = [...prevQueue, data];
                    localStorage.setItem('offlineQueue', JSON.stringify(newQueue));
                    return newQueue;
                });
                sendNotification('Photo prise en mode hors ligne, elle sera synchronisée lorsque vous serez en ligne.');
                console.log("Photo saved to queue for later processing.");
                setIsPhotoTaken(false);
            }
        } else {
            console.error('No video width and height');
        }
    }

    function handleOnline() {
        setIsOnline(true);
        const storedQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
        if (storedQueue.length > 0) {
            console.log("Processing offline queue...");
            setPhotos(prevPhotos => {
                const newPhotos = [...prevPhotos, ...storedQueue];
                localStorage.setItem('photos', JSON.stringify(newPhotos));
                return newPhotos;
            });
            sendNotification(`Vous avez pris ${storedQueue.length} photo(s) en mode hors ligne`);
            setOfflineQueue([]);
            localStorage.removeItem('offlineQueue');
        }
    }

    function handleOffline() {
        setIsOnline(false);
    }

    function sendNotification(message: string) {
        if ('Notification' in window) {
            Notification.requestPermission().then((result) => {
                if (result === 'granted') {
                    if ('vibrate' in navigator) {
                        navigator.vibrate(1000);
                    }
                    new Notification('Notification', {
                        body: message,
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
                    {isPhotoTaken && isOnline && <img className="photoTaken" src={photos[photos.length - 1]} alt="Captured" />}
                </div>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
}
