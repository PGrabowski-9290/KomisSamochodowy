import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

const Offers = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState(null)

  const getOffers = async () => {
    const response = await axios.get('/offers')
    console.log(response?.data)
    setOffers(response?.data)
  }

  useEffect(()=> {
    getOffers()
  },[])

  const handleSelect = (id) => {
    navigate('/offert', {replace: true, state: { offertId: id}})
  }

  return (
    <div className='container'>
      {!offers? (
        <h1>Offers</h1> 
      ) :       
          offers?.map(el => {
            return (
              <div key={el.offerId} className='card offer-info' onClick={() => handleSelect(el.offerId)}>
                <div className='body'>
                  <div className='image'><img src={el.images?.path} alt='img'></img></div>
                  <div className='info'>
                    <div className='row'>
                      <div className='col'>
                        <h3>{el.title}</h3>
                         <p>Licznik: {el.odometer}km</p>
                        </div>
                      <div className='col prize'>
                        <div>Cena: {el.prize} zł</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default Offers