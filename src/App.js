import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'

import NavBar from './components/nav-bar/NavBar'
import Summary from './components/summary/Summary'
import AddIncomeExpenses from './components/add-income-expenses/AddIncomeExpenses'
import SubCategorySummary from './components/subcatSummary/SubCategorySummary'
import EditRecord from './components/editRecord/EditRecord'

// import { fetchInitialData } from './features/records/transactionsSlice'
import Footer from './components/footer/Footer'
import LoginUser from './components/login/LoginUser'
import SignUp from './components/signup/SignUp'
import LoggedUserInfo from './components/login/LoggedUserInfo'
import DisplayMessage from './components/message/DisplayMessage'

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [msg, setMsg] = useState(null)
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={2}>

      <NavBar user={user} />

      <DisplayMessage msg={msg} />

      <LoggedUserInfo user={user} setUser={setUser} />

      <Routes>
        <Route index element={user 
          ? <Summary user={user} token={token} /> 
          : <LoginUser setUser={setUser} setToken={setToken} setMsg={setMsg} />} 
        />
        <Route path='/' element={user 
          ? <Summary user={user} token={token} /> 
          : <LoginUser setUser={setUser} setToken={setToken} setMsg={setMsg} />}  
        />
        <Route path='/login' element={
          <LoginUser 
            setUser={setUser} 
            setToken={setToken} 
            setMsg={setMsg} />} 
        />
        <Route path='/add' element={<AddIncomeExpenses token={token} />} />
        <Route path='/summary' element={<Summary user={user} token={token} />} />
        <Route path='/categorySummary' element={<SubCategorySummary />} />
        <Route path='/editRecord' element={<EditRecord />} />
        <Route path='/signup' element={<SignUp />} />
        
      </Routes>

      <Footer />

    </Stack>
    </LocalizationProvider>
  )
}

export default App