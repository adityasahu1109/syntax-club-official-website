# SyntaX Club Official Website

Welcome to the official website repository for **SyntaX**, our college's premier software engineering and coding club! This website serves as the central hub for our community, showcasing our team, upcoming events, open-source projects, and milestones.

---

## 🚀 Tech Stack

This project is built with modern web development technologies for optimal performance and developer experience:

- **React (v19)** - Core UI framework
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI styling
- **React Router DOM** - Client-side routing for seamless page navigation
- **Three.js** - 3D library used for our interactive GLSL animated backgrounds
- **Lucide React & Material Symbols** - High-quality iconography

---

## 📂 Project Structure

```text
syntaxclub/
├── public/                 # Static assets (favicons, Vite svg, etc.)
├── scripts/                # Utility scripts (e.g., Python scripts for data management)
├── src/
│   ├── assets/             # Images, logos, and local binary files
│   ├── components/         # Reusable React components (Navbar, Footer, UI elements)
│   ├── data/               # JSON files containing the website's dynamic content
│   ├── hooks/              # Custom React hooks (e.g., useCountUp)
│   ├── pages/              # Individual page components (Home, Events, Team, etc.)
│   ├── App.jsx             # Main application component & routing layout
│   ├── index.css           # Global stylesheet & Tailwind directives
│   └── main.jsx            # Application entry point
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel routing configuration for SPA deployment
└── vite.config.js          # Vite configuration
```

---

## 🛠️ How to Run Locally

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityasahu1109/syntax-club-official-website.git
   cd syntaxclub
   ```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the website:**
   Open your browser and navigate to the local URL provided in your terminal (typically `http://localhost:5173`).

---

## 📝 How to Maintain and Update Content

This website is designed to be easily maintainable! You **do not** need to edit any React code to update the information on the website. 

All of the website's dynamic content is stored in simple JSON files located in the `src/data/` directory. When you modify these files, the website updates automatically.

### Updating Data Files

Navigate to the `src/data/` folder. Here you will find files corresponding to different sections of the website:

- `events.json` - Add or remove upcoming/past workshops and hackathons.
- `team.json` - Update the current core team members and their roles.
- `alumni.json` - Add graduated members to the alumni directory.
- `projects.json` - Showcase new open-source projects built by the community.
- `milestones.json` - Log new achievements and club milestones.
- `blogs.json` - Link to new articles and tutorials written by members.

**Example: Adding a new Event**
To add a new event, simply open `src/data/events.json` and append a new object to the array following the existing format:

```json
{
  "id": "event-10",
  "name": "Intro to Web Dev",
  "date": "2026-04-10",
  "location": "Main Auditorium",
  "description": "Learn the basics of HTML, CSS, and JS.",
  "image": "/path/to/image.jpg",
  "link": "https://register.com"
}
```

Once you save the file and push the changes to your main branch, Vercel will automatically redeploy the website with the updated content!

---

## ☁️ Deployment

This website is configured to be deployed seamlessly on **Vercel**. The repository includes a `vercel.json` file which automatically handles client-side routing rewrites ensuring that all paths load correctly without 404 errors. Push any changes to your production branch, and Vercel will handle the rest.

---

## 👨‍💻 Creator

This website was proudly created and developed by [Aditya Sahu](https://github.com/adityasahu1109) as the official dark-mode, animated digital platform for the **SyntaX Club** at VNIT. 

Date created : 19 March 2026

---

## 🤝 How to Contribute

We welcome contributions from the community! Whether you want to fix a bug, improve performance, or add an entirely new page to the website, your help is appreciated. 

To contribute to the codebase:
1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/syntax-club-official-website.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and test them locally running `npm run dev`.
5. **Commit your changes** with descriptive commit messages:
   ```bash
   git commit -m "Add cool new animation to the homepage"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** against the `main` branch of this repository. Provide a brief description of what you changed!
