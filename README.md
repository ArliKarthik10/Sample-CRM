# Simple CRM

A full-stack Customer Relationship Management (CRM) application built with FastAPI (backend) and React/TypeScript (frontend). This application allows you to manage customer information, track customer status, and perform CRUD operations efficiently.

## 🚀 Features

- **Customer Management**: Create, read, update, and delete customer records
- **Status Tracking**: Track customer status (Lead, Prospect, Customer, etc.)
- **RESTful API**: FastAPI-powered backend with comprehensive endpoints
- **Modern UI**: React TypeScript frontend with responsive design
- **Email Validation**: Built-in email validation using Pydantic
- **Database**: SQLite database for data persistence
- **CORS Support**: Full cross-origin resource sharing support

## 📋 Tech Stack

### Backend
- **FastAPI** - Modern web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server
- **SQLite** - Lightweight database

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **ESLint** - Code quality tool

## 📁 Project Structure

```
Simple CRM/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # SQLAlchemy ORM models
│   │   ├── schemas.py           # Pydantic validation schemas
│   │   ├── database.py          # Database configuration
│   │   ├── crud.py              # Create, Read, Update, Delete operations
│   │   └── routes/
│   │       └── customer.py      # Customer API endpoints
│   ├── conftest.py              # Pytest configuration
│   └── env/                     # Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main React component
│   │   ├── main.tsx             # Application entry point
│   │   ├── style.css            # Global styles
│   │   ├── api/
│   │   │   └── client.ts        # Axios API client
│   │   ├── components/
│   │   │   ├── CustomerForm.tsx # Form component for adding customers
│   │   │   └── CustomerList.tsx # List component for displaying customers
│   │   └── types/
│   │       └── customer.ts      # TypeScript type definitions
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── eslint.config.js
└── README.md
```

## 🔌 API Endpoints

### Customers
- **POST** `/customers` - Create a new customer
- **GET** `/customers` - Retrieve all customers
- **PUT** `/customers/{customer_id}/status` - Update customer status
- **DELETE** `/customers/{customer_id}` - Delete a customer

## 💾 Data Models

### Customer
```python
{
  "id": int,
  "name": str,
  "email": str,        # Unique, validated email
  "phone": str,
  "status": str        # Default: "Lead"
}
```

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 14+ and npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
python -m venv env
# On Windows:
env\Scripts\activate
# On macOS/Linux:
source env/bin/activate
```

3. Install dependencies:
```bash
pip install fastapi uvicorn sqlalchemy pydantic email-validator pytest pytest-asyncio
```

4. Run the backend server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## 📚 API Documentation

When running the backend locally, visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI) or `http://localhost:8000/redoc` for ReDoc documentation.

## 🔧 Configuration

### Backend Configuration
- **Database**: SQLite stored at `./crm.db`
- **CORS**: All origins allowed (can be restricted in production)
- **Server**: Runs on `http://localhost:8000` by default

### Frontend Configuration
- **API Base URL**: Configure in `src/api/client.ts`
- **Dev Server**: Runs on `http://localhost:5173` by default

## 📝 Development

### Backend Development
- Modify models in `backend/app/models.py`
- Add routes in `backend/app/routes/`
- Update schemas in `backend/app/schemas.py`
- Implement business logic in `backend/app/crud.py`

### Frontend Development
- Create components in `src/components/`
- Define types in `src/types/`
- API calls via `src/api/client.ts`
- Update styles in `src/style.css` or component files

## 🚀 Building for Production

### Backend
```bash
# Ensure all dependencies are installed
pip install -r requirements.txt

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Build optimized production bundle
npm run build

# Preview the production build
npm run preview
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python virtual environment is activated
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is available

### Frontend won't load
- Clear node_modules: `rm -rf node_modules` then `npm install`
- Check if port 5173 is available
- Verify backend is running (API calls require backend)

### Database issues
- Delete `crm.db` to reset the database
- Migrations will run automatically on startup

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests to improve the project.
