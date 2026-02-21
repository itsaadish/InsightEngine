# Teaching Insights Engine

A data-driven analytics dashboard for school administrators to monitor teacher performance, lesson creation trends, and institutional aggregate activity.

## 🚀 Features

- **Institutional Overview**: Aggregate stats for lessons, quizzes, and assessments across the entire school.
- **Trend Analytics**: Dynamic Area Charts showing activity trends over time (Week, Month, Year).
- **Teacher Directory**: A clean, searchable list of all educators.
- **Performance Profiles**: Deep-dive analytics for individual teachers, including class-wise breakdowns and recent activity logs.
- **URL-Based Routing**: Clean navigation structure with deep-linking support for specific reports.


## 🛠 Technology Stack

### Frontend
- **React (Vite)**: Component-based UI.
- **Recharts**: High-performance interactive data visualizations.
- **Lucide React**: Modern iconography.

### Backend
- **Node.js & Express**: RESTful API architecture.
- **Prisma ORM**: Type-safe database access.
- **PostgreSQL**: Robust relational data storage.
- **Winston**: Advanced logging and error tracking.


## 📦 Project Structure

```text
├── backend/
│   ├── prisma/             # Database schema and migrations
│   ├── scripts/            # Automation scripts (seeding)
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic (DI)
│   │   ├── repositories/   # Data access layer
│   │   └── di/             # Dependency injection container
├── frontend/
│   ├── src/
│   │   ├── components/     # Modular UI elements
│   │   ├── pages/          # Page-level components (Overview, Profile)
│   │   ├── hooks/          # Custom data fetching hooks
│   │   └── context/        # Auth and global state
└── README.md
```

## ⚙️ Setup & Installation

### 1. Prerequisite
- Node.js (v18+)
- PostgreSQL database (Local or Supabase)

### 2. Backend Setup
```bash
cd backend
npm install
# Add your .env file with DATABASE_URL
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3. Database Seeding
To populate the database with initial teacher and activity data:
```bash
cd backend
node scripts/seed_db.js
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🏗 Architecture Decisions

- **Dependency Injection (DI)**: Utilized a DI approach for highly maintainable code and following SOLID principles in the backend to decouple services from repositories, ensuring the system is highly testable and modular.
- **Layered Architecture**: Chosen over traditional MVC to decouple business logic from the transport layer. This ensures that business logic is independent of the framework and can be reused in different contexts.
- **Repository Pattern**: Abstracted data access logic through repositories, allowing for seamless transitions between different database adapters if needed in the future.
- **URL-Driven State Management**: Synchronized navigation and filtering states with the browser URL. This enables deep-linking support, consistent persistence on page refresh, and better browser history interaction.
- **Page vs Component Separation**: Adopted a strict separation where `pages/` handle routing and lifecycle, while `components/` remain pure and logic-agnostic where possible.

## 🚀 Future Scalability
- **Data Caching**: Integrating a caching layer (e.g., Redis) for high-frequency institutional analytics to minimize database hits for static timeframe data.
- **Real-time Updates**: Implementing WebSockets to push real-time updates to the dashboard when new data is ingested. For eg. Let's a teacher added a new lesson the dashboard should update the total lessons count and the trend chart should update accordingly. 
- **Granular Permissions**: Implementing a role-based access control (RBAC) system to allow for more granular permissions for different roles. For eg. A teacher should only be able to see their own data, while a principal should be able to see all data.


## 🔒 Security
- **Protected Routes**: Dashboard and Teacher views are guarded by JWT authentication for secure administrative access.


