import React, { useEffect, useState } from 'react'
import '../Style/ContactUs.css'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from '@mui/system';
import '../Style/Contact.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom'
import {URL} from '../../Url'
export default function Contact() {


    //get api
    const params = useParams();
    useEffect(() => {
        result();
    }, []);

    const [eventName, seteventName] = useState("");
    const [eventType, seteventType] = useState("");

    let result = async () => {
        try {
            let res = await fetch(`${URL}book/${params.id}`);
            res = await res.json();

            seteventName(res.name);
            seteventType(res.company);
        } catch (error) {
            console.log(error);
        }
    }




    // datae picker

    let [eventdate, seteventdate] = useState(dayjs(new Date()));
    let [lastdate, setlastdate] = useState(dayjs(new Date()));

    const handleChange = (newValue) => {

        seteventdate(newValue);

    };
    const handlelastdateChange = (newValue) => {

        setlastdate(newValue);

    };
    let startDate = `${eventdate.$D}:${eventdate.$M + 1}:${eventdate.$y}`;
    let endDate = `${lastdate.$D}:${lastdate.$M + 1}:${lastdate.$y}`;
    let [name, setname] = useState('');
    let [email, setemail] = useState('');
    let [phone, setphone] = useState("");
    let [message, setmessage] = useState('');
    let [err, seterr] = useState(false);
    let [phoneregex, setphoneregex] = useState(false);
    let [emailregex, setemailregex] = useState(false);
    let [nameregex, setnameregex] = useState(false);
    const sendMsg = async () => {



        try {
            // check weather any field is empty or not and matching reges
            

            if (!email && !phone && !name && !startDate && !endDate) {
                seterr(true);
                return false;
            }
            if(!phone){
                seterr(true);
                return false;
            }
            if (!email) {
                seterr(true);
                return false;
            }
            if (!name) {
                seterr(true);
                return false;

            }
            if (!startDate) {
                seterr(true);
                return false;
            }
            if (!endDate) {
                seterr(true);
                return false;
            }
            // regex matching  for phone
            const phoneRegex=/^(?:\+?\d{1,3}[-\s]?)?\d{10}$/;
            if(!phoneRegex.test(phone)){
                setphoneregex(true);
                 return false;
            }
            //regex matching for email
            let emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                setemailregex(true);
                 return false;
            }
            // name regex matching
            let nameRegex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            if(!nameRegex.test(name)){
                setnameregex(true);
                 return false;
            }

            let result = await fetch(`${URL}bookContact`, {
                method: 'POST',
                body: JSON.stringify({ name, email, phone, eventName, eventType, startDate, endDate, message }),

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();

            if (result.result === false) {
                alert('fail');
            } else {
                alert('Your query is submitted successfully');
                setname('');
                setemail('');
                setphone("");
                setmessage('');


            }
        } catch (error) {
            alert(error);
        };
    }
    let ErrorChange=(e)=>{
      e.preventDefault();
      seterr(false);
      if(phoneregex)
      {setphoneregex(false)}
      if(emailregex)
      {setemailregex(false)}
      if(nameregex){
        setnameregex(false);
      }
    }
    return (
        <>

            <Container className="container-margin margin-bottom-more">

                <Box className='MainDiv' data-aos='fade-right'>


                    <Box>
                        <p className='banner-card-header text-color-g'>Contact Us</p>
                        <p className='banner-card-text text-align-line'> Fill Up The Form And Our Team Will Get Back To  You Within 24 Hours.</p>
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
                                    {(err || nameregex) ?
                                        <TextField required label='Your Name' error id="outlined-error" className='text-field' defaultValue='Enter Your Name' onClick={ErrorChange} value={name} fullWidth InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                   <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                        :
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
                                    }
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>

                                             {
                                                (err || emailregex)?
                                                <TextField className='text-field' label='Email' error id='outlined-error' defaultValue='Enter Your Email' value={email} onClick={ErrorChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}

                                                fullWidth={true}

                                            />
                                                :
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
                                             }
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                        { (err || phoneregex) ?
                                            <TextField className='text-field' label='Phone' id='outlined-error' error defaultValue='Enter Your Phone Number' value={phone} onClick={ErrorChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PhoneIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}

                                                fullWidth={true}

                                            />
                                                 :

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
                                        }
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>


                                            <TextField className='text-field' label='Event Name' defaultValue='Enter Your Email' value={eventName}

                                                fullWidth={true}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField className='text-field' label='Type Of Event' defaultValue='Enter Your Phone Number' value={eventType}


                                                fullWidth={true}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginBottom: "2rem" }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                              
                                                <DesktopDatePicker
                                                    label="From"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={eventdate}
                                                    onChange={handleChange}
                                                    renderInput={(params) => <TextField {...params} fullWidth={true} />}
                                                />
                                            

                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} className="marginto">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    label="to"
                                                    inputFormat="MM/DD/YYYY"
                                                    value={lastdate}
                                                    onChange={handlelastdateChange}
                                                    renderInput={(params) => <TextField {...params} fullWidth={true} />}
                                                />

                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
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

        </>
    )
}
