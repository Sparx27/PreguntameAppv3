import Spinner from "./Spinner"

function Form({ onSubmit, inputs, titulo, txtSubmit, txtError, cargando, imgForm }) {

  return (
    <div className="container-fluid">
      <div className="row align-items-stretch">

        <div
          className="col-12 col-md-10 offset-md-1 shadow-lg overflow-hidden"
          style={{ borderRadius: '8px' }}
        >
          <div className="row">

            <div className="col-12 col-lg-6 px-0 bg-blanco d-flex">
              <div className="flex-grow-1 d-flex align-items-center">
                <form onSubmit={(e) => {

                  onSubmit(e)
                }} className="formulario flex-grow-1 p-4">
                  {
                    titulo && <h1 className="text-center oscuro">{titulo}</h1>
                  }
                  {
                    txtError && <p className="alert alert-danger text-center mb-2 mt-3 py-2">{txtError}</p>
                  }
                  {
                    <>
                      {
                        cargando
                          ? <Spinner />
                          : <>
                            {
                              inputs?.map((i, indx) =>
                                <input
                                  key={indx + 1150}
                                  type={i.type}
                                  id={i.name}
                                  name={i.name}
                                  placeholder={i.placeholder}
                                  value={i.value}
                                  onChange={i.onChange}
                                  required={i.required || false}
                                />)
                            }
                            <input type="submit" value={txtSubmit} className="w-100" />
                          </>
                      }
                    </>
                  }
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-6 px-0 d-none d-lg-flex form-img-container">
              <img src={imgForm} alt="imagen form" className="align-self-end" />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Form