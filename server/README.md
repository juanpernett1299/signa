# Signa Backend API

Backend API desarrollado con FastAPI para la aplicación Signa, utilizando Supabase como base de datos.

## Características

- **FastAPI**: Framework moderno y rápido para APIs
- **Supabase**: Base de datos PostgreSQL en la nube con SDK oficial
- **Pydantic**: Validación de datos
- **JWT**: Autenticación con tokens
- **CORS**: Soporte para Cross-Origin Resource Sharing

## Requisitos

- Python 3.8+
- Cuenta de Supabase
- pip

## Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd signa
```

2. **Crear entorno virtual**
```bash
python -m venv venv
source venv/bin/activate  # En Linux/Mac
# o
venv\Scripts\activate  # En Windows
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar Supabase**
- Crear proyecto en [Supabase](https://supabase.com)
- Crear tablas en el dashboard de Supabase
- Copiar URL y API Key del proyecto

5. **Configurar variables de entorno**
```bash
cp env.example .env
# Editar .env con tus credenciales de Supabase
```

## Configuración de Supabase

### 1. Crear Proyecto
- Ve a [supabase.com](https://supabase.com)
- Crea un nuevo proyecto
- Espera a que se complete la configuración

### 2. Crear Tablas
En el SQL Editor de Supabase, ejecuta:

```sql
-- Crear enum para estados de marca
CREATE TYPE estado_marca AS ENUM (
    'solicitud_presentada',
    'examen_formal',
    'examen_fondo',
    'publicacion_gaceta',
    'oposiciones',
    'otorgada',
    'renovacion'
);

-- Tabla de países
CREATE TABLE paises (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL UNIQUE,
    codigo_iso VARCHAR NOT NULL UNIQUE
);

-- Tabla de clases Niza
CREATE TABLE clases_niza (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR NOT NULL UNIQUE,
    descripcion TEXT NOT NULL
);

-- Tabla de marcas
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    titular VARCHAR NOT NULL,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT NOW(),
    logo_url TEXT,
    clase_niza_id INTEGER REFERENCES clases_niza(id),
    pais_id INTEGER REFERENCES paises(id),
    estado estado_marca DEFAULT 'solicitud_presentada'
);

-- Tabla de historial de estados
CREATE TABLE historial_estados (
    id SERIAL PRIMARY KEY,
    marca_id INTEGER REFERENCES marcas(id),
    estado VARCHAR NOT NULL,
    fecha TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_marcas_nombre ON marcas(nombre);
CREATE INDEX idx_marcas_estado ON marcas(estado);
CREATE INDEX idx_marcas_pais ON marcas(pais_id);
```

### 3. Obtener Credenciales
- **Project URL**: En Settings > API. **Usa esta URL para `SUPABASE_URL` en tu `.env`**. Debe tener el formato `https://<tu-proyecto>.supabase.co`.
- **anon/public key**: En Settings > API. **Usa esta clave para `SUPABASE_KEY` en tu `.env`**.
- **service_role key**: En Settings > API (para operaciones admin, si las necesitas).

## Nota Importante sobre la URL de Supabase

El SDK de Supabase para Python (`supabase-py`) utiliza la **URL de la API** de tu proyecto, no la URL de conexión directa a la base de datos PostgreSQL.

-   **✔️ Correcto (API URL):** `SUPABASE_URL="https://xxxxxxxx.supabase.co"`
-   **❌ Incorrecto (Database URL):** `SUPABASE_URL="postgresql://postgres:..."`

Asegúrate de usar la URL correcta en tu archivo `.env`.

## Uso

### Ejecutar en desarrollo
```bash
python main.py
```

### Ejecutar con uvicorn
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Ejecutar en producción
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Endpoints

### Base
- `GET /` - Página de bienvenida
- `GET /health` - Estado de salud de la API

### Marcas
- `GET /api/v1/marcas/` - Listar marcas
- `POST /api/v1/marcas/` - Crear marca
- `GET /api/v1/marcas/{marca_id}` - Obtener marca por ID
- `PUT /api/v1/marcas/{marca_id}` - Actualizar marca
- `DELETE /api/v1/marcas/{marca_id}` - Eliminar marca
- `GET /api/v1/marcas/by-estado/{estado}` - Filtrar marcas por estado
- `GET /api/v1/marcas/by-pais/{pais_id}` - Filtrar marcas por país

## Estados de Marca

Los estados disponibles para una marca son:

- **`solicitud_presentada`** - Solicitud inicial presentada
- **`examen_formal`** - En proceso de examen formal
- **`examen_fondo`** - En proceso de examen de fondo
- **`publicacion_gaceta`** - Publicada en gaceta oficial
- **`oposiciones`** - Período de oposiciones abierto
- **`otorgada`** - Marca otorgada y registrada
- **`renovacion`** - En proceso de renovación

## Documentación de la API

Una vez ejecutando la aplicación, puedes acceder a:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/api/v1/openapi.json`

## Estructura del Proyecto

```
signa/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   └── marcas.py
│   │       └── api.py
│   ├── shared/
│   │   └── config.py
│   ├── db/
│   │   ├── database.py
│   │   └── marca.py
│   └── schemas/
│       └── marca.py
├── main.py
├── requirements.txt
├── env.example
└── README.md
```

## Desarrollo

### Agregar nuevos modelos
1. Crear tabla en Supabase Dashboard
2. Crear esquemas en `app/schemas/`
3. Crear funciones de acceso a datos en `app/db/`
4. Crear endpoints en `app/api/v1/endpoints/`
5. Registrar router en `app/api/v1/api.py`

### Operaciones con Supabase
```python
from app.db import marca as marcaDAO

# Las funciones del DAO ya no necesitan el cliente supabase
# Se obtiene internamente

# Usar funciones CRUD
marcas = marcaDAO.get_multi()
marca = marcaDAO.get(marca_id=1)
```

## Testing

```bash
# Ejecutar tests
pytest

# Con coverage
pytest --cov=app
```

## Producción

- Cambiar `ENVIRONMENT=production` en `.env`
- Cambiar `DEBUG=false` en `.env`
- Usar una clave secreta segura
- Configurar CORS apropiadamente
- Usar HTTPS
- Configurar logging
- Monitoreo y métricas

## Ventajas de Supabase

- **Base de datos PostgreSQL** completamente gestionada
- **SDK oficial** para Python
- **Autenticación integrada** con JWT
- **Row Level Security** (RLS)
- **Real-time subscriptions**
- **Storage** para archivos
- **Edge Functions** para lógica del servidor

## Licencia

[MIT License](LICENSE)
