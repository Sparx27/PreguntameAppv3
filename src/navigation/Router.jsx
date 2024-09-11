import { Children, useContext, useEffect, useState } from "react"
import { SesionContext } from "../context/SesionContext"
import { match } from "path-to-regexp"


function Router({ children, defaultComponent: DefaultComponent = ({ code }) => <h1>{code}</h1> }) {
  const [pathActual, setPathActual] = useState(window.location.pathname)
  const { haySesion, obtenerNumeroPreguntas } = useContext(SesionContext)

  useEffect(() => {
    function alCambiarPath() {
      setPathActual(window.location.pathname)
    }
    async function notificaciones() {
      if (haySesion) {
        obtenerNumeroPreguntas()
      }
    }
    window.addEventListener('pushstate', alCambiarPath)
    window.addEventListener('pushstate', notificaciones)
    window.addEventListener('popstate', alCambiarPath)
    window.addEventListener('popstate', notificaciones)

    return () => {
      window.removeEventListener('pushstate', alCambiarPath)
      window.removeEventListener('popstate', alCambiarPath)
      window.removeEventListener('pushstate', notificaciones)
      window.removeEventListener('popstate', notificaciones)
    }
  }, [])

  const liRoutes = Children.map(children, (hijo) => {
    if (hijo.type.displayName != 'Route') return null

    return {
      path: hijo.props.to,
      Component: hijo.props.Component,
      title: hijo.props.title,
      protectedRoute: hijo.props.protectedRoute,
      bgColor: hijo.props.bgColor
    }
  })

  let code = '404'
  let routeParams = {}
  const EncontrarPagina = liRoutes.find(r => {
    if (r == null) return false

    if (r.path == pathActual && r.protectedRoute && !haySesion) {
      code = '401'
      return false
    }

    if (r.path == pathActual) return true

    const esPathConQuert = match(r.path, { decode: decodeURIComponent })
    const esMatch = esPathConQuert(pathActual)
    if (!esMatch) {
      return false
    }
    routeParams = esMatch.params
    return true
  })

  if (EncontrarPagina) {
    document.title = EncontrarPagina.title
    document.getElementById('root').className = EncontrarPagina.bgColor
  }


  return EncontrarPagina
    ? <EncontrarPagina.Component routeParams={routeParams} />
    : <DefaultComponent code={code} />
}

export default Router