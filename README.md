# Shortly--URL-Shortner
(Scalable Full Stack Production Grade System-MERN Stack)

A fast and lightweight URL Shortener application built using the MERN stack, allowing users to convert long URLs into short, shareable links with click-tracking and link management features.

🚀 Features

🔗 Shorten long URLs into unique short codes

🚦 Redirect short links to original URLs

📊 Track total click counts

🗂 Manage links (view, delete, copy)

🛡 Server-side validations & error handling

📦 MongoDB for storing URLs

🎨 Clean & responsive UI

🛠 Tech Stack

Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Other: Mongoose, Axios, CORS, dotenv

📂 Folder Structure
root/
│── client/        # React frontend
│── server/        # Node/Express backend
│── models/        # MongoDB schema
│── routes/        # API routes
│── controllers/   # Business logic
│── package.json
│── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/kalpana-chavhan/url-shortener.git
cd url-shortener

2️⃣ Backend Setup
cd server
npm install


Create a .env file:

MONGO_URI=your_mongo_url
PORT=5000
BASE_URL=http://localhost:5000


Start backend:

npm start

3️⃣ Frontend Setup
cd client
npm install
npm start

🔗 API Endpoints
POST /shorten

Shorten a URL
Body:

{
  "longUrl": "https://example.com"
}

GET /:shortCode

Redirects to the original URL.

🎬 How It Works

User enters long URL

Backend generates unique short code

URL + code stored in MongoDB

Short link redirects to original URL

Click count increases on each redirect


📜 License

This project is licensed under the MIT License.

