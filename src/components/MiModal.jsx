import '../styles/stylesComponents/miModal.css'

function MiModal({ children, mostrar, setMostrar }) {
  return (
    <div className={mostrar == true ? 'd-block' : 'd-none'}>
      <div className='mimodal-fondo' onClick={(e) => {
        e.stopPropagation()
        if (setMostrar) {
          setMostrar(false)
        }
      }}>
        <div className='mimodal-container shadow-lg' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MiModal