import React from 'react'
import { Box, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import AirplayTwoToneIcon from '@mui/icons-material/AirplayTwoTone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import { getEmail, getOTP } from '../../../helper/SessonStorage';

const UserSignup = () => {

  const [inputs, setInputs] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  const userCreate = async () => {
    try {
      setLoading(true)
      await axios.post('/createaccount',{firstName: inputs.firstName, lastName: inputs.lastName, email: getEmail(), otp: getOTP(), password: inputs.password})
      enqueueSnackbar('Account create success', { variant: 'success' });
      setLoading(false)
      localStorage.clear();
      navigate('/users/login')

    } catch (err) {
      console.log(err.message)
      enqueueSnackbar(err.response.data.Error, { variant: 'error' });
      setLoading(false)

    }

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    userCreate();
  }


  return (
    <Box component={'div'} sx={{ display: 'flex', height: '100%', position: 'absolute', width: '100%' }}>
      <Box component={'div'} sx={{ width: { xs: '0', lg: '65%' }, background: 'whitesmoke', display: { xs: 'none', lg: 'block' } }}>
        <Stack sx={{ margin: '0 auto', justifyContent: 'center', display: 'block', padding: 6 }}>
          <IconButton LinkComponent={Link} to='/' size='large' color='primary'>
            <AirplayTwoToneIcon />
          </IconButton>
          <Typography sx={{ textAlign: 'center', margin: '25px 0', fontWeight: '600' }} variant='h4'>
            Manage the job more effectively with Minimal
          </Typography>
          <Box>
            <img style={{ margin: '0 auto', justifyContent: 'center', display: 'flex', width: '500px' }} src="/upload/illustration_dashboard.png" alt="loginPage" />
          </Box>
        </Stack>
      </Box>
      <Box component={'div'} sx={{ width: { xs: '100%', lg: '35%' } }}>
        <Paper component={'form'} onSubmit={handleSubmit} elevation={0} sx={{ marginTop: { xs: 3, lg: 12 }, padding: { xs: 2, lg: 6 } }}>
          <Typography sx={{ fontWeight: '600', margin: '25px 0' }} variant='h5'>
            Get started absolutely free.
          </Typography>
          <Box sx={{ margin: '20px 0' }}>
            <Typography variant='body2'>
              Already have an account?<Link to='/users/login'> <span style={{ color: '#7ccb7c', textDecoration: 'none', fontWeight: 'bold' }}> User Login</span></Link>
            </Typography>
          </Box>
          <TextField
            required
            name="firstName"
            value={inputs.firstName || ""}
            onChange={handleChange}
            color='success' sx={{ marginTop: 3, width: '47%', marginRight: 1 }} label='First name' />
          <TextField
            required
            name="lastName"
            value={inputs.lastName || ""}
            onChange={handleChange}
            color='success' sx={{ marginTop: 3, width: '47%', marginLeft: 1 }} label='Last name' />
          <TextField
            required
            name="email"
            value={ inputs.email || getEmail()}
            onChange={handleChange}
            color='success' sx={{ marginTop: 3 }} label='Email Address' fullWidth disabled/>
          <TextField
            required
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            color='success' sx={{ marginTop: 3 }} label='Password' fullWidth />
          <Box component={'div'} sx={{ display: 'block' }}>
            <LoadingButton
              loading={loading}
              loadingPosition="center" variant='contained' sx={{ marginTop: 3, textTransform: 'capitalize', width: '100%', dispaly: 'block', padding: 2 }} color='success' type='submit' disableElevation>Create account</LoadingButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default UserSignup