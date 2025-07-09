import React from 'react'
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceData }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img 
                id='inputimage' 
                alt='' 
                src={imageUrl} 
                width="500px" 
                height="auto"
                />
                        <div
                            className="bounding-box" 
                            style={{
                                top: faceData.topRow, 
                                right: faceData.rightCol, 
                                bottom: faceData.bottomRow, 
                                left: faceData.leftCol,
                            }}>
                        </div>
            </div>
        </div>
    );
}

export default FaceRecognition;