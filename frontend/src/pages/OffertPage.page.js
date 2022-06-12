import { useEffect, useState } from 'react'
import axios from '../api/axios';
import {useLocation, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Back from '../components/Back'
import ImageSlider from '../components/ImageSlider';

const OffertPage = () => {
  const { auth } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { offertId } = location.state || 0

  const [offertInfo,setOffertInfo] = useState(null)
  
  const getOfferInfo = async (id) => {
    const response = await axios.get(`/offers/${id}`)
    setOffertInfo(response.data)
  }

  useEffect(()=>{
    getOfferInfo(offertId)
  }, [])

  const handleReserve = () => {
    navigate('/reserve', {replace: true, state: {offertId: offertId}})
  }
  return (
    <>
      <div className='container'>
        {!offertInfo?.offerId? (
          <div className='card'>
            <h1>Loading data...</h1>
          </div>
        ):(<div className='card offert-page col'>
          <div className='controls row'>
            {console.log(offertInfo)}
            {auth.role <= 2 && <button className='btn btn-normal' onClick={()=> console.log('Niezaimplementowano')}>Edit</button>}
            {auth.role <= 3 && <button className='btn btn btn-normal' onClick={handleReserve}>Rezerwuj</button>}
          </div>
          <div className='imageViewer row'>
            <ImageSlider images={offertInfo.Images} />
          </div>
          <div className='row datasheet'>
            <div className='col'>
              <h2>{offertInfo.title}</h2>
              <div className='row'>
                <p>
                  {offertInfo.description}
                </p>
              </div>
              <div className='col'>
                <h4>Dane pojazdu:</h4>
                <table >
                  <tbody>
                    <tr>
                      <td>Marka</td><td>{ offertInfo?.brandName }</td>
                    </tr>
                    <tr>
                      <td>Model</td><td>{ offertInfo?.model }</td>
                    </tr>
                    <tr>
                      <td>Przebieg</td><td>{ offertInfo?.odometer }</td>
                    </tr>
                    <tr>
                      <td>Kolor</td><td>{ offertInfo?.color }</td>
                    </tr>
                    <tr>
                      <td>Rok produkcji</td><td>{ offertInfo?.prodYear }</td>
                    </tr>
                    <tr>
                      <td>Rok pierwszej rejestracji</td><td>{ offertInfo?.firstRegistrationYear }</td>
                    </tr>
                    <tr>
                      <td>VIN</td><td>{ offertInfo?.vin }</td>
                    </tr>
                    <tr>
                      <td>Silnik</td><td>{ offertInfo?.engineType }</td>
                    </tr>
                    <tr>
                      <td>Rodzaj paliwa</td><td>{ offertInfo?.fuelTypeName }</td>
                    </tr>
                    <tr>
                      <td>Moc</td><td>{ offertInfo?.power }KM</td>
                    </tr>
                    <tr>
                      <td>Napęd</td><td>{ offertInfo?.drive }</td>
                    </tr>
                    <tr>
                      <td>Skrznia Biegów:</td><td>{ offertInfo?.transmision }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>)}

      </div>
      <Back to={'/offers'} />
    </>  
  )
}

export default OffertPage