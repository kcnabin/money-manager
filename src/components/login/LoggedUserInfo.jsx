import { Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoggedUserInfo = ({ user, setUser }) => {
  const navigate = useNavigate()

  const logOutUser = () => {
    navigate('/')
    setUser(null)
    localStorage.clear()
    console.log('user logged out!')
  }

  if (user) {
    
    return (
      <Stack direction='row' sx={{alignItems: 'center', padding: '0 32px'}}>
        <Typography variant="body1">
          Welcome {user.name}!
        </Typography>

        <Button 
          onClick={logOutUser}
          variant='contained'
          size='small'
          sx={{marginLeft: '16px'}}
        >
          Log Out
        </Button>
      </Stack>
    )
  }
  return
}

export default LoggedUserInfo