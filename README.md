<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1C273C,100:EA6B40&height=220&section=header&text=🚂%20COMMIT&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Search%20•%20Book%20•%20Track%20•%20Manage&descAlignY=55&descSize=20" alt="header banner"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=EA6B40&center=true&vCenter=true&width=650&lines=Search+trains+in+real-time;Track+your+journey+live;Book%2C+manage%2C+and+check+PNR+status;Built+by+Team+Commit" alt="Typing SVG" />

<br/><br/>

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<br/>

![Made by Team Commit](https://img.shields.io/badge/Made%20by-Team%20Commit-1C273C?style=for-the-badge&logo=github&logoColor=white)
[![Hackathon](https://img.shields.io/badge/Built%20at-Overclock%20Delhi%202026-EA6B40?style=for-the-badge&logo=devpost&logoColor=white)](https://overclockdelhi.com/)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<br/>

<a href="#-features">Features</a> •
<a href="#️-tech-stack">Tech Stack</a> •
<a href="#-getting-started">Getting Started</a> •
<a href="#-team-commit">Team</a>

</div>

<br/>

## 📖 About the Project

**Commit** reimagines the Indian Railways ticketing experience with a fast, modern, and visually stunning interface. Search trains between stations using real-time data, book tickets end-to-end with seat selection and simulated payment, check live PNR status, and follow your train's journey station-by-station — all wrapped in a smooth, GSAP-animated UI with dark mode and Hindi/English support.

> Built by **Team Commit** at *[Overclock Delhi 2026](https://overclockdelhi.com/)*

<br/>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔍 Train Search
Search trains between any two Indian railway stations using real, live schedule data.

### 🎫 Ticket Booking
Full booking flow — passenger details, seat selection, and a simulated payment step with PDF ticket download.

### 📋 PNR Status Check
Instantly check the status of any PNR number with detailed passenger and journey information.

### 📍 Live Train Tracking
Real-time, station-by-station progress as your train moves along its route with delay information and speed stats.

</td>
<td width="50%" valign="top">

### 📂 Booking Management
View, cancel, and manage passenger details on any existing booking from your profile dashboard.

### 🌐 Multi-language
Instantly toggle the entire UI between English and Hindi with a single click.

### 🌙 Dark Mode
A carefully tuned dark theme for late-night booking sessions that's easy on the eyes.

### ✨ Smooth Animations
GSAP-powered transitions, a cinematic train animation on the homepage, page reveals, and micro-interactions throughout.

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---:|
| **Frontend** | Vanilla HTML / CSS / JavaScript + GSAP |
| **Backend** | Node.js + Express |
| **Deployment** | Render (Free Tier) |

</div>

<br/>

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- npm

### Installation
<img src="https://waveify.onrender.com/api/terminal?commands=git+clone+https%3A%2F%2Fgithub.com%2FJustHemang%2FOverclock-Commit.git+%2Ccd+Overclock-Commit%2FIRCTC%2Cnpm+install%2Cnpm+start&theme=modern&speed=50&cursor=true&prompt=%24+&width=800&height=400&fontSize=14&showHeader=true&title=Development+Server&githubMode=false&autoScroll=true&glowEffect=true&scanLines=true" alt="Installation">

```bash
# Clone the repository
git clone https://github.com/JustHemang/Overclock-Commit.git
cd Overclock-Commit/IRCTC

# Install dependencies
npm install

# Start the server
npm start
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

<br/>

<details>
<summary><b>🗂️ Project Structure (click to expand)</b></summary>
<br/>

```
IRCTC/
├── assets/
│   ├── fonts/              # Custom web fonts
│   ├── new_ui.css          # Modernised UI stylesheet
│   ├── train_overlay.png   # Train animation asset
│   └── ...
├── fonts/                  # Font files
├── .gitignore
├── api.js                  # API route handlers
├── Artboard 1.png          # Hero logo
├── bookings.html           # Bookings page
├── common.js               # Shared frontend logic (header, footer, auth, toasts)
├── data.js                 # Static/reference data (stations, train types)
├── db.json                 # Local JSON database
├── favicon.png
├── index.html              # Landing page with train animation
├── login.html              # Login & registration page
├── LICENSE
├── package.json
├── pnr.html                # PNR status page
├── profile.html            # User profile page
├── render.yaml             # Render deployment config
├── schedule.html           # Train tracking & schedule page
├── search.html             # Train search results page
├── server.js               # Express app entry point + all API routes
├── styles.css              # Core global styles
├── trains-data.js          # Local train dataset (fallback)
├── unnamed.png             # Page background texture
└── vercel.json             # Vercel deployment config
```

</details>

<br/>

## 👥 Team Commit

<div align="center">

| Name | Role | GitHub |
|---|---|---|
| Hemang Luthra | Team Lead & Full-Stack Developer | [@justhemang](https://github.com/justhemang) |
| Shaurya Manchanda | UI Designer | [@shyftt](https://github.com/shyftt) |
| Akshaj Dhawan | Backend Programmer | [@Lerbet](https://github.com/Lerbet) |

</div>

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to check the [issues page](../../issues) or open a pull request.

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br/>

<div align="center">
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:EA6B40,100:1C273C&height=120&section=footer"/>

### Made with 🚂 by Team Commit

⭐ Star this repo if you like it! ⭐

</div>