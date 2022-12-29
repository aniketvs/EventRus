import React from 'react'
import {Box, Card, Container, Grid} from '@mui/material'
import i_6 from '../images/1.jpg'
import i_7 from '../images/8.jpg'

import '../Style/AboutUS.css'
export default function AboutUS() {
  return (
    <>
            <Box className='Aboutus-img-Div'>
                <img src={i_6} className="img-fluid img-ratio Aboutus-img" alt={i_6} />
                <h2 className='Aboutus-Heading' data-aos='fade-up'>About US</h2>
            </Box>
            <Container className='About-Container'>
               
               <Box>
                <Grid container spacing={3}>
                   <Grid item xs={12} md={6} lg={6} >
                        <Box data-aos='fade-right'>
                          <Card>
                            <img src={i_7} className="About-Img" alt={i_7}/>
                          </Card>
                            
                        </Box>
                   </Grid>
                   <Grid item xs={12} md={6} lg={6}>
                        <Box className='Aboutus-Text-Div' data-aos='fade-left'>
                        <h5 className="banner-card-header">About us</h5>
                        <p className="card-text about-us-text">The Event Planner team does not charge any fees to its clients*. Yes, this might sound strange. However, the company earns its profits through its suppliers, with whom a very strong relationship has been built. This does not mean that the costs are up-marked to make up for the fee. On the contrary, they are less than it would cost a company when booking directly. We know it sounds too good to believe, but over the years this formula has helped the Event Planner team become the success story they are today. This has not in any way reduced the level of professionalism with which the services are carried, as shown by the large number of local and international clients,  who work with us on a regular basis.

In a nutshell, you pay no fee, pay your supplier less and have a professional team handling all your loose ends. Sounds too good, but it is true! You can check out our clients as testimonials </p>
                               
                        </Box>
                   </Grid>
                </Grid>
                </Box>
               
               
            </Container>

            <Box className='About-Container2'>
                <Box className='upper-div'>
                    <Box className='lower-div'>
                    
                    </Box>
                    <Box className='Aboutus-img-text-div' data-aos='fade-up'>
                    <p className='background-text' >"Where do we begin. Thank you so so so much for everything. For listening to everything we had to say, and making our dream day come true. Everything we envisioned came to life - and you guys made it happen."</p>
                    </Box>
                </Box>
            </Box>
          <Container className='About-Container'>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={6}>
                  <Box className='Aboutus-Text-Div' data-aos='fade-right'>
                  <h5 className="banner-card-header">About us</h5>
                  <p className="card-text aboutus-down-text">The Event Planner team does not charge any fees to its clients*. Yes, this might sound strange. However, the company earns its profits through its suppliers, with whom a very strong relationship has been built. This does not mean that the costs are up-marked to make up for the fee. On the contrary, they are less than it would cost a company when booking directly. </p>
                    
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Box data-aos='fade-left'>
                  <Card>
                      <img src={i_7} className="Down-aboutus-img" alt={i_7}/>
                  </Card>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            </Container>
    </>
  )
}
