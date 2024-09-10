import "../styles/stylesComponents/boxDescripciones.css"

function BoxDescripciones({
  txtName,
  txtValue,
  txtPlaceholder,
  txtOnChange,
  txtOnSubmit,
  txtRestante,
  textareaStyle,
  btnValue,
  btn100 = false,
  btnCancelar = false,
  txtOnCancelar
}) {
  return (
    <div className="box-descripcion">
      <p className="caracteres-restantes">Caracteres restantes: {txtRestante}</p>
      <textarea
        name={txtName}
        id={txtName}
        value={txtValue}
        onChange={txtOnChange}
        placeholder={txtPlaceholder}
        className={textareaStyle}
        required>
      </textarea>
      <button className={btn100 ? "boton w-100 mb-2" : "boton mb-2"}
        onClick={txtOnSubmit}
      >{btnValue ?? 'Enviar'}</button>
      {
        btnCancelar && <button className="boton-outline ms-2" onClick={txtOnCancelar}>Cancelar</button>
      }
    </div>
  )
}

export default BoxDescripciones