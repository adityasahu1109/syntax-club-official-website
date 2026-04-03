# 📝 Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2026-04-03
**The Knowledge Platform Update**
We have deeply integrated a massive dynamic Markdown engine directly into the application, transforming SyntaX into a fully-fledged authoring platform!

### Added
- **Native Markdown Authoring (`react-markdown` & `remark-gfm`)**: Directly paste or construct GitHub-styled markdown blocks across the site.
- **Admin Document Uploads**: The `/admin` panel now features a dedicated drag-and-drop / `.md` file uploader to inject articles smoothly without touching a single line of web-code.
- **Syntax Highlighting**: Code blocks written inside your blogs or project logs are now fully tokenized and styled automatically utilizing `react-syntax-highlighter` using a sleek VSC dark theme.
- **Project Journals (`/projects/:slug`)**: Open Source Projects can now house deeply informative, rich-text markdown files so the community can log their challenges and methodologies.
- **Dynamic Routing Slugs**: The database now automatically strips special characters and constructs SEO-friendly, unique URLs like `/my-awesome-post-17142438` for blogs and projects!

### Changed
- Expanded the width of `BlogArticle` pages to effortlessly scale across entire laptop and wide-monitor screens.
- Completely re-engineered the `Projects` showcase cards for a better UX experience where the entire physical card bounds act as an implicit Link (except when hovering the absolute repo/live buttons).

### Removed
- Retired the legacy `blogUrl` external router from projects, replacing it with the integrated Markdown CMS.

---

## [1.2.0] - 2026-04-02
**The Database & Admin Update**
Our biggest update yet! We've transitioned from static data files to a fully scalable backend so the SyntaX team can manage website content live without touching code.

### Added
- **Supabase Integration**: Completely overhauled the data architecture, migrating all content from static JSON to a live PostgreSQL database.
- **Admin Dashboard UI (`/admin`)**: A fully secured, dynamic web dashboard for club executives to directly add or modify projects, events, members, and blogs.
- **Admin Authentication**: Added a secure Email & Password login gateway before accessing the dashboard.

### Changed
- Refactored all major website components (Team, Events, Projects, Milestones, Alumni, Blogs) to fetch live data asynchronously.
- Updated `package.json` version to v1.2.0.

### Removed
- Removed legacy and static JSON database files.
- Purged outdated and temporary migration scripts to clean up the workspace.

---

## [1.1.0] - 2026-03-14
**The Metrics & Clean Up Update**

### Added
- Introduced animated "count up" counters for all numerical metrics across the site, making the UI feel more alive.

### Removed
- Cleaned up the codebase by removing unused files and optimizing imports.

---

## [1.0.1] - 2026-03-10
**The Animation Polish Update**

### Added
- Added smooth fade-in and scroll animations to various components.
- Introduced a brand new animated Hero Section for an improved first impression.
- Major UI scaling fixes to ensure the app looks stunning on mobile phones.

### Changed
- Fixed various visual clipping issues on the sub-pages.

---

## [1.0.0] - 2026-03-09
**Initial Release**

### Added
- First official draft of the SyntaX club react website!
- Established the foundational UI views: Homepage, Events, Team, Projects, Milestones, and Alumni Hubs.
- Implemented the foundational TailwindCSS styling system and glass-morphism components.
