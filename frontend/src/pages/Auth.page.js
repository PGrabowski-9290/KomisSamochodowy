import { useState, useEffect } from 'react';
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Auth = () => {
  const {setAuth} = useAuth()

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);
  const [success,setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect( () => {
    setError('')
  },[email,pwd,confirmPwd,name])

  useEffect( () => {
    setIsValid(validateEmail(email))
    if(!isValid) {
      setError('Niepoprawny adres email')
    }
  },[email])

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !pwd ) {
      setError('Należy uzupełnić dane')
      return
    }
    
    if (isSignUp && (pwd !== confirmPwd)) { 
      setError('Niezgodne Hasła')
      return
    } 
    try {
      const url = isSignUp? '/register' : '/auth/login'
      const response = await axios.post(url, {email,pwd,name}, { 
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true
        }
      })
      
      
      if(response?.status === 200 && isSignUp) {
        setConfirmPwd('')
        setPwd('')
        setName('')
        setIsSignUp(false)
        setSuccess(true)
      }
      if (response?.status === 200 && !isSignUp) {
        const { userId, role, name, accessToken} = response?.data
        setAuth({userId, role, name, accessToken})
        navigate('/', {replace: true})
      }
      console.log('success login', success)

    } catch(err) {
      setError(err?.response?.data?.message)
    }
  }

  const handleChangeForm = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <>
      <div className='container'>
        {success && isSignUp ? (
          <div>
            <h1>Zarejestrowano</h1>
            <p>Pomyślnie zarejestrowano mail: {email}</p>
            <p><a className='link' href='/auth'>Przejdź do logowania</a></p>
          </div>
        ):(<div className='card'>
            <form className='auth-form form'>
              
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required={true}
                  placeholder="Email"
                  onChange={(e) => {setEmail(e.target.value)}}
                />
                <input 
                  type="password" 
                  name="pwd" 
                  id="pwd" 
                  required={true}
                  placeholder="Password"
                  onChange={(e) => {setPwd(e.target.value)}}
                />
              
              {isSignUp && <>
                  <input 
                  type="password" 
                  name="confirmPwd" 
                  id="confirmwd" 
                  required={true}
                  placeholder="Confirm Password"
                  onChange={(e) => {setConfirmPwd(e.target.value)}}
                />            
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required={true}
                  placeholder="Name"
                  onChange={(e) => {setName(e.target.value)}}
                />
              </>}
              <div>
                <p>{error}</p>
              </div>
              <input
                type="button"  
                value={isSignUp ? 'Zarejestruj' : 'Zaloguj'}
                onClick={handleSubmit}
              />
                
            </form>
            <div>
              <hr/>
              <p className='small-text'>{!isSignUp ? "Nie mam konta " : "Mam konto "}<button className='link' onClick={handleChangeForm}>{!isSignUp ? "Zarejestruj" : "Zaloguj"}</button></p>
            </div>
          </div>)}
      </div>
    </>
  )
}

export default Auth;