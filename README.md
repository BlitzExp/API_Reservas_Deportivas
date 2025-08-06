# API_Reservas_Deportivas
El objetivo de esta API RESTFUL es gestionar un sistema de usuarios, canchas y reservas

## ❓ ¿Cómo utilizar la API?

### 🚀 Levantar el proyecto con Docker
* Nota: Debes tener instalado Docker en tu dispositivo.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/BlitzExp/API_Reservas_Deportivas.git
   ```

2. Accede al directorio del repositorio desde terminal.
    ```bash
    cd API_Reservas_Deportivas
    ```
3. Crea el archivo `.env` con base al archivo `.env.example`.
   - Copia el archivo `.env.example`.
   - Renómbralo a `.env`.
4. Crea el archivo `.env` con base al archivo `.env.example`.
   - Copia el archivo `.env.example`.
   - Renómbralo a `.env`.
   - Llena los valores requeridos según tu entorno.
     - El apartado de **`DB_HOST`** debe ser `db`.
     - Asegúrate de no dejar campos vacíos.
5. Corre el contenedor de Docker:
    ```bash
    docker-compose up
    ```
Con esto la API estará corriendo desde tu localhost en el puerto de tu preferencia.

## 📄 Acceder a la documentación de los endpoints

ℹ️ Para leer la documentación de los endpoints es necesario correr la API.

Para acceder a esta documentación se debe acceder al siguiente link:

* http://localhost:`PORT`/api-docs/#/
   - `PORT` es igual al puerto donde esta corriendo actualmente la API.

## 🧪 Pruebas de funcionamiento

Existe 1 prueba de funcionamiento que verifica los siguientes casos:

- Existencia de traslape en dos reservas
- No existencia de traslape en dos reservas
- Existencia de traslape en dos reservas en fechas pero diferentes canchas.

### 🧰 Correr la prueba
**Se debe instalar NodeJS en el dispositivo**

1. Navegar hasta el directorio del repositorio en tu dispositivo:
    ```bash
    cd API_Reservas_Deportivas
    ```
2. Correr el siguiente comando: 
    ```bash
    npm test
    ```
