import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../User_images/img1.png';
import img2 from '../User_images/img2.png';
import img3 from '../User_images/img3.png';
import './Style/MediaQuery.css'
export default function Gallery_Home() {
    return (
        <>
            <div className='container  gallery-body'>
                <p className='banner-card-header text-align-center gallery-header' data-aos="fade-down">Our Gallery</p>

                <div className='row pb-4' data-aos='fade-down'>
                    <div className='col-lg-4 padding-img col-sm-6 col-12' >
                        <div className="card text-bg-dark gallery-card-body" >
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img1} className="card-img" alt={img1} /></figure>

                                </div>

                            </div>
                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Birthday Party</h5>

                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 padding-img col-sm-6 col-12'>
                        <div className="card text-bg-dark gallery-card-body" >
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img3} className="card-img" alt={img3} /></figure>

                                </div>

                            </div>
                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Mehndi Ceremony</h5>

                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 padding-img col-sm-6 col-12' >
                        <div className="card text-bg-dark gallery-card-body" >
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img2} className="card-img" alt={img2} /></figure>

                                </div>

                            </div>

                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Dinner Party</h5>

                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 padding-img  active-hide col-sm-6 col-12' >
                        <div className="card text-bg-dark gallery-card-body">
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img1} className="card-img" alt={img1} /></figure>

                                </div>

                            </div>
                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Birthday Party</h5>

                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 padding-img  active-hide col-sm-6 col-12' >
                        <div className="card text-bg-dark gallery-card-body" >
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img3} className="card-img" alt={img3} /></figure>

                                </div>

                            </div>
                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Mehndi Ceremony</h5>

                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 padding-img  active-hide col-sm-6 col-12'>
                        <div className="card text-bg-dark gallery-card-body" >
                            <div class="hover03 column">
                                <div>
                                    <figure><img src={img2} className="card-img" alt={img2} /></figure>

                                </div>

                            </div>

                            <div className="card-img-overlay gallery-text-center">
                                <h5 className="card-title text-align-center gallery-card-text">Dinner Party</h5>

                            </div>
                        </div>
                    </div>
                </div>



                <div className='justify-content-center text-align-center service-btn' data-aos="fade-up">
                    <Link to='/gallery' type="button" class="btn btn-outline-success ">Load More</Link>
                </div>
            </div>

        </>
    )
}
