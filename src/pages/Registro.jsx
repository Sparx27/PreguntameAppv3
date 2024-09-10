import { useContext, useState } from "react"
import Form from "../components/Form"
import { validarInputsRegistro } from "../helpers/validarInputs/validarRegistro"
import { fetchRegistro } from "../fetch/usuarios"
import { SesionContext } from "../context/SesionContext"
import registroImg from '../assets/registro_img.webp'
import '../styles/stylesPages/registro.css'


function Registro() {
  const { setMensajeUsuario } = useContext(SesionContext)
  const [nuevoUsuario, setNuevoUsuario] = useState({
    registroUsername: '',
    registroEmail: '',
    registroUPassword: '',
    registroNombre: '',
    registroApellido: '',
    registroPaisId: ''
  })
  const [mensajeError, setMensajeError] = useState('')
  const [cargando, setCargando] = useState(false)

  function manejarInputs(e) {
    const { name, value } = e.target
    setNuevoUsuario({ ...nuevoUsuario, [name]: value })
  }

  async function registrarUsuario(e) {
    e.preventDefault()

    const validacionObj = validarInputsRegistro(
      nuevoUsuario.registroUsername,
      nuevoUsuario.registroEmail,
      nuevoUsuario.registroUPassword,
      nuevoUsuario.registroNombre,
      nuevoUsuario.registroApellido
    )

    if (validacionObj.valido) {
      try {
        setCargando(true)
        setMensajeError('')

        await fetchRegistro(nuevoUsuario)

        setMensajeUsuario({
          mensaje: 'Usuario registrado con éxito, puede iniciar sesión',
          tipo: 'success'
        })

        setNuevoUsuario({
          registroUsername: '',
          registroEmail: '',
          registroUPassword: '',
          registroNombre: '',
          registroApellido: '',
          registroPaisId: ''
        })
      }
      catch (error) {
        if (error.message == 'Failed to fetch') {
          return setMensajeError('El servidor no responde')
        }
        setMensajeError(error.message)
      }
      finally {
        setCargando(false)
      }
    }
    // Si no pasa la validación, entra acá
    else {
      setMensajeError(validacionObj.mensajeDeError)
      setCargando(false)
    }
  }

  const inputs = [
    {
      type: 'text',
      name: 'registroUsername',
      placeholder: 'Nombre de usuario (*)',
      value: nuevoUsuario.registroUsername,
      onChange: manejarInputs,
      required: true,
    },
    {
      type: 'email',
      name: 'registroEmail',
      placeholder: 'Email (*)',
      value: nuevoUsuario.registroEmail,
      onChange: manejarInputs,
      required: true,
    },
    {
      type: 'password',
      name: 'registroUPassword',
      placeholder: 'Contraseña (*)',
      value: nuevoUsuario.registroUPassword,
      onChange: manejarInputs,
      required: true,
    },
    {
      type: 'text',
      name: 'registroNombre',
      placeholder: 'Nombre (*)',
      value: nuevoUsuario.registroNombre,
      onChange: manejarInputs,
      required: true,
    },
    {
      type: 'text',
      name: 'registroApellido',
      placeholder: 'Apellido',
      value: nuevoUsuario.registroApellido,
      onChange: manejarInputs,
      required: false,
    }
  ]

  return (
    <section id='registro' className='row align-items-center'>
      <div className="col-12">
        <Form
          inputs={inputs}
          onSubmit={registrarUsuario}
          titulo={'Registro'}
          txtSubmit={'Registrarme!'}
          txtError={mensajeError}
          cargando={cargando}
          imgForm={registroImg} />
      </div>
    </section>
  )
}

export default Registro