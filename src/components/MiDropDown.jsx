import { useContext, useState } from 'react'
import Link from '../navigation/Link'
import { SesionContext } from '../context/SesionContext'
import '../styles/stylesComponents/miDropdown.css'
import FotoUsuario from './FotoUsuario'

function MiDropDown() {
  const { usuarioLog } = useContext(SesionContext)
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className='midropdown'>
      <label className='midropdown-btn' htmlFor="optsUsuario" onClick={() => setMostrar(!mostrar)}>
        <FotoUsuario username={usuarioLog?.username} ajustarMedidas='midropdown-img' />
      </label>
      <input id='optsUsuario' type="checkbox" value={mostrar} />


      <div
        className={mostrar
          ? 'midropdown-content shadow d-block'
          : 'midropdown-content shadow'
        }
        onMouseLeave={() => mostrar && setMostrar(false)}
      >
        <div onClick={() => setMostrar(false)}>
          <Link to={`/usuarios/perfil/${usuarioLog?.username}`}>
            Perfil
          </Link>
          <Link to='/usuario/editar-perfil'>
            Editar Perfil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MiDropDown