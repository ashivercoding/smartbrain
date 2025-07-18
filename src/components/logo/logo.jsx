import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" style={{ height: 150, width: 150}}>
                <div className="Tilt-inner pa4">
                    <img style={{paddingTop: '5px'}} alt="logo" src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo