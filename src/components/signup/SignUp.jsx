import { Typography, Stack, Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const SignUp = () => {
  return (
    <>
    <Typography variant="h6">
      Sign Up Here
    </Typography>

    <Stack>
      <Typography variant="body1">
        Already have an account? 
        <Button variant="contained" sx={{marginLeft: '16px'}}>
          <NavLink to='/login'>Login here</NavLink>
        </Button>
      </Typography>
    </Stack>

    </>

  )
}

export default SignUp