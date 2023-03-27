import React, { useState } from 'react'
import './Style/ContactUs.css'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from '@mui/system';
import { URL } from '../Url'
import './Style/MediaQuery.css'
import Spineer from '../components/Spineer';

export default function ContactForm() {
    let [name, setname] = useState('');
    let [email, setemail] = useState('');
    let [phone, setphone] = useState(0);
    let [message, setmessage] = useState('');
    let [loader, setLoader] = useState(false);
    const sendMsg = async () => {
        try {
            setLoader(true);
            let result = await fetch(`${URL}contact`, {
                method: 'POST',
                body: JSON.stringify({ name, email, phone, message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            setLoader(false);
            if (result.result === false) {
                alert('fail');
            } else {
                
                setname('');
                setemail('');
                setphone(0);
                setmessage('');

            }
        } catch (e) {
            console.log(e);
        }
    }
    return (<>
        <Container>

            <Box className='MainDiv' data-aos='fade-right'>


                <Box>
                    {
                        loader ?
                            <div>
                                <Modal open={loader}  aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description">
                                    <div className='d-flex justify-content-center my-auto modal-spineer'>
                                        <Spineer />
                                    </div>
                                </Modal>
                            </div>
                            : ""
                    }
                    <p className='banner-card-header text-color-g'>Contact Us</p>
                    <p className='banner-card-text text-align-line active-margin-bottom-contact'> Fill Up The Form And Our Team Will Get Back To  You Within 24 Hours.</p>
                    <Box className='ConatactItem '>
                        <PhoneIcon className='phoneIcon' />
                        <Typography className='fontSizesm'> +91 8454833153</Typography>
                    </Box>
                    <Box className='ConatactItem'>
                        <EmailIcon className='phoneIcon' />
                        <Typography className='fontSizesm'>sharmavinod8454@gmail.com</Typography>
                    </Box>
                    <Box className='ConatactItem'>
                        <LocationOnIcon className='phoneIcon' />
                        <Typography className='fontSizesm'>RK Events, Ramchandra Nagar , Thane-400 604</Typography>
                    </Box>
                    <Box className='Social-icon'>
                        <FacebookIcon className='social-item' />
                        <InstagramIcon className='social-item' />
                        <TwitterIcon className='social-item' />
                    </Box>


                </Box>


                <Container className="FormMainDiv" data-aos='fade-left'>
                    <Box className='Form-div' >
                        <Box className='Form-in-div'>
                            <Box component='form' autoComplete='off'>
                                <TextField className='text-field' label='Your Name' defaultValue='Enter Your Name' value={name} onChange={(e) => { setname(e.target.value); }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    fullWidth={true}

                                />
                                <TextField className='text-field' label='Email' defaultValue='Enter Your Email' value={email} onChange={(e) => { setemail(e.target.value); }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    fullWidth={true}

                                />
                                <TextField className='text-field' label='Phone' defaultValue='Enter Your Phone Number' value={phone} onChange={(e) => { setphone(e.target.value); }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                    fullWidth={true}

                                />
                                <TextField
                                    id="standard-multiline-static"
                                    label="Messagee"
                                    multiline
                                    rows={3}
                                    fullWidth={true}
                                    defaultValue="Enter Your Message"
                                    value={message} onChange={(e) => { setmessage(e.target.value); }}
                                />


                            </Box>
                            <Box className='buttonDiv'>
                                <Button className='Button' onClick={sendMsg} variant="contained">Send Message</Button>
                            </Box>
                        </Box>

                    </Box>
                </Container>


            </Box>

        </Container>

    </>);
}