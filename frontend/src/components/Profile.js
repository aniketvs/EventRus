import React from 'react';

const Profile = () =>{
   let path = localStorage.getItem('signups');
 
   path=JSON.parse(path);
   let username=path.name;
   let email=path.email;
   path=path.profile;
   path=path.split("public");
   path='.'+path[1];
console.warn(username);
    return(
        <>
        <img src={"./admin_images/banner_2.png"} className="img-fluid img-ratio" alt={"./public/admin_images/banner_1.png"} />
     
        <div className='container'>
  <img src={path} className="rounded mx-auto d-block profile-pic"  alt={path}></img>
  <h3 className='username'>
  UserName:-
  <small class="text-muted">{username}</small>
</h3>
<h3 className='username'>
  Email:-
  <small class="text-muted">{email}</small>
</h3>
</div>
        </>
    )
}
export default Profile;
