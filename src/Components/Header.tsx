import React from 'react';
import Logo from '../assets/img/juripass-logo.png';
export const Header = () => {

    return (
        <header className="shadow bg-juripass">
            <div className="max-w-7xl mx-auto py-2 px-4 tablet:px-4">
                <img src={Logo} alt="Juripass logo" />
            </div>
        </header>
    );
}