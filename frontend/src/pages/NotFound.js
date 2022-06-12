import { useNavigate } from 'react-router-dom'

const Notfound = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate('/');

  return (
    <div className='container'>
      <h1>404 Not Found</h1>
      <div>
        <button className='link' onClick={handleBack}>Wróć do głównej</button>
      </div>
    </div>
  )
}

export default Notfound