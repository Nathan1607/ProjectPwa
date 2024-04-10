import React from "react";
import '../../style/GaleriePhoto.css';

export default function GallerieView() {
    const photosFromLocalStorage = JSON.parse(localStorage.getItem('photos') || '[]');

    return (
        <div className="gallery-container">
            <p className="gallery-title">Ma Galerie Photo :</p>
            {photosFromLocalStorage.length === 0 ? (
                <p className="no-photos-message">Aucune photo disponible. Veuillez prendre des photos.</p> 
            ) : (
                <div className="photos-container">
                    {photosFromLocalStorage.map((photo: any, index: any) => (
                        <img key={index} src={photo} alt={`Photo ${index}`} className="photo-item" />
                    ))}
                </div>
            )}
        </div>
    )
}
