from sqlalchemy.orm import Session
from app import models, schemas

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )
    db.add(db_customer)  #insert row
    db.commit()      #save changes
    db.refresh(db_customer)  #get updated data
    return db_customer


def get_customers(db: Session):
    return db.query(models.Customer).all()


def update_customer_status(
    db: Session, customer_id: int, status: str
):
    customer = db.query(models.Customer).filter(
        models.Customer.id == customer_id
    ).first()

    if not customer:
        return None

    customer.status = status
    db.commit()
    db.refresh(customer)
    return customer


def delete_customer(db: Session, customer_id: int):
    customer = db.query(models.Customer).filter(
        models.Customer.id == customer_id
    ).first()

    if not customer:
        return None

    db.delete(customer)
    db.commit()
    return customer
