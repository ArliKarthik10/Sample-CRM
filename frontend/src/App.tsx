import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Simple CRM</h1>
      <CustomerForm />
      <CustomerList />
    </div>
  );
}

export default App;
