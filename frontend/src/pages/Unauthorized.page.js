import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className='container'>
      <h1>Nieutoryzowany dostęp</h1>
      <div>
        <p className='text-muted'>Brak uprawnień</p>
      </div>
      <div>
        <button className='link' onClick={handleBack}>Wróć do poprzedniej strony</button>
      </div>
    </div>
  )
}

export default Unauthorized