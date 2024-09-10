import { useContext, useState } from 'react'
import Form from '../components/Form'
import '../styles/stylesPages/iniciarSesion.css'
import { fetchiIniciarSesion } from '../fetch/usuarios'
import { SesionContext } from '../context/SesionContext'
import { navegar } from '../navigation/navegar'
import imgIngresar from '../assets/ingresar_img.webp'
import { traducirError } from '../helpers/erroresFetch'

function IniciarSesion() {
  const [credenciales, setCredenciales] = useState({
    loginUsername: '',
    loginPassword: ''
  })
  const [mensajeError, setMensajeError] = useState('')
  const { setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)
  const [cargando, setCargando] = useState(false)

  async function iniciarSesion(e) {
    e.preventDefault()
    try {
      setCargando(true)
      setMensajeError('')

      const datosUsuario = await fetchiIniciarSesion(credenciales.loginUsername, credenciales.loginPassword)
      window.localStorage.setItem('usuario', JSON.stringify(datosUsuario))
      setUsuarioLog(datosUsuario)

      setCredenciales({ loginUsername: '', loginPassword: '' })
      navegar('/usuario/preguntas')
    }
    catch (error) {
      const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
      if (!yaManejoError) {
        setMensajeError(error.message)
      }
    }
    finally {
      setCargando(false)
    }
  }

  function manejarInputs(e) {
    const { name, value } = e.target
    setCredenciales({ ...credenciales, [name]: value.trim() })
  }

  const inputs = [
    {
      type: 'text',
      name: 'loginUsername',
      placeholder: 'Username',
      value: credenciales.loginUsername,
      onChange: manejarInputs,
      required: true,
    },
    {
      type: 'password',
      name: 'loginPassword',
      placeholder: 'Password',
      value: credenciales.loginPassword,
      onChange: manejarInputs,
      required: true,
    }
  ]
  return (
    <section id='iniciar-sesion' className='row align-items-center'>
      <div className="col-12">
        <Form
          inputs={inputs}
          onSubmit={iniciarSesion}
          titulo={'Iniciar Sesión'}
          txtSubmit={'Iniciar'}
          txtError={mensajeError}
          cargando={cargando}
          imgForm={imgIngresar} />
      </div>
    </section>
  )
}

export default IniciarSesion