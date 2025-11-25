// Application State
let currentUser = null;
let authLevel = 0;
let showHome = false;

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get('auth');
    const homeParam = urlParams.get('home');

    // Set authentication level
    if (authParam) {
        authLevel = parseInt(authParam) || 0;
    }

    // Set home flag
    if (homeParam) {
        showHome = homeParam === '1';
    }

    // Check for existing session
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        if (showHome) {
            showScreen('home-screen');
        } else {
            showScreen('chat-screen');
            initializeChat();
        }
    } else {
        // Show login if auth level requires it
        if (authLevel > 0) {
            showScreen('login-screen');
        } else {
            // No authentication required, go directly to chat or home
            currentUser = 'Guest';
            sessionStorage.setItem('currentUser', currentUser);
            if (showHome) {
                showScreen('home-screen');
            } else {
                showScreen('chat-screen');
                initializeChat();
            }
        }
    }
}

function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));

    // Show selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    // Clear previous errors
    errorDiv.textContent = '';

    // Basic validation
    if (!username || !password) {
        errorDiv.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Simple authentication simulation
    // In a real app, this would be a server-side API call
    if (authLevel === 2) {
        // Higher security level - require specific credentials
        if (username === 'admin' && password === 'admin123') {
            currentUser = username;
            sessionStorage.setItem('currentUser', currentUser);
            proceedAfterLogin();
        } else {
            errorDiv.textContent = 'Credenciais inválidas. Use: admin/admin123';
        }
    } else if (authLevel === 1) {
        // Basic auth - just need username and password
        if (password.length >= 4) {
            currentUser = username;
            sessionStorage.setItem('currentUser', currentUser);
            proceedAfterLogin();
        } else {
            errorDiv.textContent = 'A senha deve ter pelo menos 4 caracteres.';
        }
    } else {
        // No auth required
        currentUser = username;
        sessionStorage.setItem('currentUser', currentUser);
        proceedAfterLogin();
    }
}

function proceedAfterLogin() {
    if (showHome) {
        navigateToHome();
    } else {
        showScreen('chat-screen');
        initializeChat();
    }
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    // Clear chat messages
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    showScreen('login-screen');
}

function navigateToHome() {
    showScreen('home-screen');
}

function navigateToChat() {
    showScreen('chat-screen');
    initializeChat();
}

function showProfile() {
    const profileUsername = document.getElementById('profile-username');
    if (profileUsername) {
        profileUsername.textContent = currentUser || 'Usuário';
    }
    showScreen('profile-screen');
}

// Chat functionality
function initializeChat() {
    const messagesContainer = document.getElementById('messages');
    
    // Add welcome message if chat is empty
    if (messagesContainer && messagesContainer.children.length === 0) {
        addMessage('bot', `Olá${currentUser ? ' ' + currentUser : ''}! 👋 Sou o Agente Copilot. Como posso ajudá-lo hoje?`);
    }
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage('user', message);

    // Clear input
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessage('bot', response);
    }, 500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(type, text) {
    const messagesContainer = document.getElementById('messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Simple response logic
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi')) {
        return 'Olá! Como posso ajudá-lo? 😊';
    } else if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
        return 'Claro! Eu posso ajudá-lo com várias tarefas. O que você precisa?';
    } else if (lowerMessage.includes('nome')) {
        return 'Meu nome é Agente Copilot, seu assistente virtual! 🤖';
    } else if (lowerMessage.includes('hora') || lowerMessage.includes('tempo')) {
        return `Agora são ${new Date().toLocaleTimeString('pt-BR')}.`;
    } else if (lowerMessage.includes('data')) {
        return `Hoje é ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
    } else if (lowerMessage.includes('obrigado') || lowerMessage.includes('thanks')) {
        return 'De nada! Estou aqui para ajudar. 😊';
    } else if (lowerMessage.includes('tchau') || lowerMessage.includes('bye')) {
        return 'Até logo! Volte sempre! 👋';
    } else {
        const responses = [
            'Entendo. Pode me dar mais detalhes?',
            'Interessante! Conte-me mais sobre isso.',
            'Estou processando sua mensagem... Como posso ajudar especificamente?',
            'Recebi sua mensagem. O que mais você gostaria de saber?',
            'Estou aqui para ajudar! Pode elaborar mais sobre isso?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
