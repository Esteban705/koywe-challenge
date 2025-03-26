# language: es
Característica: Autenticación de usuarios
  Como un usuario de la aplicación
  Quiero poder registrarme e iniciar sesión
  Para acceder a las funcionalidades protegidas

  Escenario: Registro exitoso de usuario
    Dado que no existe un usuario con el correo "test@example.com"
    Cuando intento registrarme con los siguientes datos:
      | email             | password     |
      | test@example.com  | Password123! |
    Entonces debería recibir una respuesta exitosa
    Y la respuesta debería contener un token JWT
    Y la respuesta debería contener los datos del usuario sin la contraseña

  Escenario: Registro fallido - correo duplicado
    Dado que existe un usuario con el correo "existing@example.com"
    Cuando intento registrarme con los siguientes datos:
      | email                | password     |
      | existing@example.com | Password123! |
    Entonces debería recibir un error de conflicto
    Y el mensaje de error debería ser "El email ya está registrado" 