# language: es

Característica: Gestión de Cotizaciones
  Como usuario del sistema
  Quiero poder crear y consultar cotizaciones
  Para realizar operaciones de cambio de divisas

  Antecedentes:
    Dado que estoy registrado con los siguientes datos:
      | email           | password     |
      | test@test.com  | Password123! |
    Y que estoy autenticado

  Escenario: Crear una nueva cotización
    Cuando intento crear una cotización con los siguientes datos:
      | amount | from | to |currency |
      | 100    | USD  | EUR| USD     |

    Entonces debería recibir una cotización válida

  Escenario: Obtener una cotización existente
    Dado que existe una cotización con id "123" para el usuario actual
    Cuando intento obtener la cotización "123"
    Entonces debería recibir una cotización válida

 