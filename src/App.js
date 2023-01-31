
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Typography, Stack } from '@mui/material'
import { useState } from 'react'

import NavBar from './components/nav-bar/NavBar'
import Home from './components/home/Home'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const App = () => {
  const [addedRecords, setAddedRecords] = useState([])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={2}>
      <Typography variant='h6' sx={{textAlign: 'center', fontWeight: 'bold'}}>
        Money Manager - Better way to keep track your money
      </Typography>

      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='add' 
          element={
            <AddIncomeExpenses 
              addedRecords={addedRecords} 
              setAddedRecords={setAddedRecords} 
            />} 
        />
        <Route path='summary' element={<Summary addedRecords={addedRecords} />} />
      </Routes>

    </Stack>
    </LocalizationProvider>
  )
}

export default App