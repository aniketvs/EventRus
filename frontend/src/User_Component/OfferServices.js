import React ,{useState,useEffect}from 'react';
import  {Link}  from 'react-router-dom';
import Spineer from '../components/Spineer';
import {URL} from '../Url'
import './Style/MediaQuery.css'
export default function Offer_Services() {
    let [service, setservice] = useState([]);
    let [loader,setLoader]=useState(false);
    useEffect(() => {
        getservices();
       }, []);
    const getservices = async () => {
        try{
            setLoader(true);
        let result = await fetch(`${URL}services`);
        const data = await result.json();
        setservice(data);
        setLoader(false);
        }catch(error){
            console.warn(error);
        }

    }
  return (
   <>
     <div>
                <p className='banner-card-header text-align-center active-margin-bottom' data-aos="fade-down">Services We Offer


                </p>
                { loader ?  
                    <div className='d-flex justify-content-center'>
                <Spineer/>
                </div>:
                <div className='service-card-main-body row' data-aos="fade-up">
                    {
                        service.length > 0 ?
                            service.slice(0, 3).map((item, index) =>
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
                                        <Link to={`/book/${item._id}`} className="btn btn-green book-btn" >Book Now</Link>
                                    </div>
                                </div>
                            )
                            : ""


                    }

                    <div className='justify-content-center text-align-center service-btn active-margin-top' data-aos="fade-up">
                        <Link to='/services' type="button" class="btn btn-outline-success ">Know More</Link>
                    </div>
                </div>
                }
            </div>

   </>
  )
}
