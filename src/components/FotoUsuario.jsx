import { useEffect, useState } from 'react'
import { fetchGetFotoUsuario } from '../fetch/usuarios'
import fotoGenericaUsuario from '../assets/foto_perfil.jpg'
import "../styles/stylesComponents/fotoUsuario.css"

function FotoUsuario({ username, ajustarMedidas }) {
  const [foto, setFoto] = useState(fotoGenericaUsuario)

  useEffect(() => {
    if (username != undefined) {
      let montado = true

      async function obtenerFoto() {
        try {
          const fotoRes = await fetchGetFotoUsuario(username);
          const imgUrl = URL.createObjectURL(fotoRes);

          if (montado) {
            setFoto(imgUrl);
          }
        } catch (error) {
          setFoto(fotoGenericaUsuario)
          console.log(error);
        }
      }
      obtenerFoto()

      return () => {
        URL.revokeObjectURL(fotoGenericaUsuario);
        montado = false;
      }
    }
  }, [username])

  return <div className={`foto-usuario-box ${ajustarMedidas}`}>
    <img src={foto} alt='foto usuario' />
  </div>


}

export default FotoUsuario