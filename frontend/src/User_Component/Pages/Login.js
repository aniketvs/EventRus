import { Button, Chip, Container, Divider, Grid,  Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import '../Style/Login.css'
import i_1 from '../images/login.jpg'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function (props) {
  const handelclose = () => {
    props.setopen(false);
  }
  const [signup, setsignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const signupchange = () => {
    setsignup(false);
  }




//states of signup

const [name,setname]=useState('');
const [phone,setphone]=useState(0);
const [email,setemail]=useState('');
const [password,setpassword] =useState('');


const register_user=async()=>{
  let result=await fetch('http://localhost:5000/register',{
    method:'POST',
    body:JSON.stringify({name,phone,email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  });
  result=await result.json();
  localStorage.setItem('register_user',JSON.stringify(result));
  let getdata=localStorage.getItem('register_user');
  if(getdata){
    props.setopen(false);
  }
}
  return (
    <>

      <Modal
        open={props.open}
        onClose={handelclose}
      >
        <Container>
          <Grid container justifyContent='center' className='g-1'>
            <Grid item sm={10}>
              <Box className='fst-div'>
                <Grid container >
                  <Grid item sm={12} md={6}>
                    <Box className='snd-div'>
                      <img src={i_1} alt={i_1} className='Login-vector' />
                    </Box>
                  </Grid>
                  {
                    (signup === true) ?
                      <Grid item sm={12} md={6}>

                        <Box className='trd-div'>
                          <Typography className='title'>Sign In</Typography>
                          <Box>

                            <TextField required label='Email' className='Inputtext-field' fullWidth InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon />
                                </InputAdornment>
                              ),
                            }} />
                            <FormControl variant='outlined' className='Inputtext-field-2' fullWidth>
                              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                              <OutlinedInput

                                fullWidth
                                id="outlined-adornment-password"

                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                              />
                            </FormControl>

                          </Box>

                          <br></br>
                          <Button variant='contend' className='lgn-btn' fullWidth>Login</Button>
                          <Typography className='New-member'>New Member?<Button className='signup-link' onClick={signupchange}>Sign Up Now</Button></Typography>
                          <Divider variant='middel' className='divider'>
                            <Chip label='Or' />
                          </Divider>

                        </Box>

                      </Grid>
                      :
                      <Grid item sm={12} md={6}>

                        <Box className='trd-div'>
                          <Typography className='title'>Sign up</Typography>
                          <Box>
                            <Box className='textform'>
                              <TextField required label='Full Name' className='Inputtext-field' InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),
                            }}  value={name} onChange={(e)=>{setname(e.target.value)}}/>

                              <TextField required label='Phone Number' className='Inputtext-field' InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                   +91
                                  </InputAdornment>
                                ),
                              }}  value={phone} onChange={(e)=>{setphone(e.target.value)}}/>



                            </Box>


                            <TextField required label='Email' className='Inputtext-field' fullWidth InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon />
                                </InputAdornment>
                              ),
                            }} value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                            <FormControl variant='outlined' className='Inputtext-field-2' fullWidth >
                              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                              <OutlinedInput

                                fullWidth
                                id="outlined-adornment-password"

                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={(e)=>setpassword(e.target.value)}
                                
                              />
                            </FormControl>

                          </Box>

                          <br></br>
                          <Button variant='contend' className='lgn-btn' onClick={register_user} fullWidth>Register</Button>
                          
                        </Box>

                      </Grid>


                  }
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Modal>

    </>
  )
}
