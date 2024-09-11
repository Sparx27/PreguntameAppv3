import { useContext, useEffect, useRef, useState } from 'react'
import '../../styles/stylesPages/usuarios/editarPerfil.css'
import { SesionContext } from '../../context/SesionContext'
import { fetchCambiarFotoUsuario, fetchEditarPerfil, fetchGetFotoUsuario } from '../../fetch/usuarios'
import { traducirError } from '../../helpers/erroresFetch'
import { navegar } from '../../navigation/navegar'
import Spinner from '../../components/Spinner'
import fotoUsuario from '../../assets/foto_perfil.jpg'
import cambiarFotoIcon from '../../assets/cambiarFoto_icon.webp'
import MiModal from '../../components/MiModal'
import buscarcarpetaIcon from '../../assets/buscarcarpeta_icon.webp'
import FotoUsuario from '../../components/FotoUsuario'

function EditarPerfil() {
  const { usuarioLog, setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)
  const [mostrarModal, setMostrarModal] = useState(false)

  const imgInput = useRef(null)
  const [cargandoImg, setCargandoImg] = useState(false)
  const [errorImgMessage, setErrorImgMessage] = useState('')
  const [imgUsuario, setImgUsuario] = useState({
    img: fotoUsuario,
    cambio: false
  })

  const [cargando, setCargando] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState({
    username: usuarioLog?.username,
    nombre: usuarioLog?.nombre,
    apellido: usuarioLog?.apellido,
    email: usuarioLog?.email,
    bio: usuarioLog?.bio ?? ''
  })
  useEffect(() => {
    if (usuarioLog) {
      setDatosUsuario({
        username: usuarioLog.username,
        nombre: usuarioLog.nombre,
        apellido: usuarioLog.apellido,
        email: usuarioLog.email,
        bio: usuarioLog.bio ?? ''
      })

      async function obtenerFoto() {
        try {
          const fotoRes = await fetchGetFotoUsuario(usuarioLog.username)
          const imgUrl = URL.createObjectURL(fotoRes)
          setImgUsuario({ ...imgUsuario, img: imgUrl })
        } catch (error) {
          console.log(error)
        }
      }
      obtenerFoto()
    }
  }, [usuarioLog])

  function manejarDatos(e) {
    const { name, value } = e.target
    setDatosUsuario({ ...datosUsuario, [name]: value })
  }

  async function editarPerfil(e) {
    e.preventDefault()
    setCargando(true)
    try {
      const nuevoUsuario = await fetchEditarPerfil(datosUsuario)

      setUsuarioLog(() => {
        window.localStorage.setItem('usuario', JSON.stringify(nuevoUsuario))
        const usuario = window.localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
      })

      setMensajeUsuario({
        mensaje: 'Cambios realizados con éxito',
        tipo: 'success'
      })
    }
    catch (error) {
      const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
      if (!yaManejoError) {
        setMensajeUsuario({ mensaje: error.message })
      }
    }
    finally {
      setCargando(false)
    }
  }

  function manejarCambioFoto(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // URL temporal para mostrar la imagen seleccionada
      const imageUrl = URL.createObjectURL(selectedFile);

      // Asignar la URL temporal al atributo 'src' del img
      setImgUsuario({ img: imageUrl, cambio: true })
    }
  }

  async function subirNuevaFotoUsuario() {
    setErrorImgMessage('')
    if (imgUsuario.cambio) {
      setCargandoImg(true)

      const nuevaFotoInput = imgInput.current.files[0]

      if (nuevaFotoInput.size > 500000) {
        setErrorImgMessage('La imagén debe pesar menos de 500kb')
      }
      else if (
        nuevaFotoInput.type != 'image/png' &&
        nuevaFotoInput.type != 'image/jpeg' &&
        nuevaFotoInput.type != 'image/jpg' &&
        nuevaFotoInput.type != 'image/webp'
      ) {
        setErrorImgMessage('La imagen debe ser .jpg o .png o .webp')
      }
      else {
        const formData = new FormData()
        formData.append('fotoUsuario', nuevaFotoInput)

        try {
          await fetchCambiarFotoUsuario(formData)
          // ARREGLAR ESTO DEL RELOAD Y QUE SE MUESTRE LA NUEVA FOTO EN TODOS LOS FOTOUSUARIO
          window.location.reload()
          setMensajeUsuario({ mensaje: 'La foto ha sido cambiada con éxito', tipo: 'success' })
          setMostrarModal(false)
        }
        catch (error) {
          const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
          if (!yaManejoError) {
            setMensajeUsuario({ mensaje: error.message.message })
          }
        }
      }

      setCargandoImg(false)
    }
  }

  return (
    <section className='mb-4'>
      <h1 className="oscuro text-center mt-4">Editar Perfil</h1>
      <div className='card-datos shadow pb-4 pt-1'>

        {
          cargando
            ? <Spinner />
            : <form onSubmit={editarPerfil}>
              <div className="container-fluid">
                <div className="row form-grid pt-3">

                  <div className='col-12 d-flex justify-content-center'>
                    <div className='foto-perfil-usuario' onClick={() => setMostrarModal(true)}>
                      <FotoUsuario username={datosUsuario.username} ajustarMedidas='foto-perfil-usuario' />
                      <img src={cambiarFotoIcon} alt='cambiar foto' className='cambiar-foto-perfil-icon' />
                    </div>

                  </div>

                  <div className='col-12 col-md-6 col-lg-4 my-2 my-lg-3'>
                    <p className='opt-titulo'>Nombre</p>
                    <input id='nombre' name='nombre' type="text"
                      value={datosUsuario.nombre}
                      onChange={manejarDatos}
                      required />
                  </div>

                  <div className='col-12 col-md-6 col-lg-4 my-2 my-lg-3'>
                    <p className='opt-titulo'>Apellido</p>
                    <input id='apellido' name='apellido' type="text"
                      value={datosUsuario.apellido}
                      onChange={manejarDatos}
                      required />
                  </div>

                  <div className='col-12 col-md-6 col-lg-4 my-2 my-lg-3'>
                    <p className='opt-titulo'>Email</p>
                    <input id='email' name='email' type="email"
                      value={datosUsuario.email}
                      onChange={manejarDatos}
                      required />
                  </div>

                  <div className='col-12 mb-2 mb-lg-3'>
                    <p className='opt-titulo'>Bio</p>
                    <textarea name="bio" id="bio"
                      value={datosUsuario.bio}
                      onChange={manejarDatos}></textarea>
                  </div>

                  <div>
                    <input type="submit" value='Guardar Cambios' className='boton' />
                  </div>
                </div>
              </div>

            </form>
        }

      </div>

      <MiModal mostrar={mostrarModal} setMostrar={setMostrarModal}>
        <div className='d-flex flex-column'>

          <h2 className='oscuro text-center'>Cambiar Foto de Perfil</h2>

          {
            errorImgMessage != '' && <p className='alert alert-danger'>{errorImgMessage}</p>
          }

          <div className='mt-1 mb-3 w-100 d-flex justify-content-center'>
            <label htmlFor='fotoUsuario' className='foto-perfil-usuario'>
              <img src={buscarcarpetaIcon} alt='cambiar foto' className='cambiar-foto-perfil-icon' />
              <img src={imgUsuario.img} alt="foto perfil" className='foto-perfil-img' />
            </label>
            <input ref={imgInput} type="file" id='fotoUsuario' name='fotoUsuario' className='d-none' onChange={manejarCambioFoto} />
          </div>

          {
            cargandoImg
              ? <p className='text-center fs-5 p-0 m-0 mb-1 pb-1'>Subiendo...</p>
              : <div className='d-flex justify-content-center'>
                <button className='boton' onClick={subirNuevaFotoUsuario}>Guardar Cambio</button>
              </div>
          }

        </div>
      </MiModal>

    </section>
  )
}

export default EditarPerfil