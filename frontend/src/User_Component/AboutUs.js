import React from "react";
import img2 from '../User_images/img2.png';
import { Link } from "react-router-dom";
export default function About_us(){
    return(<>
         <div className='container About-us-body'>
                <div className="card mb-3" style={{ border: "none" }} >
                    <div className="row g-0">
                        <div className="col-md-6" data-aos="fade-right">
                            <img src={img2} className="img-fluid rounded-start" alt={img2} />
                        </div>
                        <div className="col-md-6 about-us-text-body" data-aos="fade-left">
                            <div className="card-body">
                                <h5 className="banner-card-header">About us</h5>
                                <p className="card-text about-us-text">I’m the owner and creative behind The Wild Side. I’ve got a hell of a passion for flowers, styling, weddings & events. Nothing lights me up quite like seeing my clients’ jaws drop as they see their ideas come to life. My style is wild and untamed ... </p>
                                <Link class="btn btn-outline-success " to='/aboutus'>Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>);
}