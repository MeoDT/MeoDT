// script.js
// Dark/Light Mode Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDark);
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
});

// Set theme on load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-theme');
    document.getElementById('themeToggle').textContent = '☀️';
}

// Tab Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        document.getElementById(targetPage).classList.add('active');
    });
});

// Discord Login
document.getElementById('discordLogin').addEventListener('click', () => {
    const CLIENT_ID = '1399843207671713842';
    const REDIRECT_URI = encodeURIComponent('https://YOUR_WORKER_URL.workers.dev/api/callback');
    const SCOPE = encodeURIComponent('identify email');
    
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
});

// Registration Form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        username: e.target.elements[0].value,
        email: e.target.elements[1].value,
        password: e.target.elements[2].value
    };

    try {
        const response = await fetch('https://YOUR_WORKER_URL.workers.dev/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error - please try again later');
    }
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.elements[0].value,
        email: e.target.elements[1].value,
        message: e.target.elements[2].value
    };

    try {
        const response = await fetch('https://YOUR_WORKER_URL.workers.dev/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            alert('Error sending message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error - please try again later');
    }
});
