
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Typography, Stack } from '@mui/material'

import NavBar from './components/nav-bar/NavBar'
import Home from './components/home/Home'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'

const App = () => {
  return (
    <Stack spacing={2}>
      <Typography variant='h5'>Money Manager - Better way to keep track of your money</Typography>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='add' element={<AddIncomeExpenses />} />
        <Route path='summary' element={<Summary />} />
      </Routes>

    </Stack>
  )
}

export default App