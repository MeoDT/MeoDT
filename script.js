// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Initialize theme from localStorage or default to dark
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

// Tab Functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// AI Request Logger
class RequestLogger {
    constructor() {
        this.requests = {};
        this.logFile = 'airequests.txt';
        this.loadExistingRequests();
    }

    async loadExistingRequests() {
        try {
            const response = await fetch(this.logFile);
            if (response.ok) {
                const text = await response.text();
                text.split('\n').forEach(line => {
                    if (line.includes(' X')) {
                        const [keyword, count] = line.split(' X');
                        this.requests[keyword] = parseInt(count);
                    } else if (line.trim()) {
                        this.requests[line.trim()] = 1;
                    }
                });
            }
        } catch (e) {
            console.log('Starting new request log');
        }
    }

    logRequest(query) {
        const keywords = this.extractKeywords(query);
        keywords.forEach(keyword => {
            this.requests[keyword] = (this.requests[keyword] || 0) + 1;
        });
        this.updateLogFile();
    }

    extractKeywords(question) {
        // Basic keyword extraction - can be enhanced
        return question.toLowerCase()
            .split(/[\s,.?!]+/)
            .filter(word => word.length > 3 && !this.isCommonWord(word));
    }

    isCommonWord(word) {
        const commonWords = ['what', 'how', 'when', 'where', 'why', 'the', 'and', 'for'];
        return commonWords.includes(word);
    }

    async updateLogFile() {
        const entries = Object.entries(this.requests)
            .sort((a, b) => b[1] - a[1])
            .map(([key, count]) => count > 1 ? `${key} X${count}` : key);
        
        // Create downloadable file
        const blob = new Blob([entries.join('\n')], { type: 'text/plain' });
        this.fileUrl = URL.createObjectURL(blob);
        
        // Update download link
        this.updateDownloadLink();
    }

    updateDownloadLink() {
        let link = document.getElementById('log-download');
        if (!link) {
            link = document.createElement('a');
            link.id = 'log-download';
            link.className = 'btn';
            link.style.marginTop = '20px';
            document.querySelector('.ai-section').appendChild(link);
        }
        link.href = this.fileUrl;
        link.download = this.logFile;
        link.textContent = 'Download AI Requests Log';
    }
}

const requestLogger = new RequestLogger();

// AI Response System
class SimpleAI {
    constructor() {
        this.responses = {
            'discord': 'You can join our Discord community at [discord-link]',
            'download': 'All downloads are available in the Software tab',
            'error': 'Please describe the error in more detail',
            'default': 'Thank you for your question! I\'ve logged it for review.'
        };
    }

    getResponse(query) {
        requestLogger.logRequest(query);
        
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (query.toLowerCase().includes(keyword)) {
                return response;
            }
        }
        return this.responses.default;
    }
}

const ai = new SimpleAI();

// Chat Functionality
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
    const text = userInput.value.trim();
    if (!text) return;
    
    addMessage(text, true);
    userInput.value = '';
    
    setTimeout(() => {
        const response = ai.getResponse(text);
        addMessage(response);
    }, 500);
}

sendBtn.addEventListener('click', processUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserInput();
});

// Software Gallery
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

// News Rendering
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

// Initialize Page
window.addEventListener('DOMContentLoaded', () => {
    updateThemeIcon();
    renderSoftwareGallery();
    renderNews();
    
    // Show initial help message
    setTimeout(() => {
        addMessage("Hello! I'm the MeoDT assistant. Ask me about our software.");
        addMessage("Popular topics: downloads, discord, errors");
    }, 1000);
});