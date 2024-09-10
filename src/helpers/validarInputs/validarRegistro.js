import { regexAlfabeticos, regexCaracteresProhibidos, regexEmail, regexS } from "./regexGenerales"

export const validarInputsRegistro = (username, email, uPassword, nombre, apellido) => {
  let respuesta = {
    valido: true,
    mensajeDeError: ''
  }

  if (
    regexCaracteresProhibidos.test(username) ||
    regexCaracteresProhibidos.test(email) ||
    regexCaracteresProhibidos.test(uPassword) ||
    regexCaracteresProhibidos.test(nombre) ||
    regexCaracteresProhibidos.test(apellido)
  ) {
    return {
      valido: false,
      mensajeDeError: 'Ninguno de los campos puede contener los caracteres \n (\' " \\ ; | < > -)'
    }
  }

  if (regexS.test(username)) {
    return {
      valido: false,
      mensajeDeError: 'Nombre de usuario no puede contener espacios en blanco'
    }
  }

  if (username.length < 3 || username.length > 20) {
    return {
      valido: false,
      mensajeDeError: 'Username debe contener entre 3 y 20 caracteres'
    }
  }

  if (regexS.test(uPassword)) {
    return {
      valido: false,
      mensajeDeError: 'Contraseña no puede contener espacios en blanco'
    }
  }

  if (uPassword.length < 6 || uPassword.length > 30) {
    return {
      valido: false,
      mensajeDeError: 'Contraseña debe contener entre 6 y 30 caracteres'
    }
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(uPassword)) {
    return {
      valido: false,
      mensajeDeError: 'Contraseña debe contener al menos una minúscula, mayúscula y un número'
    }
  }

  if (!regexAlfabeticos.test(nombre)) {
    return {
      valido: false,
      mensajeDeError: 'Nombre debería contener solamente caracteres alfabéticos'
    }
  }

  if (nombre.length < 2 || nombre.length > 30) {
    return {
      valido: false,
      mensajeDeError: 'Nombre debe contener entre 2 y 20 caracteres'
    }
  }

  if (!regexAlfabeticos.test(apellido)) {
    return {
      valido: false,
      mensajeDeError: 'Apellido de ser ingresado, debería contener solamente caracteres alfabéticos'
    }
  }

  if (!regexEmail.test(email)) {
    return {
      valido: false,
      mensajeDeError: 'El formato de Email es incorrecto'
    }
  }

  return respuesta
}