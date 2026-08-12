<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:F75C7E,100:8B5CF6&height=220&section=header&text=IRCTC&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Search%20•%20Book%20•%20Track%20•%20Manage&descAlignY=55&descSize=20" alt="header banner"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=8B5CF6&center=true&vCenter=true&width=650&lines=Search+trains+in+real-time;Track+your+journey+live;Book%2C+manage%2C+and+check+PNR+status;Built+by+Team+Commit" alt="Typing SVG" />

<br/><br/>

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<br/>

![Made by Team Commit](https://img.shields.io/badge/Made%20by-Team%20Commit-8B5CF6?style=for-the-badge&logo=github&logoColor=white)
[![Hackathon](https://img.shields.io/badge/Built%20at-Overclock%20Delhi%202026-F75C7E?style=for-the-badge&logo=devpost&logoColor=white)](https://overclockdelhi.com/)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

<br/>

<a href="#features">Features</a> •
<a href="#tech-stack">Tech Stack</a> •
<a href="#getting-started">Getting Started</a> •
<a href="#preview">Preview</a> •
<a href="#team-commit">Team</a>

</div>

<br/>

## 📖 About the Project

**IRCTC** reimagines the Indian Railways ticketing experience with a fast, clean interface. Search trains between stations using real schedule data, book tickets end-to-end, check live PNR status, and follow your train's journey station-by-station — all wrapped in a smooth, animated UI with dark mode and Hindi/English support.

> Built by **Team Commit** at *[Overclock Delhi 2026](https://overclockdelhi.com/)*

<br/>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### Train Search
Search trains between any two stations using real, live schedule data.

### Ticket Booking
Full booking flow — passenger details, seat selection, and a simulated payment step.

### PNR Status Check
Instantly check the status of any PNR.

### Live Train Tracking
Real-time, station-by-station progress as your train moves along its route.

</td>
<td width="50%" valign="top">

### Booking Management
View, cancel, and edit passenger details on any existing booking.

### Multi-language
Instantly toggle the entire UI between English and Hindi.

### Dark Mode
A carefully tuned dark theme for late-night booking sessions.

### Smooth Animations
GSAP-powered transitions, page reveals, and micro-interactions throughout.

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

</div>

<br/>

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- npm

### Installation
<img src="https://waveify.onrender.com/api/terminal?commands=git+clone+https%3A%2F%2Fgithub.com%2FJustHemang%2FOverclock-Commit.git+%2Ccd+Overclock-Commit%2Cnpm+install%2Ccp+.env.example+.env%2Cnode+server.js&theme=modern&speed=50&cursor=true&prompt=%24+&width=800&height=400&fontSize=14&showHeader=true&title=Development+Server&githubMode=false&autoScroll=true&glowEffect=true&scanLines=true" alt="Installation">
```bash

# Clone the repository
git clone https://github.com/JustHemang/Overclock-Commit.git
cd Overclock-Commit

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start the server
node server.js
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

<br/>

## 📸 Preview

<div align="center">
<img src="https://user-images.githubusercontent.com/placeholder/demo-preview.gif" alt="App demo" width="85%" />

<sub>*(Replace this with an actual screen recording or GIF of your app)*</sub>
</div>

<br/>

<details>
<summary><b>🗂️ Project Structure (click to expand)</b></summary>
<br/>

```
IRCTC/
├── node_modules/
├── .gitignore
├── api.js               # API route handlers
├── bookings.html        # Bookings page
├── checkout.html        # Checkout / payment page
├── common.js             # Shared frontend logic
├── data.js               # Static/reference data
├── db.json               # Local database
├── favicon.png
├── index.html             # Landing page
├── login.html             # Login page
├── package-lock.json
├── package.json
├── pnr.html               # PNR status page
├── profile.html           # User profile page
├── README.md
├── render.yaml            # Deployment config (Render)
├── schedule.html          # Train schedule page
├── search.html            # Train search page
├── server.js              # App entry point
├── styles.css             # Global styles
├── trains-data.js         # Train dataset
└── vande-bharat.png
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
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:8B5CF6,100:F75C7E&height=120&section=footer"/>

### Made with 🚂 by Team Commit

⭐ Star this repo if you like it! ⭐

</div>