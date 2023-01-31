
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Typography, Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import NavBar from './components/nav-bar/NavBar'
import Home from './components/home/Home'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'

const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={2}>
      <Typography variant='h6' sx={{textAlign: 'center', fontWeight: 'bold'}}>
        Money Manager - Better way to keep track your money
      </Typography>

      <NavBar />

      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route 
          path='add' 
          element={<AddIncomeExpenses />} 
        />
        <Route path='summary' element={<Summary />} />
      </Routes>

    </Stack>
    </LocalizationProvider>
  )
}

export default App