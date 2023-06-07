import React, { useContext, useState } from 'react';
//import { CartContext } from '../CartContext';


const Shopping = ({ /*onAddProduct, name, price, descript, img*/ }) => {

    return (
        <div className="delivery">
        <div className="delivery_info">
            <i className="fa-solid fa-truck"></i>
            <div className="delivery_text">
                <h4>Livraison gratuite</h4>
                <p>Commandez en toute tranquillité avec notre livraison gratuite, pour une expérience d'achat sans souci.</p>
            </div>
        </div>
        <div className="delivery_info">
        <i className="fa-solid fa-handshake"></i>
            <div className="delivery_text">
                <h4>Faites nous confiance</h4>
                <p>Une qualité irréprochable. Nous sommes fiers de vous offrir des produits qui répondent aux normes les plus élevées de qualité.</p>
            </div>
        </div>
    </div>
    
    );
};

export default Shopping;