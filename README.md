
# MERN Dashboard

A dynamic and interactive dashboard web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with a **Flask backend** for data processing and API integration. The dashboard visualizes insights using **Chart.js** and offers a user-friendly interface to explore data through multiple filters.

Features

**Filtering**: 
  - End Year
  - Topics
  - Sector
  - Region
  - PEST Analysis (Political, Economic, Social, Technological)
  - Source
  - SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)
  - Country
  - City

 **Data Visualizations**:
  - Bar Chart showing occurrences by country
  - Pie Chart showing distribution across countries
  - Additional charts for Likelihood, Relevance, Year, Region, etc.

 **Backend API**:
  - Built with Flask
  - Connects to MongoDB for dynamic data retrieval
  - Supports filtering via query parameters

 Tech Stack
Frontend: React
Backend: Flask
Database: MongoDB
Charts: Chart.js


Project Structure

```
/mern_dashboard
│
├── client/                # React frontend
│   ├── components/
│   └── App.js
│
├── server/                # Flask backend
│   ├── app.py
│   └── api/
│       └── routes.py
│
├── data/                  # Sample JSON dataset
└── README.md
```
Getting Started

Backend (Flask)

```bash
cd server
pip install -r requirements.txt
python app.py
```

Frontend (React)

```bash
cd client
npm install
npm start
```

API Endpoint

- `GET /data` – fetches dashboard data with optional query parameters for filtering (e.g., `?year=2020&country=India`)

Screenshots

![image](https://github.com/user-attachments/assets/f8efcb68-a02f-42b2-8feb-5b98af1e04f9)
![image](https://github.com/user-attachments/assets/591c6a07-0c74-4a80-a4ab-645dd91d196d)
![image](https://github.com/user-attachments/assets/e44a6aa5-89fc-44fd-a1c6-0915e3e8f96c)
![image](https://github.com/user-attachments/assets/56e0afc8-3fb3-42f6-b43e-94a9b0673cf6)





 Repository

[GitHub Repo](https://github.com/sid2626/Mern_Dashboard)


