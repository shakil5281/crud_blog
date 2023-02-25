import React from 'react'
import { Box, IconButton, Paper, TextField, Typography } from '@mui/material'
import AirplayTwoToneIcon from '@mui/icons-material/AirplayTwoTone';
import { Link } from 'react-router-dom';
import { MdVerifiedUser } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';
import { getEmail, getOTP, setOTP } from '../../../helper/SessonStorage';



const AccountVerifyOTP = () => {



  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const sentEmailOTP = async () => {
    try {
      setLoading(true)
      await axios.post(`/otpverification/${getEmail()}/${inputs.otp}`)
      setLoading(false)
      setOTP(inputs.otp)
      enqueueSnackbar('OTP Verification success', { variant: 'success' });
      navigate('/users/createaccout')
    } catch (err) {
      setLoading(false)
      enqueueSnackbar(err.response.data.data, { variant: 'error' });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sentEmailOTP()
  }

  React.useEffect(()=>{
    getEmail()
  })
  return (
    <>
      <Box component={'div'} sx={{ padding: '30px 25px', lineHeight: '20px' }}>
        <IconButton LinkComponent={Link} to='/' size='large' color='primary'>
          <AirplayTwoToneIcon />
        </IconButton>
      </Box>
      <Paper component={'form'} onSubmit={handleSubmit} sx={{ width: '400px', margin: '0 auto', padding: 2 }} elevation={0}>
        <Typography variant='h1' sx={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
          <MdVerifiedUser />
        </Typography>
        <Typography sx={{ textAlign: 'center', margin: '15px 0', fontWeight: 'bold', fontSize: '1.7rem' }}>
          OTP Verification
        </Typography>
        <Typography variant='body2' sx={{ padding: '10px 30px', textAlign: 'center' }}>
          Please enter the email address associated with your account and We will email you a link to Account verification.
        </Typography>
        <TextField
          onChange={handleChange}
          name="email"
          value={ inputs.email || getEmail()}
          variant='outlined' color='success' sx={{ marginTop: 4, display: 'block' }} label='Email Address' fullWidth disabled />
        <TextField
          name="otp"
          value={inputs.otp || ""}
          onChange={handleChange}
          variant='outlined' color='success' sx={{ marginTop: 4, display: 'block' }} label='OTP code' fullWidth />
        <LoadingButton
          loading={loading}
          loadingPosition="center"
          type='submit' variant='contained' sx={{ marginTop: 4, display: 'block', width: '100%', padding: 2 }}>OTP Verify</LoadingButton>
      </Paper>

    </>
  )
}

export default AccountVerifyOTP