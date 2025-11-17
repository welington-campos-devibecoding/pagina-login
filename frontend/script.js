// Configuração da API
const API_URL = 'http://localhost:3001';

// ========================================
// THEME MANAGEMENT
// ========================================

// Inicializar tema
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Alternar tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ========================================
// REMEMBER ME FUNCTIONALITY
// ========================================

// Salvar email se "Lembrar-me" estiver marcado
function saveRememberMe(email, remember) {
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
}

// Carregar email salvo
function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (rememberedEmail && emailInput && rememberMeCheckbox) {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
}

// ========================================
// LOGIN FORM
// ========================================

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    initTheme();

    const loginForm = document.getElementById('loginForm');

    // Se não houver formulário de login, sair
    if (!loginForm) return;

    const errorMessage = document.getElementById('errorMessage');
    const btnLogin = document.getElementById('btnLogin');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Carregar email lembrado
    loadRememberedEmail();

    // Adicionar evento de submit ao formulário
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpar mensagem de erro anterior
        hideError();

        // Obter valores dos campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

        // Validar campos
        if (!email || !password) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        // Validar formato de email
        if (!isValidEmail(email)) {
            showError('Por favor, insira um email válido');
            return;
        }

        // Desabilitar botão durante a requisição
        btnLogin.disabled = true;
        btnLogin.textContent = 'Entrando...';

        try {
            // Fazer requisição para o back-end
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Salvar email se "Lembrar-me" estiver marcado
                saveRememberMe(email, rememberMe);

                // Login bem-sucedido
                // Redirecionar para página de saudação com o nome do usuário
                window.location.href = `saudacao.html?user=${encodeURIComponent(data.username)}`;
            } else {
                // Login falhou
                showError(data.message || 'Erro ao fazer login. Tente novamente.');
            }
        } catch (error) {
            // Erro de conexão
            console.error('Erro:', error);
            showError('Erro de conexão com o servidor. Verifique se o back-end está rodando.');
        } finally {
            // Reabilitar botão
            btnLogin.disabled = false;
            btnLogin.textContent = 'Entrar';
        }
    });

    // Função para exibir mensagem de erro
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    // Função para ocultar mensagem de erro
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }

    // Função para validar formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Limpar mensagem de erro quando o usuário começar a digitar
    document.getElementById('email').addEventListener('input', hideError);
    document.getElementById('password').addEventListener('input', hideError);
});
