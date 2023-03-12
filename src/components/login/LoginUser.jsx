import { TextField, Stack, Button, Typography, InputAdornment, IconButton } from "@mui/material"
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginUser = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = e => {
    e.preventDefault()
    setUser({
      username: 'kcnabin',
      name: 'Nabin KC',
      token: 'wantSomeToken'
    })
  }

  return (
    <Stack spacing={4} direction='column' sx={{padding: '0 32px'}}>
      <Typography variant="body1">
        Login here!
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
  )
}

export default LoginUser