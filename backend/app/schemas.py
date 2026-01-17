from pydantic import BaseModel, EmailStr
from typing import Optional

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    phone: str

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdateStatus(BaseModel):
    status: str

class CustomerResponse(CustomerBase):
    id: int
    status: str

    class Config:
        orm_mode = True
