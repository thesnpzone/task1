
## 🚀 **Tech Stack** 🚀

### **Frontend**:
- **React.js**: A powerful JavaScript library for building user interfaces.
- **Vite**: A next-generation, fast build tool for React.
- **Material-UI (MUI)**: A sleek design system and component library for building beautiful UIs.
- **React Router**: For routing and navigation across the app.
- **Axios**: For making HTTP requests from React to the backend.
- **React Toastify**: For notifications.
- **Framer Motion**: For smooth animations.


### **Backend**:
- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework to manage routing and middleware.
- **MongoDB (Mongoose)**: NoSQL database to store user and student data.
- **JWT (JSON Web Token)**: For secure authentication.
- **Bcrypt.js**: For password encryption and hashing.
- **Nodemailer**: For sending email notifications like OTP.
- **dotenv**: To manage environment variables securely.
- **Cors**: Middleware to enable cross-origin requests.

### **Utilities**:
- **Slugify**: Converts strings into URL-friendly slugs.
- **Validator**: For email and password validation.
- **Email-existence**: To check whether an email exists or not.
- **Body-parser**: For handling incoming HTTP request bodies.
- **Cookie-parser**: To parse cookies in HTTP requests.

 ✨ Key Features
Student Registration:

OTP-based email verification.

Smart input validation (e.g., DNS, disposable email check).

Profile details include Full Name, Email, Mobile, DOB, Gender, City, and Skills.

Stepper UI for smooth form filling.

Student Dashboard:

Personalized dashboard showing profile information like Name, Email, Mobile, and more.

Real-time update handling and data validation checks.

Modern UI/UX:

Fully responsive UI built with Material UI.

Animated transitions using Framer Motion.

Real-time feedback using React Toastify for success or error notifications.

Security:

Secure JWT-based authentication with encrypted passwords using bcrypt.

Profile completion checks before accessing the dashboard.

---

## 📦 **Project Structure**


cluematrix/
├── client/                   # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── .env
│   └── package.json
