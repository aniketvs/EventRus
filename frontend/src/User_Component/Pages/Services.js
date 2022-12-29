import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import i_6 from '../images/10.jpg';
import { Link } from 'react-router-dom';
import '../Style/Services.css'

export default function () {
    let [service, setservice] = useState([]);
    useEffect(() => {
        getservices();


    }, []);
    const getservices = async () => {
        let result = await fetch('http://localhost:5000/services');
        const data = await result.json();
        setservice(data);

    }
    return (
        <>
            <Box className='Gallery-img-Div'>
                <img src={i_6} className="img-fluid img-ratio Gallery-img" alt={i_6} />
                <h2 className='Gallery-Heading' data-aos='fade-up'>Our Services</h2>
            </Box>
            <div className='service-main-div'>
                <div className='service-card-main-body row' data-aos="fade-up">
                    {
                        service.length > 0 ?
                            service.map((item,index) =>
                                <div key={item._id} className="card service-card-body col-lg-4 col-md-4 col-sm-6 col-12" >
                                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                                        <div class="carousel-inner">


                                            {


                                                item.productpic.map((i, ind) => {
                                                    return (
                                                        <div class="carousel-item active">
                                                            <img src={"." + i.path.split("public")[1]} className="card-img-top" alt={"." + i.path.split("public")[1]} />
                                                        </div>
                                                    )

                                                })



                                            }
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.company}</p>
                                        <p className="card-text">{(item.cateogry).slice(0, 50)}</p>
                                        <Link to="/" className="btn btn-green book-btn" >Book Now</Link>
                                    </div>
                                </div>
                            )
                            : ""


                    }
                </div>
            </div>


        </>
    )
}
