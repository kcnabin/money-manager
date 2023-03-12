import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import NavBar from './components/nav-bar/NavBar'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'
import SubCategorySummary from './components/subcatSummary/SubCategorySummary'
import EditRecord from './components/editRecord/EditRecord'

import { fetchInitialData } from './features/records/transactionsSlice'
import Footer from './components/footer/Footer'
import LoginUser from './components/login/LoginUser'
import SignUp from './components/signup/SignUp'
import LoggedUserInfo from './components/login/LoggedUserInfo'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchInitialData())
  }, [dispatch])

  const [user, setUser] = useState(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={2}>

      <NavBar user={user} />

      <LoggedUserInfo user={user} setUser={setUser}  />

      <Routes>
        <Route index element={user ? <Summary /> : <LoginUser setUser={setUser} />} />
        <Route path='/' element={user ? <Summary /> : <LoginUser setUser={setUser} />}  />
        <Route path='/add' element={<AddIncomeExpenses />} />
        <Route path='/summary' element={<Summary />} />
        <Route path='/categorySummary' element={<SubCategorySummary />} />
        <Route path='/editRecord' element={<EditRecord />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LoginUser />} />
      </Routes>

      <Footer />

    </Stack>
    </LocalizationProvider>
  )
}

export default App