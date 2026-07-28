# 📱 React Phonebook App

A modern, responsive, and secure web application for managing personal contacts with user authentication, persistent Redux state, real-time filtering, and a sleek dark glassmorphism UI.

🔗 **Live Demo**: [https://iberikofer.github.io/react-phonebook/](https://iberikofer.github.io/react-phonebook/)

---

## ✨ Features

- 🔐 **User Authentication**: Sign up, log in, automatic session restore (`refreshUser`), and secure logout using JWT tokens.
- 📖 **Personal Contact Directory**: Add, view, filter, and delete contacts synchronized with the REST API backend.
- ⚡ **Real-Time Substring Search**: Case-insensitive filtering by contact name with instant results.
- 🎨 **Modern Dark Glassmorphic Design**: Built using **Material UI v5** and custom CSS variables, with smooth hover effects and responsive layouts.
- 💾 **State Persistence**: Uses **Redux Toolkit** and **Redux Persist** to save token state across page reloads.
- 🚀 **Error Handling & Feedback**: Auto-clearing authentication alerts, input validation, and informative error messages.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, React Router v6
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), Redux Persist, React-Redux
- **UI Components & Styling**: Material UI (`@mui/material`), MUI Icons (`@mui/icons-material`), Emotion, CSS3 Glassmorphism
- **HTTP Client**: Axios (REST API calls to `https://connections-api.goit.global`)
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iberikofer/react-phonebook.git
   cd react-phonebook
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000/react-phonebook/](http://localhost:3000/react-phonebook/) in your browser.

---

## 📦 Deployment to GitHub Pages

The project is pre-configured for GitHub Pages deployment.

To deploy a new build to GitHub Pages:
```bash
npm run deploy
```
This command automatically builds the optimized production bundle (`npm run build`) and publishes it to the `gh-pages` branch.

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── App.jsx             # Main Application router & MUI ThemeProvider
│   ├── Header/             # Sticky glassmorphism header & navigation bar
│   ├── UserMenu/           # User avatar & logout controls
│   ├── Loader/             # Spinner loader component
│   └── Content/            # Contacts page main container
│       ├── ContactForm/    # Form for adding new contacts
│       ├── Filter/         # Live contact search bar
│       └── ContactList/    # List of contacts with call/delete actions
├── hooks/
│   └── useAuth.js          # Custom hook for Redux auth selectors
├── pages/
│   ├── Home/               # Hero landing page & feature highlights
│   ├── Sign up/            # Registration page
│   ├── Sign in/            # Login page
│   └── Not Found/          # 404 error page with auto-redirect
├── redux/
│   ├── store.js            # Store configuration & persist setup
│   ├── authentication/     # Auth slice, async operations & selectors
│   └── contacts/           # Contacts slice, async operations & filter
└── index.js                # App entry point & BrowserRouter configuration
```

---

## 📝 License

This project is created for learning and demonstration purposes.
