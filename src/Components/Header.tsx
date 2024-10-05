import React from 'react';
import logoJuripass from '../assets/img/logo-juripass.png';
export const Header = () => {

    return (
        <header className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto py-4 px-4 tablet:px-4">
                <img src={logoJuripass} className='h-16' alt="Juripass logo" />
            </div>
        </header>
    );
}