from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")


app = FastAPI()


app.mount("/css", StaticFiles(directory=os.path.join(FRONTEND_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")

app.mount("/components", StaticFiles(directory=os.path.join(FRONTEND_DIR, "components")), name="components")
app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")

@app.get("/")
def serve_home():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

@app.get("/{path:path}")
def spa_fallback(path: str):
    full_path = os.path.join(FRONTEND_DIR, path)
    if os.path.isfile(full_path):
        return FileResponse(full_path)
    
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))

