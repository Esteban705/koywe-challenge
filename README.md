# API de Cotización de Divisas (Fiat ⇄ Crypto)

## 📋 Descripción
API desarrollada en NestJS para realizar conversiones entre monedas fiat y criptomonedas, implementando autenticación JWT y siguiendo buenas prácticas de desarrollo.

## 🛠️ Tecnologías Utilizadas
- NestJS
- TypeScript
- MongoDB (con Mongoose) [o PostgreSQL con Prisma, según tu elección]
- JWT para autenticación
- Jest para testing
- Bruno para pruebas de API

## 🤖 Uso de Inteligencia Artificial
Durante el desarrollo de este proyecto, se utilizaron las siguientes herramientas de IA de manera ética y complementaria:

- **Cursor**: Asistencia en el desarrollo y autocompletado de código, implementacion de test, mejorando la productividad en la implementación de patrones y estructuras comunes.
- **ChatGPT**: Utilizado como recurso de consulta para:
  - Investigación sobre el patrón de diseño Facade y sus mejores prácticas de implementación
  - Resolución de dudas técnicas específicas
  - Optimización de estructuras de código


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v21 o superior)
- npm
- MongoDB
- Bruno CLI (para pruebas de API)

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto usando como base el archivo `.env.example`:

```env
# Base de datos
DATABASE_URL=mongodb://localhost:27017/currency-converter

# JWT
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRATION=24h

# API Externa
CRYPTO_API_KEY=tu_api_key
CRYPTO_API_URL=https://api.exchange.cryptomkt.com/api/3
```

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Esteban705/koywe-challenge.git
cd KOYWE-CHALLENGE
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación en modo desarrollo:
```bash
npm run start:dev
```

## 📚 Estructura del Proyecto

src/
├── bll/ # Business Logic Layer
├── dal/ # Data Access Layer
├── facades/ # Facades para servicios externos
├── models/ # Modelos y DTOs
├── modules/ # Módulos de la aplicación
├── providers/ # Providers y servicios
├── app.module.ts # Módulo principal
├── app.controller.ts # Controlador principal
├── app.service.ts # Servicio principal
└── main.ts # Punto de entrada
test/
├── e2e/ # Tests end-to-end
├── jest-e2e.json # Configuración de Jest para e2e
└── app.e2e-spec.ts # Especificaciones e2e
bruno/
├── auth/ # Colección de pruebas de autenticación
├── quotes/ # Colección de pruebas de cotizaciones
├── environments/ # Configuración de entornos
└── bruno.json # Configuración de Bruno


## 🧪 Testing

### Tests Unitarios y E2E
```bash
# Tests E2E
test:e2e:cucumber
```

### Pruebas de API con Bruno
Para ejecutar las colecciones de pruebas de API:
```bash
# Ejecutar todas las colecciones
bru run

# Ejecutar una colección específica
bru run ./bruno/auth
bru run ./bruno/quotes
```

## 🔒 Endpoints API

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión

### Cotizaciones
- `POST /quote` - Crear nueva cotización
- `GET /quote/:id` - Obtener cotización por ID

## 🏗️ Arquitectura
El proyecto sigue una arquitectura en capas:
- **BLL (Business Logic Layer)**: Lógica de negocio
- **DAL (Data Access Layer)**: Acceso a datos
- **Facades**: Interfaces para servicios externos
- **Models**: Definiciones de tipos y DTOs
- **Modules**: Módulos funcionales de la aplicación
- **Providers**: Servicios y providers de la aplicación

## 👥 Autor
Rodriguez Ruben Esteban
