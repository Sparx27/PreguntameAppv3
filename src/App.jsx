import { lazy, Suspense, useContext, useEffect, useRef } from "react"
import HeaderMobile from "./components/HeaderMobile"
import Router from "./navigation/Router"
import Route from "./navigation/Route"
import { SesionContext } from "./context/SesionContext"
import MensajeUsuario from "./components/MensajeUsuario"
/* import Feed from "./pages/usuarios/Feed" */
const Home = lazy(() => import('./pages/Home'))
const IniciarSesion = lazy(() => import('./pages/IniciarSesion'))
const Registro = lazy(() => import('./pages/Registro'))
const EditarPerfil = lazy(() => import('./pages/usuarios/EditarPerfil'))
const PerfilUsuario = lazy(() => import('./pages/usuarios/PerfilUsuario'))
const Preguntas = lazy(() => import('./pages/usuarios/Preguntas'))
const ResponderPregunta = lazy(() => import('./pages/usuarios/ResponderPregunta'))
const BuscarUsuarios = lazy(() => import('./pages/BuscarUsuarios'))

function App() {
  const { mensajeUsuario, haySesion } = useContext(SesionContext)
  const mainRef = useRef(null)

  useEffect(() => {
    mainRef.current.style.paddingTop = haySesion ? '55px' : '0'
  }, [haySesion])

  return (
    <div id="main-container" className="position-relative">
      <HeaderMobile />

      <div className="container-fluid position-reltive main-box">
        {
          mensajeUsuario && <MensajeUsuario mensaje={mensajeUsuario.mensaje} tipo={mensajeUsuario.tipo} />
        }
        <main ref={mainRef}>
          <Suspense>
            <Router>
              <Route to='/' Component={Home} title='Preguntame.com' bgColor='bg-gradient' />
              <Route to='/iniciar-sesion' Component={IniciarSesion} title="Iniciar Sesión" bgColor='bg-gradient' />
              <Route to='/registro' Component={Registro} title="Registrar" bgColor='bg-gradient' />
              <Route to='/usuario/editar-perfil' Component={EditarPerfil} title='Editar perfil' protectedRoute={true} />
              <Route to='/usuarios/perfil/:query' Component={PerfilUsuario} title='Perfil' />
              <Route to='/usuario/preguntas' Component={Preguntas} title='Preguntas' protectedRoute={true} />
              <Route to='/usuario/preguntas/responder-pregunta_id=:query' Component={ResponderPregunta} title="Responder pregunta" protectedRoute={true} />
              {/* <Route to='/feed' Component={Feed} title="Preguntame.com" bgColor='bg-verde' /> */}
              <Route to='/usuarios/buscar-usuario/:query' Component={BuscarUsuarios} title="Buscar usuario" bgColor='bg-verde' />
            </Router>
          </Suspense>
        </main>

      </div>
    </div>
  )
}

export default App
