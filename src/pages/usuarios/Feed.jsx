import React, { useState } from 'react'

function Feed() {
  const [resSiguiendo, setResSiguiendo] = useState({
    liRespuestas: [],
    skip: 0
  })
  const [resPopulares, setResPopulares] = useState({
    liRespuestas: [],
    skip: 0
  })

  return (
    <div className='container-fluid py-3'>
      <section id='respuestas-siguiendo' className='row'>
        <h1>Siguiendo</h1>
      </section>

      <section id='respuestas-recientes-populares' className='row'>
        <h1>Populares</h1>
      </section>

      <section id='respuestas-siguiendo'>
        <h1>Otros</h1>
      </section>
    </div>
  )
}

export default Feed