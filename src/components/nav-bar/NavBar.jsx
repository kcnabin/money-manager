import { NavLink } from 'react-router-dom'
import { Stack, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [anchorElMenu, setAnchorElMenu] = useState(null)
    const openMenu = Boolean(anchorElMenu)
    const closeMenu = () => setAnchorElMenu(null)
    const navigate = useNavigate()

    return (
        <AppBar position='static' sx={{bgcolor: 'info.dark'}}>
            <Toolbar>
                <IconButton color='inherit' size='large'>
                    <MonetizationOnIcon />
                </IconButton>
                <Typography variant='body1' sx={{flexGrow: 1}}>
                    Money Manager
                </Typography>

                <Stack 
                    direction='row' 
                    className="main-routes" 
                    spacing={{
                        xs: 1,
                        sm: 4,
                        md: 6
                    }}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'inherit'

                        }
                    }}
                >
                    <NavLink to='/'>
                        <Typography variant='body1'>Home</Typography>
                    </NavLink>
                    <NavLink to='/add'>
                        <Typography variant='body1'>Record Transactions</Typography>
                    </NavLink>
                    <NavLink to='/summary' >
                        <Typography variant='body1'>Summary</Typography>
                    </NavLink>
                </Stack>

                <IconButton 
                    sx={{
                        display: {
                            xs: 'inherit',
                            sm: 'none'
                        },
                        color: 'white'
                    }}
                    onClick={e => setAnchorElMenu(e.currentTarget) }
                >
                    {openMenu ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <Menu 
                    anchorEl={anchorElMenu} 
                    open={openMenu}
                    onClose={closeMenu}
                >
                    <MenuItem>
                        <Button onClick={() => {
                            closeMenu()
                            navigate('/')
                        }}>
                            <Typography variant='body2'>Home</Typography>
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button onClick={() => {
                            closeMenu()
                            navigate('/add')
                        }}>
                            <Typography variant='body2'>Record Transactions</Typography>
                        </Button>
                    </MenuItem>
                    <MenuItem>
                        <Button onClick={() => {
                            closeMenu()
                            navigate('/summary')
                        }}>
                            <Typography variant='body2'>Summary</Typography>
                        </Button>
                    </MenuItem>
                </Menu>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar