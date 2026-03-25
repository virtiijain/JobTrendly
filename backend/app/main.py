from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine
from app.models import trend
from app.api.trends import router

trend.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TechTrendly API")

# CORS fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def home():
    return {"message": "TechTrendly API running"}
    