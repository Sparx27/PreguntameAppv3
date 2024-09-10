import '../styles/stylesPages/home.css'
import logo from '../assets/logo.webp'
import { useState } from 'react'
import { navegar } from '../navigation/navegar'

function Home() {
  const [busquedaUsuario, setBusquedaUsuario] = useState('')

  function manejarInputChange(e) {
    setBusquedaUsuario(e.target.value)
  }

  async function buscarUsuario(e) {
    e.preventDefault()
    navegar(`/usuarios/buscar-usuario/${busquedaUsuario}`)
  }

  return (
    <section id='home' className='row align-items-center'>

      <div className='col-12'>

        <div className="row d-flex justify-content-center">

          <div className='col-11 col-md-6 col-lg-4 mb-2'>
            <img id='home-logo' src={logo} alt='preguntame.com' />
          </div>

          <h1 className="col-12 text-center oscuro mb-3">Preguntá a quien quieras. Incluso de forma anónima!</h1>

          <form id="home-form" className="col-12 col-md-8 d-flex" onSubmit={buscarUsuario}>
            <input className="w-100"
              type="text"
              placeholder='Buscar usuarios'
              name="busqueda"
              value={busquedaUsuario}
              onChange={manejarInputChange} />
            <input type="submit" value="BUSCAR" />
          </form>
        </div>

      </div>
    </section>
  )
}

export default Home