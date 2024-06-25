import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

import {useAuth} from '../context/AuthContext.jsx'



import '../styles/login.css'

const Login = () => {


  const {register, handleSubmit, formState: {errors}} = useForm()
  const {user, signin , isAuthenticated, errorsbe} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard/home')
  }, [isAuthenticated])

  return (
    <div className='login--form p-5'>
      <form className='card--form' onSubmit={handleSubmit( values => {
        signin(values)        
      })}>
        {errorsbe.map((e,i) => (
          <div className="error--fforms" key={i}>
            {e}
          </div>
        ))}
        <h3>Inicio de sesion</h3>
        <label>Ingrese su correo electronico</label>
        <input type="email" name="email"{... register('email', {required: true})}/>
        {
          errors.email && <p className='text--fred'>El email es requerido</p>
        }
        <label>Ingrese su contraseña</label>
        <input type="password" name="password" {... register('password', {required: true})}/>
        {
          errors.password && <p className='text--fred'>La contraseña es requerida</p>
        }
        <button type='submit'>
          Iniciar sesion
        </button>

        <div className="logend--form">
          <Link>¿Olvide mi contraseña?</Link>
        </div>
      </form>
    </div>
  )
}

export default Login

