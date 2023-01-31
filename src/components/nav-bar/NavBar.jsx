import { NavLink } from 'react-router-dom'
import { Stack, Button } from '@mui/material'

const NavBar = () => {
    const style = {
        flexWrap: 'wrap'
    }
    return (
        <Stack direction='row' className="main-routes" sx={style}>
            
            <Button variant='outlined'>
                <NavLink to='/' >Home</NavLink>
            </Button>
            <Button variant='outlined'>
                <NavLink to='add'>Record Income/Expenses</NavLink>
            </Button>

            <Button variant='outlined'>
                <NavLink to='summary' >Summary</NavLink>
            </Button>
            
        </Stack>
    )
}

export default NavBar