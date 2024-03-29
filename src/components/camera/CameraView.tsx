import { useEffect } from "react";

export default function CameraView() {

    useEffect(() => {
        getMediaStream(constraints);
    });

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

    function takePhoto() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let video = document.getElementById('cam') as HTMLVideoElement;
        let photo = document.getElementById('photo');

        let context = canvas.getContext('2d');

        const height = video.videoHeight;
        const width = video.videoWidth;

        if( width && height ) {
            canvas.width = width;
            canvas.height = height;

            context?.drawImage(video, 0, 0, width, height);    

            const data = canvas.toDataURL('image/png');
            photo?.setAttribute('src', data);
            localStorage.setItem('photo', data);
        } else {
            console.error('No video width and height');
        }
    }

    function clearPhoto() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let photo = document.getElementById('photo') as HTMLImageElement;
        let context = canvas.getContext('2d') as CanvasRenderingContext2D;

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

  return (
    <div>
        <button id="snapBtn" onClick={takePhoto}>Photo</button>
        <button onClick={clearPhoto}>Clear</button>
        <br />
        {mediaStream ? (
                <video id="cam" muted autoPlay={true}></video>
            ) : (
                <p>Video stream not available</p>
            )}
        <canvas id="canvas"></canvas> 
    </div>
  )
}
