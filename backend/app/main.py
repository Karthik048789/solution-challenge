from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.explain import router as explain_router
from app.routes.report import router as report_router
from app.routes.scan import router as scan_router

from app.routes.upload import router as upload_router
from app.routes.analyze import router as analyze_router

app = FastAPI(title="BiasX-Ray API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app.include_router(upload_router, prefix="/api")
app.include_router(scan_router, prefix="/api")

app.include_router(explain_router, prefix="/api")
app.include_router(report_router, prefix="/api")
app.include_router(analyze_router, prefix="/api")

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "BiasX-Ray"}

# Mount the Next.js static export
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "out")
if os.path.exists(frontend_dist):
    app.mount("/_next", StaticFiles(directory=os.path.join(frontend_dist, "_next")), name="next-static")
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="next-assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Serve exact file if it exists (e.g. favicon.ico, images)
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Next.js static export creates .html files for routes (e.g. /dashboard -> /dashboard.html)
        html_path = os.path.join(frontend_dist, f"{full_path}.html")
        if os.path.isfile(html_path):
            return FileResponse(html_path)
            
        # Fallback to index.html
        return FileResponse(os.path.join(frontend_dist, "index.html"))