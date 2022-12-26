import React from 'react'
import img1 from '../User_images/img1.png';
import img2 from '../User_images/img2.png';
import img3 from '../User_images/img3.png';
export default function Banner() {
    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="slider active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="slider" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="slider" aria-label="Slide 3"></button>
                </div>

                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="img-fluid img-ratio" alt={img1} />
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="img-fluid img-ratio" alt={img2} />
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="img-fluid img-ratio" alt={img3} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
