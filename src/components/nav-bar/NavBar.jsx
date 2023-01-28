import { NavLink } from 'react-router-dom'
import { Stack, Button } from '@mui/material'

const NavBar = () => {
    return (
        <Stack spacing={2} direction='row' className="main-routes">
            
            <Button variant='outlined'>
                <NavLink to='/' >Home</NavLink>
            </Button>
            <Button variant='outlined'>
                <NavLink to='add'>Record Income/Expenses</NavLink>
            </Button>

            <Button variant='outlined'>
                <NavLink to='summary' >Monthly Summary</NavLink>
            </Button>
            
        </Stack>
    )
}

export default NavBar