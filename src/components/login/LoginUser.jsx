import { TextField, Stack, Button, Typography, InputAdornment, IconButton } from "@mui/material"
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import axios from 'axios'
import { fetchInitialData } from "../../features/records/transactionsSlice";
import { useDispatch } from "react-redux";

const LoginUser = ({ setUser, setToken, setMsg }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const loginUrl = 'http://localhost:3001/api/login'

  const displayMsg = (msg) => {
    setMsg(msg)
    setTimeout(() => setMsg(null), 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const loggedInUser = await axios.post(loginUrl, {username, password})
      
      localStorage.setItem("user", JSON.stringify(loggedInUser.data));
      const token = `bearer ${loggedInUser.data.token}`
      localStorage.setItem("token", token);

      setUser(loggedInUser.data)
      setToken(token)
      displayMsg(`${loggedInUser.data.username} logged in!`)


      try {
          const fetchedData = await fetchInitialData(loggedInUser.data.userId)
          console.log('summary fetch', fetchedData)
          dispatch(fetchedData)
  
        } catch (e) {
          console.log(e)
          setMsg('Error fetching initial data')
      }
      
    } catch (e) {
      displayMsg('Unable to login!')
    }
  }

  return (
    <Stack>
    <Stack 
      spacing={4} 
      direction='column' 
      sx={{
        padding: '0 32px',
        
      }}
    >
      <Typography variant="body1">
        Money Manager - Better way to track your money. Login here!
      </Typography>

      <form onSubmit={handleLogin}>
        <Stack spacing={4} direction='column'>
        <TextField
          type='text'
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position='end'>
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }}
          required
        />

        <Button variant="contained" type='submit' sx={{maxWidth: '125px'}}>
          Login
        </Button>
        
        </Stack>
      </form>

      <Typography variant="body1">
        Don't have an Account?
        <Button 
          variant="contained"
        >
          <NavLink to='/signup'>Sign up here</NavLink>
        </Button>
      </Typography>

    </Stack>
    </Stack>
  )
}

export default LoginUser