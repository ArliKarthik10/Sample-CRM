from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app import crud, schemas
from app.database import SessionLocal

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/",response_model=schemas.CustomerResponse)
def create_customer(
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db)
):
    return crud.create_customer(db, customer)


@router.get("/", response_model=list[schemas.CustomerResponse])
def get_customers(db: Session = Depends(get_db)):
    return crud.get_customers(db)


@router.put("/{customer_id}/status", response_model=schemas.CustomerResponse)
def update_status(
    customer_id: int,
    status_data: schemas.CustomerUpdateStatus,
    db: Session = Depends(get_db)
):
    customer = crud.update_customer_status(
        db, customer_id, status_data.status
    )
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer


@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = crud.delete_customer(db, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}


