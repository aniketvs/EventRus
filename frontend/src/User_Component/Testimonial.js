import React from 'react';
import Carousel from 'react-material-ui-carousel'
import img1 from '../User_images/img1.png'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import quote from '../User_images/left-quote.png'
import styled from '@emotion/styled';



const SubTitle=styled(Typography)`
 font-size:25px;
font-family:'sans-sarif';
margin-bottom:2.5rem;`

function Testimonial(props) {
    var items = [
        {
            name: "Random Name #1",
            subhead: "Probably the most ",
            url: img1,
            description: "W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy. "


        },
        {
            name: "Random Name #2",
            subhead: "Hello World!",
            url: img1,
            description: "W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy. "


        },
        {
            name: "Random Name #3",
            subhead: "Hello World!",
            url: img1,
            description: "W3Schools is optimized for learning and training. Examples might be simplified to improve reading and learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using W3Schools, you agree to have read and accepted our terms of use, cookie and privacy policy. "


        }
    ]

    return (
        <Box className='Carousel-Div'>
            <Box>
                <Box>
                    <SubTitle data-aos="fade-down" >
                        What Our Client Say About Us
                    </SubTitle>

                </Box>
                <Carousel
                    animation='slide'
                    autoPlay={true}
                    interval={4000}
                    duration={2000}
                   
                    
                    swipe={true}
                  cycleNavigation={true}
                   
                    indicators={false}
                    NextIcon={<NavigateNextIcon />}
                    PrevIcon={<NavigateBeforeIcon />}
                >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            </Box>
        </Box>
    )
}

function Item(props) {
    return (

        <Card data-aos="fade-up" className='TestimonialCard'>
           <img src={quote} alt={quote} className="quote" />
            <Box className='HeadBox'>
               
                <CardHeader 
                 
                avatar={

                    <Avatar src={props.item.url} alt={props.item.url} style={{height:'56px',width:'56px'}}

                    />

                }
                    title={props.item.name}
                    subheader={props.item.subhead}
                >
                
                </CardHeader>
            </Box>
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    {props.item.description}
                </Typography>
            </CardContent>

        </Card>

    );
}
export default Testimonial