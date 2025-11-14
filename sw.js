<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kid IP TV - Safe Videos for Kids</title>
    
    <meta name="description" content="A safe and fun collection of cartoons, songs, and shows for kids.">
    <meta name="theme-color" content="#020617">
    
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="icons/icon-192.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --accent-color: #1e67ff;
            --text-primary: #f0f0f0;
            --text-secondary: #a0a0a0;
            --bg-card: rgba(30, 103, 255, 0.08);
            --border-card: rgba(30, 103, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.3);
            --bg-gradient: linear-gradient(145deg, #0b1b3b, #020617);
            --border-radius: 12px;
        }

        body[data-theme="dark"] {
            --bg-gradient: linear-gradient(145deg, #111, #000);
            --bg-card: rgba(255, 255, 255, 0.05);
            --border-card: rgba(255, 255, 255, 0.1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Poppins', sans-serif;
            color: var(--text-primary);
            background: var(--bg-gradient);
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding-bottom: 70px; /* Space for bottom nav */
        }
        main { flex-grow: 1; }
        header {
            display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 5%;
            background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: sticky; top: 0; z-index: 100;
        }
        .logo { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); text-decoration: none; text-shadow: 0 0 5px var(--accent-color); }
        #theme-toggle { background: transparent; border: 1px solid var(--accent-color); color: var(--accent-color); font-size: 1.2rem; padding: 0.4rem 0.6rem; border-radius: 8px; cursor: pointer; transition: background-color 0.3s, color 0.3s; }
        #theme-toggle:hover { background-color: var(--accent-color); color: #fff; }
        
        .page-title {
            font-size: 2rem;
            text-align: center;
            padding: 2rem 1rem;
            color: var(--text-primary);
        }

        .video-gallery { padding: 0 5% 4rem; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .video-card {
            position: relative; background: var(--bg-card); border: 1px solid var(--border-card);
            border-radius: var(--border-radius); overflow: hidden; box-shadow: 0 8px 32px 0 var(--shadow-color);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .video-card:hover { transform: translateY(-8px); box-shadow: 0 12px 40px 0 var(--shadow-color), 0 0 15px var(--accent-color); }
        .video-card iframe { width: 100%; aspect-ratio: 16 / 9; border: none; display: block; }
        .video-title { padding: 1rem; font-weight: 600; font-size: 1rem; background: rgba(0, 0, 0, 0.2); text-align: center; }
        .playlist-badge { position: absolute; top: 12px; right: 12px; background-color: var(--accent-color); color: white; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; z-index: 10; pointer-events: none; }
        footer { text-align: center; padding: 2rem 1rem; margin-top: auto; color: var(--text-secondary); font-size: 0.9rem; display: none; }
        
        /* --- Bottom Navigation Bar --- */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 65px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 1000;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--text-secondary);
            text-decoration: none;
            padding: 5px;
            transition: color 0.3s;
        }
        .nav-item.active { color: var(--accent-color); }
        .nav-item:hover { color: var(--text-primary); }
        .nav-icon { font-size: 1.5rem; }
        .nav-text { font-size: 0.7rem; margin-top: 2px; }

        @media (max-width: 768px) {
            .page-title { font-size: 1.8rem; padding: 1.5rem 1rem; }
            .video-grid { grid-template-columns: 1fr; gap: 1.5rem; }
            header, .video-gallery { padding-left: 4%; padding-right: 4%; }
        }
    </style>
</head>
<body>

    <header>
        <a href="/" class="logo">Kid IP TV</a>
        <nav>
            <button id="theme-toggle" title="Toggle Theme">🌓</button>
        </nav>
    </header>

    <main>
        <h2 id="page-title" class="page-title">Home</h2>
        <section class="video-gallery">
            <div id="video-grid" class="video-grid"></div>
        </section>
    </main>

    <nav class="bottom-nav">
        <a href="#home" class="nav-item active" data-page="home">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
        </a>
        <a href="#videos" class="nav-item" data-page="videos">
            <span class="nav-icon">📺</span>
            <span class="nav-text">Videos</span>
        </a>
        <a href="#playlists" class="nav-item" data-page="playlists">
            <span class="nav-icon">🎶</span>
            <span class="nav-text">Playlists</span>
        </a>
    </nav>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const videoGrid = document.getElementById('video-grid');
            const themeToggleButton = document.getElementById('theme-toggle');
            const pageTitle = document.getElementById('page-title');
            const navItems = document.querySelectorAll('.nav-item');

            let allMediaItems = []; // Store all data here

            // Fetch media data from the JSON file
            async function fetchMediaData() {
                try {
                    const response = await fetch('data.json');
                    if (!response.ok) throw new Error('Network response was not ok');
                    allMediaItems = await response.json();
                    router(); // Initial page render after data is loaded
                } catch (error) {
                    console.error('Failed to fetch media data:', error);
                    videoGrid.innerHTML = `<p style="text-align:center; color: #ff5555;">Failed to load videos. Please try again later.</p>`;
                }
            }

            function renderMedia(filter = 'home') {
                if (!videoGrid) return;
                videoGrid.innerHTML = '';

                const filteredItems = allMediaItems.filter(item => {
                    if (filter === 'home') return true;
                    return item.type === filter;
                });

                if (filteredItems.length === 0) {
                    videoGrid.innerHTML = `<p style="text-align:center;">No items to show.</p>`;
                    return;
                }

                filteredItems.forEach(item => {
                    let embedUrl = (item.type === 'playlist')
                        ? `https://www.youtube.com/embed/videoseries?list=${item.id}`
                        : `https://www.youtube.com/embed/${item.id}?rel=0&showinfo=0&modestbranding=1`;
                    
                    let badgeHtml = (item.type === 'playlist') ? '<div class="playlist-badge">Playlist</div>' : '';

                    const mediaCard = `
                        <div class="video-card">
                            ${badgeHtml}
                            <iframe src="${embedUrl}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                            <div class="video-title">${item.title}</div>
                        </div>`;
                    videoGrid.insertAdjacentHTML('beforeend', mediaCard);
                });
            }

            function updateActiveNav(page) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.page === page);
                });
                // Update page title
                pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            }

            function router() {
                const hash = window.location.hash.substring(1) || 'home';
                const validPages = ['home', 'videos', 'playlists'];
                const page = validPages.includes(hash) ? hash : 'home';
                
                renderMedia(page === 'videos' ? 'video' : (page === 'playlists' ? 'playlist' : 'home'));
                updateActiveNav(page);
            }

            // Event Listeners
            window.addEventListener('hashchange', router);
            themeToggleButton.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'blue' : 'dark';
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });

            // Initial Load
            const savedTheme = localStorage.getItem('theme') || 'blue';
            document.body.setAttribute('data-theme', savedTheme);
            fetchMediaData();

            // PWA Service Worker
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
            }
        });
    </script>
</body>
</html>