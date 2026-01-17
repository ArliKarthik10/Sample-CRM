import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Customer, CustomerStatus } from "../types/customer";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<CustomerStatus | "All">("All");
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCustomers = async () => {
    const response = await api.get<Customer[]>("/customers");
    setCustomers(response.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ STATUS UPDATE WITH CONFIRMATION (SAME AS DELETE STYLE)
  const handleStatusChange = async (
    id: number,
    newStatus: CustomerStatus,
    oldStatus: CustomerStatus
  ) => {
    if (newStatus === oldStatus) return;

    const confirmed = window.confirm(
      `Are you sure you want to update status from ${oldStatus} to ${newStatus}?`
    );

    if (!confirmed) return;

    await api.put(`/customers/${id}/status`, { status: newStatus });
    fetchCustomers();
  };

  // ✅ DELETE WITH CONFIRMATION
  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    await api.delete(`/customers/${id}`);
    fetchCustomers();
  };

  // Filter
  const filteredCustomers =
    filter === "All" ? customers : customers.filter((c) => c.status === filter);

  // Search
  const searchedCustomers = filteredCustomers.filter((c) => {
    const value = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(value) ||
      c.email.toLowerCase().includes(value)
    );
  });

  // Pagination logic
  const totalItems = searchedCustomers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = searchedCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <h2>Customer List</h2>

      <div className="filter-search">
        <label className="filter-label">Filter by Status:</label>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value as any);
            setCurrentPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          className="search-input"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedCustomers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) =>
                    handleStatusChange(
                      c.id,
                      e.target.value as CustomerStatus,
                      c.status
                    )
                  }
                >
                  <option value="Lead">Lead</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(c.id, c.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons only if needed */}
      {totalItems > itemsPerPage && (
        <div style={{ marginTop: "15px" }}>
          <button
            className="form-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="form-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
