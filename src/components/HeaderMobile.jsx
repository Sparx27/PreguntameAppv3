import { useContext, useState } from 'react'
import { SesionContext } from '../context/SesionContext'
import '../styles/stylesComponents/headerMobile.css'
import Link from '../navigation/Link'
import loginicon from '../assets/header_icons/login_icon.webp'
import homeicon from '../assets/header_icons/home_icon.webp'
import searchicon from '../assets/header_icons/search_icon.webp'
import logouticon from '../assets/header_icons/logout_icon.webp'
import preguntasicon from '../assets/header_icons/preguntas_icon.webp'
import perfilicon from '../assets/header_icons/perfil_icon.webp'
import { navegar } from '../navigation/navegar'
import MiDropDown from '../components/MiDropDown'
import { fetchCerrarSesion } from '../fetch/usuarios'
import registroIcon from '../assets/header_icons/registro_icon.webp'
import { traducirError } from '../helpers/erroresFetch'
import ContadorPreguntas from './ContadorPreguntas'

function HeaderMobile() {
  const { haySesion, setUsuarioLog, usuarioLog, setMensajeUsuario } = useContext(SesionContext)

  const [busquedaUsuario, setBusquedaUsuario] = useState('')

  function manejarInputChange(e) {
    setBusquedaUsuario(e.target.value)
  }

  async function buscarUsuario(e) {
    e.preventDefault()
    navegar(`/usuarios/buscar-usuario/${busquedaUsuario}`)
    setBusquedaUsuario('')
  }

  async function cerrarSesion() {
    try {
      const res = await fetchCerrarSesion()
      setMensajeUsuario({
        mensaje: res.message,
        tipo: 'success'
      })
      setUsuarioLog(null)
      navegar('/')
    }
    catch (error) {
      var yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
      if (!yaManejoError) {
        setMensajeUsuario({
          mensaje: error.message,
          tipo: 'danger'
        })
      }
    }
  }

  return (
    <>
      {
        haySesion && (
          <div id='mobile-buscador'>
            <div className='mi-container'>
              <div id='buscador-box'>
                <MiDropDown />
                <div className="grupo-input">
                  <img src={searchicon} alt="buscador" id='buscador-lupa' />
                  <input
                    type="text" placeholder='Nombre de usuario' id='buscador-usuario'
                    value={busquedaUsuario}
                    onChange={manejarInputChange} />
                </div>
                <button className='boton' onClick={buscarUsuario}>Buscar</button>
              </div>
            </div>
          </div>
        )
      }

      <div id='mobile-menu'>
        <div className='mi-container'>
          <div id='mobile-box'>
            {
              !haySesion && <>
                <Link to='/'>
                  <img src={homeicon} alt="home" />
                </Link>
                <Link to='/iniciar-sesion'>
                  <img src={loginicon} alt="iniciar sesion" />
                </Link>
                <Link to='/registro'>
                  <img src={registroIcon} alt="Registro de usuario" />
                </Link>
              </>
            }
            {
              haySesion && <>
                {/* <Link to='/feed'>
                  <img src={homeicon} alt="home" />
                </Link> */}
                <Link to='/usuario/preguntas' id='link-preguntas'>
                  <img src={preguntasicon} alt="preguntas" id='preguntas-icon' />
                  <ContadorPreguntas />
                </Link>
                <Link to={`/usuarios/perfil/${usuarioLog?.username}`}>
                  <img src={perfilicon} alt="perfil" />
                </Link>
                <button className='boton-img' onClick={cerrarSesion}>
                  <img src={logouticon} alt='Cerrar sesión' />
                </button>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderMobile