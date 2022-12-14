import React from 'react';
import './style.scss';
import { loadCSS } from 'fmihel-lazy-load';
import NavbarMenu from './NavbarMenu.jsx';

loadCSS('components/Navbar/style.css');
export default ({
    addClass, src, menu = [],
}) => {
    const text = 'Navbar';

    return (
        <nav className={`navbar navbar-expand-lg ${addClass} mb-1`} id="navbar" >
            <div className="container-fluid">
                <img
                    src={src}
                    className=" d-flex align-items-center mb-md-0 me-md-auto d-lg-none"
                    alt="..."
                    style={{
                        maxHeight: 32, padding: 0,
                    }}
                />
                <button
                    className="navbar-toggler"
                    id ="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>

                </button>
                <NavbarMenu menu={menu}/>
            </div>
        </nav>
    );
};
