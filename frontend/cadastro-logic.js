// ============================================
// CADASTRO LOGIC - Lógica específica do cadastro
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    if (!cadastroForm) return;

    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const btnCadastro = document.getElementById('btnCadastro');

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        hideError();
        hideSuccess();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccept = document.getElementById('termsAccept').checked;

        // Validações
        if (!nome || !email || !password || !confirmPassword) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, insira um email válido');
            return;
        }

        if (password.length < 6) {
            showError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            showError('As senhas não coincidem');
            return;
        }

        if (!termsAccept) {
            showError('Você deve aceitar os termos e condições');
            return;
        }

        // Desabilitar botão
        btnCadastro.disabled = true;
        btnCadastro.querySelector('.btn-text').textContent = 'Cadastrando...';

        try {
            // Simular cadastro (requisição para o back-end)
            await new Promise(resolve => setTimeout(resolve, 1500));

            showSuccess('Cadastro realizado com sucesso! Redirecionando...');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            showError('Erro ao realizar cadastro. Tente novamente.');
        } finally {
            btnCadastro.disabled = false;
            btnCadastro.querySelector('.btn-text').textContent = 'Cadastrar';
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.classList.add('show');
    }

    function hideSuccess() {
        successMessage.textContent = '';
        successMessage.classList.remove('show');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Limpar mensagens ao digitar
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            hideError();
            hideSuccess();
        });
    });
});
