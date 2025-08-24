# Signa - Gestor de Marcas

Este es el repositorio para Signa, una aplicación web para la gestión de marcas. El proyecto está dividido en un frontend de React (Vite) y un backend de API con FastAPI (Python).

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

*   **Node.js** (v18 o superior)
*   **Python** (v3.10 o superior)
*   **npm** (generalmente se instala con Node.js)

## Configuración Inicial

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd signa
    ```

2.  **Configura el Backend:**
    *   Crea un entorno virtual:
        ```bash
        python3 -m venv server/venv
        ```
    *   Copia el archivo de ejemplo de variables de entorno:
        ```bash
        cp server/env.example server/.env
        ```
    *   Abre `server/.env` y añade tus credenciales de Supabase.

## Modo Desarrollo

Para trabajar en el proyecto, necesitas ejecutar el frontend y el backend por separado en dos terminales.

**Terminal 1: Iniciar el Backend**

1.  Activa el entorno virtual:
    ```bash
    source server/venv/bin/activate
    ```
2.  Instala las dependencias de Python:
    ```bash
    pip install -r server/requirements.txt
    ```
3.  Inicia el servidor de FastAPI con recarga automática:
    ```bash
    uvicorn server.main:app --reload
    ```
    El backend estará corriendo en `http://localhost:8000`.

**Terminal 2: Iniciar el Frontend**

1.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```
    El frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite). Gracias al proxy configurado, se comunicará automáticamente con el backend.

## Modo Producción (Simulación Local)

Este modo compila el frontend y lo sirve directamente desde el backend de FastAPI, tal como funcionaría en un servidor de producción como Render.

**1. Construir el Proyecto**

*   Asegúrate de estar en la raíz del proyecto (`/signa`).
*   Otorga permisos de ejecución al script de build (solo necesitas hacerlo una vez):
    ```bash
    chmod +x build.sh
    ```
*   Ejecuta el script:
    ```bash
    ./build.sh
    ```
    Este comando instalará todas las dependencias (frontend y backend) y creará la carpeta `frontend/dist` con la versión compilada de tu aplicación.

**2. Ejecutar el Servidor Unificado**

*   Asegúrate de estar en la raíz del proyecto (`/signa`).
*   Ejecuta el servidor con el siguiente comando:
    ```bash
    PYTHONPATH=./server uvicorn server.main:app --host 0.0.0.0 --port 8000
    ```
*   Ahora puedes abrir tu navegador en `http://localhost:8000` para ver la aplicación completa funcionando desde un solo servidor.
