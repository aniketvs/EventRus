import React, { useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from './Banner';
import AboutUs from './AboutUs';
import OfferService from './OfferServices';
import GalleryHome from './GalleryHome';
import Testimonial from './Testimonial';
import '../User_Component/Style/Home.css'
import ContactForm from './ContactForm';

export default function Home() {
   
    useEffect(() => {
         AOS.init();

    }, []);
  



    return (
        <>
            {/*Banner*/}
             <Banner/>
            {/*good lines*/}
            <div className="card banner-card-body" data-aos="fade-down">
                <div className="card-body">
                    <p className='banner-card-header'>FOR THE FEARLESSLY AUTHENTIC</p>
                    <p className='banner-card-text'>
                        We are your go-to people when it comes to wedding and event styling and florals. We can do as much or <br></br> as little as you need – looking after all styling, hire and the all important blooms. We think of everything <br />so that you don’t have to and we pride ourselves on always having your best interest at heart
                    </p>
                </div>
            </div>

            {/*About Us*/}
             <AboutUs/>
            {/* Our Services */}
            <OfferService/>
           <ContactForm/>

            {/*Gallery */}
             <GalleryHome/>

             <Testimonial/>
           
        </>
    );
};