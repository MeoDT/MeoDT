// =============== SCRIPT.JS (Frontend Logik) ===============
// Dark/Light Mode Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDark);
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
});

// Theme beim Laden setzen
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-theme');
    document.getElementById('themeToggle').textContent = '☀️';
}

// Tab-Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Alle Seiten ausblenden
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Zielseite anzeigen
        document.getElementById(targetPage).classList.add('active');
    });
});

// Discord Login
document.getElementById('discordLogin').addEventListener('click', () => {
    const CLIENT_ID = '1399843207671713842';
    const REDIRECT_URI = encodeURIComponent('https://dein-worker.adresse.workers.dev/api/callback');
    const SCOPE = encodeURIComponent('identify email');
    
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
});

// Registrierungsformular
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        username: e.target.elements[0].value,
        email: e.target.elements[1].value,
        password: e.target.elements[2].value
    };

    try {
        const response = await fetch('https://dein-worker.adresse.workers.dev/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Registrierung erfolgreich!');
        } else {
            alert(`Fehler: ${result.error}`);
        }
    } catch (error) {
        console.error('Fehler:', error);
        alert('Serverfehler - bitte später erneut versuchen');
    }
});

// Kontaktformular
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    // Implementierung ähnlich wie Registrierung
});
