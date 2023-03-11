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
import SubCategorySummary from './components/subcatSummary/SubCategorySummary'
import EditRecord from './components/editRecord/EditRecord'
import { useDispatch } from 'react-redux'
import { fetchInitialData } from './features/records/transactionsSlice'
import Footer from './components/footer/Footer'

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
        <Route index element={<Summary />} />
        <Route path='/' element={<Home />} />
        <Route 
          path='/add' 
          element={<AddIncomeExpenses />} 
        />
        <Route path='/summary' element={<Summary />} />
        <Route path='/categorySummary' element={<SubCategorySummary />} />
        <Route path='/editRecord' element={<EditRecord />} />
        
      </Routes>

      <Footer />

    </Stack>
    </LocalizationProvider>
  )
}

export default App