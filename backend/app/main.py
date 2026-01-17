from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.routes.customer import router as customer_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app.include_router(customer_router)

@app.get("/")
def root():
    return {"message": "CRM Backend is running"}
