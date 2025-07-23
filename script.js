
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});


const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processUserInput() {
    const text = userInput.value.trim().toLowerCase();
    if (!text) return;
    
    addMessage(text, true);
    userInput.value = '';
    

    let response = aiResponses.default;
    for (const [keyword, answer] of Object.entries(aiResponses)) {
        if (text.includes(keyword)) {
            response = answer;
            break;
        }
    }

    setTimeout(() => {
        addMessage(response);
    }, 500);
}

sendBtn.addEventListener('click', processUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserInput();
});


function renderSoftwareGallery() {
    const gallery = document.getElementById('software-gallery');
    gallery.innerHTML = '';
    
    softwareData.forEach(software => {
        const card = document.createElement('div');
        card.className = 'software-card';
        
        let featuresHTML = '';
        software.features.forEach(feature => {
            featuresHTML += `
                <div class="feature">
                    <i class="fas fa-check"></i>
                    ${feature}
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="free-badge">FREE</div>
            <div class="software-img">
                <i class="${software.icon}"></i>
            </div>
            <div class="software-content">
                <h3>${software.name}</h3>
                <p>${software.description}</p>
                <div class="features">
                    ${featuresHTML}
                </div>
                <a href="#" class="btn" style="width: 100%; text-align: center; margin-top: 15px;">
                    <i class="fas fa-download"></i> Download
                </a>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}


function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    
    newsData.forEach(news => {
        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <div class="news-date">${news.date}</div>
            <div class="news-title">${news.title}</div>
            <p class="news-content">${news.content}</p>
        `;
        container.appendChild(item);
    });
}


const themeToggle = document.getElementById('theme-toggle');
const body = document.body;


const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);


function updateThemeIcon() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}


function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}


themeToggle.addEventListener('click', toggleTheme);

window.addEventListener('DOMContentLoaded', () => {
    renderSoftwareGallery();
    renderNews();
    updateThemeIcon();
    
 
    setTimeout(() => {
        addMessage("Tip: You can ask me about our free software or how to support us!");
    }, 2000);
    
    
    const spinner = document.getElementById('gallery-spinner');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
    }, 1000);
});
