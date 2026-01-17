# Firman Digital

A modern, responsive digital Bible application built with React, designed to provide an intuitive and accessible way to read, search, and explore the Bible. The app features daily verses, bookmarks, quick search functionality, and a dedicated videos page for spiritual content.

## Features

- **Bible Reading**: Navigate through books, chapters, and verses with an easy-to-use interface.
- **Daily Verse**: Get inspired with a featured daily verse.
- **Quick Search**: Instantly search for specific verses or passages.
- **Bookmarks**: Save and manage your favorite verses for quick access.
- **Responsive Design**: Optimized for desktop and mobile devices with a collapsible sidebar.
- **Videos Page**: Access spiritual videos and content.
- **Modern UI**: Clean, user-friendly interface built with Tailwind CSS.

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Linting**: ESLint

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jodijonatan/firman-digital.git
   cd firman-digital
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

- **Welcome Page**: Start here to get an overview of the app.
- **Bible Page**: Select a book from the sidebar, choose a chapter, and read verses. Use the quick search to find specific content.
- **Videos Page**: Browse and watch spiritual videos.
- **Bookmarks**: Add verses to your bookmarks for easy reference.
- **Daily Verse**: Check the daily featured verse for inspiration.

## Project Structure

```
firman-digital/
├── public/
│   ├── favicon.png
│   └── images/
│       └── hero.jpg
├── src/
│   ├── api/
│   │   └── bibleApi.js
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Bookmarks.jsx
│   │   ├── DailyVerse.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── QuickSearch.jsx
│   │   ├── SidebarNav.jsx
│   │   └── VerseDisplay.jsx
│   ├── context/
│   │   └── BibleContext.jsx
│   ├── pages/
│   │   ├── BiblePage.jsx
│   │   ├── VideosPage.jsx
│   │   └── WelcomePage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint for code linting
- `npm run preview`: Preview the production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
