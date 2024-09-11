import { useContext, useEffect, useState } from 'react'
import { SesionContext } from '../context/SesionContext'

function ContadorPreguntas() {
  const { nPreguntas } = useContext(SesionContext)
  const [contador, setContador] = useState(null)

  useEffect(() => {
    if (typeof nPreguntas == 'number' && nPreguntas > 0) {
      setContador(nPreguntas)
    }
    else {
      setContador(null)
    }
  }, [nPreguntas])

  return <>
    {
      contador && <div id='n-preguntas'>
        <p id='contador-preguntas'>{nPreguntas}</p>
      </div>
    }
  </>
}

export default ContadorPreguntas