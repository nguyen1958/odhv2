import React from 'react';
import images from '../constantes/images';

const Accueil = () => {
    return (
        <div className="row justify-content-center align-items-center" style={{height:'80vh'}}>
            <img src={images.bienvenue} alt="bienvenue" />          
        </div>
    );
}

export default Accueil;
