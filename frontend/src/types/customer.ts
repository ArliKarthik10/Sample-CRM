export type CustomerStatus = "Lead" | "Active" | "Inactive";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
}

export interface CreateCustomer {
  name: string;
  email: string;
  phone: string;
}
