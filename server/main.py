from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn
from fastapi.responses import FileResponse
import os

from app.shared.config import settings
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    # No database initialization needed with Supabase
    yield
    # Shutdown
    pass


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set base route on /api/v1
app.include_router(api_router, prefix=settings.API_V1_STR)

# This must come after all other API routes are registered
# Mount the static files (the compiled frontend) if the directory exists
static_files_dir = "frontend/dist"

if os.path.isdir(static_files_dir):
    # Serve static assets
    app.mount("/assets", StaticFiles(directory=os.path.join(static_files_dir, "assets")), name="static-assets")
    
    # Serve other static files like vite.svg or favicon
    app.mount("/static", StaticFiles(directory=static_files_dir), name="static-root")

    # Catch-all route to serve index.html for any other path
    @app.get("/{full_path:path}", response_class=FileResponse)
    async def serve_react_app(full_path: str):
        index_path = os.path.join(static_files_dir, "index.html")
        if not os.path.exists(index_path):
            return {"detail": "Not Found"}, 404
        return index_path


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
