import { Button, Chip, Container, Divider, Grid, Link, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React,{useState} from 'react'
import '../Style/Login.css'
import i_1 from '../images/login.jpg'
import PersonIcon from '@mui/icons-material/Person';
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

  const [showPassword, setShowPassword] =useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
                  <Grid item sm={12} md={6}>
                    <Box className='trd-div'>
                      <Typography className='title'>Sign In</Typography>
                      <Box>
                      
                        <TextField required label='User Name' className='Inputtext-field' fullWidth InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
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
                      <Typography className='New-member'>New Member?<Link to='/' className='signup-link'>Sign Up Now</Link></Typography>
                      <Divider variant='middel' className='divider'>
                        <Chip label='Or'/>
                      </Divider>
                    </Box>
                    
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Modal>

    </>
  )
}
