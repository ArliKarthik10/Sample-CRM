import React, { useState } from "react";
import { api } from "../api/client";
import type { CreateCustomer } from "../types/customer";

export default function CustomerForm() {
  const [formData, setFormData] = useState<CreateCustomer>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/customers", formData);
      alert("Customer created successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      alert("Error creating customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Add Customer</h2>

        <div className="input-group">
          <input
            className="form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label className="input-label">Enter Name</label>
        </div>

        <div className="input-group">
          <input
            className="form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label className="input-label">Enter Email</label>
        </div>

        <div className="input-group">
          <input
            className="form-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label className="input-label">Enter Phone</label>
        </div>

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
