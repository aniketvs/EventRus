import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {URL} from '../Url'
const Productlist = (p) => {

    const [product, setproduct] = useState([]);
    // let delet =false;
    useEffect(() => {
        getproduct();

    }, []);

    const getproduct = async () => {
        const data = await fetch(`${URL}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const result = await data.json();

        setproduct(result);
    };


    
    //let username = JSON.parse(auth).name;
    //let profil = JSON.parse(auth).profile;
 
  
    const deletedata = async (id) => {

        let result = await fetch(`${URL}delete/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getproduct();
        }

    }




    // search a data
    const searchmethod = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`${URL}search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
      
            if (result) {
                setproduct(result);
            }
        } else {
            getproduct();
        }


    }


    return (

        
     <div>

      <img src={"./admin_images/banner_1.png"} className="img-fluid img-ratio" alt={"./public/admin_images/banner_1.png"} />
          
        <div className="container list-display ">
            
            <div className="row justify-content-center serch-list my-3">
            <div className="col-6">
                   <h4 className="search-text">Search Your Events!</h4>
                <input className="form-control me-2 search-display" onChange={searchmethod} type="text" placeholder="Search" aria-label="Search" />


            </div>
        </div>
          
        <h4 className="search-text-black">List of Events</h4>

            <table className="table" style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Cateogry</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>


                <tbody>
                    {

                        product.length > 0 ?
                            product.map((item, index) =>
                                <tr key={item._id} style={{ textAlign: "center;" }}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                                           
                                            <div class="carousel-inner">
                                               


                                                {

                                                    item.productpic.map((i, ind) => {
                                                        return (

                                                            <div class="carousel-item active">


                                                                <img src={"." + i.path.split("public")[1]} className="product_pic rounded mx-auto d-block" alt={"." + i.path.split("public")[1]} />
                                                            </div>


                                                        )

                                                    })

                                                }


                                            </div>

                                        </div>


                                    </td>
                                 
                                    <td>{item.name}</td>
                                    <td>{item.company ? item.company : "-"}</td>
                                    <td>{item.cateogry}</td>
                                    <td>{item.price}</td>
                                    <td><button type="button" onClick={() => deletedata(item._id)}
                                        className="btn btn-green">Delete</button></td>
                                    <td><Link to={"/update/" + item._id} className="btn btn-green" >Update</Link></td>

                                </tr>
                            ) : <Link to="/add" style={{ textAlign: "center", color: "#4AD295", textDecoration: "none" }} >Please add product</Link>
                    }

                </tbody>
            </table>
        </div>
    </div>

    );
};

export default Productlist;
