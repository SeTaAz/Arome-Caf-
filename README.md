# Aroma Café

## Descripción del proyecto
Aroma Café es una tienda online desarrollada con React, Vite, Node.js, Express y MongoDB. La aplicación simula una tienda de café con una interfaz moderna, donde los usuarios pueden registrarse, iniciar sesión, explorar productos, agregar artículos al carrito, realizar pedidos y consultar su historial. Además, incluye un panel de administración para gestionar productos, usuarios y el estado de los pedidos.

## Funcionalidades principales
- Registro e inicio de sesión de usuarios
- Catálogo de productos
- Carrito de compras
- Proceso de pedido
- Historial de pedidos
- Panel de administración
- Autenticación con token JWT
- Rutas protegidas según rol de usuario

## Tecnologías utilizadas
- React
- Vite
- Tailwind CSS
- React Router DOM
- Context API
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Fetch API (consumo de datos desde frontend)

## Configuración del Entorno (`.env`)
Antes de iniciar, asegúrate de crear un archivo `.env` en la raíz de tu servidor (backend) con las siguientes variables:
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/tienda_db
JWT_SECRET=tu_clave_secreta_para_tokens
```

## Instrucciones de instalación y ejecución

### Requisitos
- Node.js
- pnpm
- MongoDB en ejecución localmente

### Pasos
1. Clona este repositorio.
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Asegúrate de que MongoDB esté funcionando en:
   ```bash
   mongodb://127.0.0.1:27017/tienda_db
   ```
4. Inicia el backend y el frontend:
   ```bash
   pnpm dev
   ```
5. Abre la aplicación en:
   ```bash
   http://localhost:5173
   ```

## Credenciales de prueba

### Cliente
- Puedes registrar un nuevo usuario desde la página de registro.

### Administrador
- Correo: admin@tienda.com
- Contraseña: admin12345

## API local
La API utilizada está desarrollada localmente con Express y MongoDB en:
```bash
http://localhost:3000
```

## Endpoints principales

### Autenticación
- POST /api/auth/register — registrar un nuevo usuario
- POST /api/auth/login — iniciar sesión
- POST /api/auth/create-admin — crear un administrador (requiere token)
- GET /api/auth/perfil — obtener el perfil del usuario autenticado

### Usuarios
- GET /api/users — listar usuarios (solo admin)

### Productos
- GET /api/products — listar productos
- POST /api/products — crear producto (solo admin)
- DELETE /api/products/:id — eliminar producto (solo admin)

### Pedidos
- POST /api/orders — crear un pedido
- GET /api/orders/user — listar pedidos del usuario autenticado
- GET /api/orders — listar todos los pedidos (solo admin)
- PUT /api/orders/:id/status — actualizar estado del pedido (solo admin)
