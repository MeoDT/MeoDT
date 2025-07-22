// Tab-Funktionalität
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
    
    // KI-Antwort finden
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
            const isPremium = feature.includes('★');
            featuresHTML += `
                <div class="feature">
                    <i class="fas ${isPremium ? 'fa-crown premium-feature' : 'fa-check'}"></i>
                    ${feature}
                </div>
            `;
        });
        
        card.innerHTML = `
            ${software.isFree ? '<div class="free-badge">FREE</div>' : ''}
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

// Funktion zum Rendern der Neuigkeiten
function renderNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    
    newsData.forEach(news => {
        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <div class="news-date">${news.date}</div>
            <div class="news-title">${news.title}</div>
            <p>${news.content}</p>
        `;
        container.appendChild(item);
    });
}

// Simuliere API-Laden
function loadSoftwareGallery() {
    const spinner = document.getElementById('gallery-spinner');
    spinner.style.display = 'block';
    
    // Simuliere API-Anfrageverzögerung
    setTimeout(() => {
        renderSoftwareGallery();
        spinner.style.display = 'none';
    }, 1000);
}

// Seite initialisieren
window.addEventListener('DOMContentLoaded', () => {
    renderSoftwareGallery();
    renderNews();
    
    // Füge Tipp-Nachricht hinzu
    setTimeout(() => {
        addMessage("Tip: You can ask me about our free software, premium features, or downloads!");
    }, 2000);
});
