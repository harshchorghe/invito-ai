# 🎉 Invito-AI — Smart Invitation Card Generator

Invito-AI is an AI-powered invitation card generator built with Next.js that allows users to create beautiful, customizable invitations in seconds.
From selecting templates to generating content using AI, Invito-AI simplifies the entire invitation creation process.

---

## 🚀 Live Demo

🌐 **Deployed on Vercel:**
👉 https://your-vercel-url.vercel.app

---

## ✨ Features

* 🎨 **Template-Based Design System**
  Choose from multiple modern, elegant invitation templates

* 🤖 **AI-Powered Content Generation**
  Generate invitation text using AI (Gemini integration)

* 📝 **Dynamic Form System**
  Forms adapt based on event type (wedding, birthday, etc.)

* 🗺️ **Location Integration (Upcoming/Partial)**
  Add venue location and enable navigation support

* 📱 **Responsive Design**
  Works seamlessly across mobile, tablet, and desktop

* 🔐 **Authentication System**
  Secure login/signup using Firebase Authentication

* ⚡ **Fast Performance**
  Built with Next.js App Router + Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS
* **Authentication:** Firebase Auth
* **AI Integration:** Google Gemini API
* **Deployment:** Vercel

---

## 📂 Project Structure (Simplified)

```
app/
components/
templates/
lib/
public/
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/invito-ai.git
cd invito-ai
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the development server

```bash
npm run dev
```

Open 👉 http://localhost:3000

---

## 🔐 Firebase Authentication Setup

This project uses Firebase for authentication.

### Step 1: Create a Firebase Project

* Go to Firebase Console
* Enable **Email/Password Authentication**

### Step 2: Add Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 🤖 AI Integration (Gemini)

To enable AI features:

1. Get your API key from Google AI Studio
2. Add to `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 📦 Available Scripts

```bash
npm run dev      # Run development server
npm run build    # Build for production
npm start        # Start production server
```

---

## 🌍 Deployment

This project is deployed on **Vercel** for fast and scalable hosting.

### Deploy your own:

* Push your code to GitHub
* Import project in Vercel
* Add environment variables
* Click Deploy 🚀

---

## 📸 Future Enhancements

* 🎥 Video/Animated Invitation Export
* 🧠 NLP-based template generation
* 📍 Advanced map & navigation integration
* 🎨 Custom template builder

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Next.js Team
* Firebase
* Google Gemini AI
* Open-source community ❤️

---

## 👨‍💻 Author

**Harsh Chorghe**
📧 Connect with me for collaborations and ideas!

---

⭐ If you like this project, don’t forget to star the repo!
