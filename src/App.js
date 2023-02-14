import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useEffect } from 'react'

import NavBar from './components/nav-bar/NavBar'
import Home from './components/home/Home'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'
import { useDispatch } from 'react-redux'
import { fetchInitialData } from './features/records/transactionsSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchInitialData())
  }, [dispatch])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={2}>

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