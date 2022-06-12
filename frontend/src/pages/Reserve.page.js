import { useEffect, useState } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth'
import {useLocation} from 'react-router-dom'

const Reserve = () => {
  const location = useLocation()
  const { auth } = useAuth()
  const { offertId } = location.state
  const [days, setDays] = useState(0)
  const [prize, setPrize] = useState(0)
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const addDays = (e) => {
    e.preventDefault()
    if(days<5) {
      setDays(days+1)
    }
  }

  const removeDays = (e) => {
    e.preventDefault()
    if(days>0) {
      setDays(days-1)
    }
  }

  useEffect(()=>{
    const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + days)
    setDate(dateObj.toISOString().split('T')[0])
    setPrize(days*50)
  },[days])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await axios.post('/reservation/add', 
        {
          userId: auth.userId, 
          offerId: offertId, 
          reservationEnd: date, 
          role: auth.role}, 
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        })

      console.log(response)
      if(response.status === 200) setSuccess(true)
    }catch(error) {
      setError(error?.response?.data?.message)
    }
  }

  return (
    <div className='container'>
      {success ? (
      <div>
        <h1>Zarezerwowano</h1>
        <p><a className='link' href='/offers'>Przejdź do ofert</a></p>
      </div>
      ) : (
      <>
        <h3>Tworzenie rezerwacji oferty</h3>
        <div>
          <form className='form'>
            <div >
              <span><b>Ilość dni:</b> {days}</span>
              <button className='btn btn-normal btn-small' onClick={(e) => addDays(e)}>+</button>
              <button className='btn btn-normal btn-small' onClick={(e) => removeDays(e)}> - </button>
              
            </div>
            <p><b>Rezerwacja do:</b> {date}</p>
            <p><b>Koszt rezerawacji: </b>{prize} zł</p>
            <div className='row'>
              <input 
                type="submit"
                onClick={(e) => handleSubmit(e)}
                value="Zarezerwuj"
              />
            </div>
          </form>
          <p>{error}</p>
        </div>
      </>
    )}
    </div>
  )
  
}

export default Reserve