import React, { useState } from 'react'
import Pic from '../images/img2.png';
import i_1 from '../images/1.jpg';
import i_2 from '../images/2.jpg';
import i_3 from '../images/3.jpg';
import i_4 from '../images/4.jpg';
import i_5 from '../images/5.jpg';
import i_6 from '../images/6.jpg';
import i_7 from '../images/7.jpg';
import i_8 from '../images/8.jpg';
import i_9 from '../images/9.jpg';
import {Box, Card, ImageList, ImageListItem, Modal, Button} from '@mui/material';
import '../Style/Gallery.css'
import { Container } from '@mui/system';
export default function Gallery() {
  const [open,setopen]=useState(false);
  const [image,setimage]=useState("false")
  const handelClose=()=>{
    setopen(false);
  }
  const handelImage=(value)=>{
    setimage(value);
    setopen(true);
  }
  return (
    <>
     <Box className='Gallery-img-Div'>
      <img src={Pic} className="img-fluid img-ratio Gallery-img" alt={Pic} />
        <h2 className='Gallery-Heading'>Galleries</h2>
      </Box>
      <Container>
     
        
        <ImageList gap={12} sx={{mt:9,mb:9,gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr)) !important'}} >
        { 
          itemData.map((item)=>(
            
            <Card key={item.img}>
              <ImageListItem sx={{height:'100% !important'}}>
                 <img 
                   src={item.img}
                   onClick={(e)=>handelImage(item.img)}
                   alt={item.title}
                   loading='lazy'
                   style={{cursor:'pointer'}} />
              </ImageListItem>
            </Card>
           
          ))

        }

        </ImageList>
         <Modal
          
            className='Modal'
           open={open}
           onClose={handelClose}
           closeAfterTransition
         
           > 
            
           <Box className='Gallery-Box'>
            
            <Card className='Gallery-Card'>
              <img className='Gallery-imgages' src={image} alt={image} />

            </Card>
            </Box>
            
           </Modal>
           
      </Container>
    </>

  );
}
const itemData= [
  {
    img: i_1,
    title: 'Breakfast',
  },
  {
    img: i_2,
    title: 'Burger',
  },
  {
    img:i_3,
    title: 'Camera',
  },
  {
    img: i_4,
    title: 'Breakfast',
  },
  {
    img: i_5,
    title: 'Burger',
  },
  {
    img:i_6,
    title: 'Camera',
  },
  {
    img: i_7,
    title: 'Breakfast',
  },
  {
    img: i_8,
    title: 'Burger',
  },
  {
    img:i_9,
    title: 'Camera',
  },
 
];
