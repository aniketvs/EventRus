import React ,{useState,useEffect}from 'react';
import  {Link}  from 'react-router-dom';
export default function Offer_Services() {
    let [service, setservice] = useState([]);
    useEffect(() => {
        getservices();
       

    }, []);
    const getservices = async () => {
        try{
        let result = await fetch('http://localhost:5000/services');
        const data = await result.json();
        setservice(data);
        }catch(error){
            console.warn(error);
        }

    }
  return (
   <>
     <div>
                <p className='banner-card-header text-align-center' data-aos="fade-down">Services We Offer


                </p>
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

                    <div className='justify-content-center text-align-center service-btn' data-aos="fade-up">
                        <Link to='/services' type="button" class="btn btn-outline-success ">Know More</Link>
                    </div>
                </div>

            </div>

   </>
  )
}
