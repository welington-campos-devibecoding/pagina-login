// ============================================
// RECUPERAR SENHA LOGIC - Lógica específica da recuperação
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const recuperarForm = document.getElementById('recuperarForm');
    if (!recuperarForm) return;

    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const btnRecuperar = document.getElementById('btnRecuperar');

    recuperarForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        hideError();
        hideSuccess();

        const email = document.getElementById('email').value.trim();

        // Validações
        if (!email) {
            showError('Por favor, digite seu email');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, insira um email válido');
            return;
        }

        // Desabilitar botão
        btnRecuperar.disabled = true;
        btnRecuperar.querySelector('.btn-text').textContent = 'Enviando...';

        try {
            // Simular envio de email (requisição para o back-end)
            await new Promise(resolve => setTimeout(resolve, 2000));

            showSuccess(`Email de recuperação enviado para ${email}. Verifique sua caixa de entrada.`);

            // Limpar formulário
            document.getElementById('email').value = '';

        } catch (error) {
            showError('Erro ao enviar email. Tente novamente.');
        } finally {
            btnRecuperar.disabled = false;
            btnRecuperar.querySelector('.btn-text').textContent = 'Enviar Link de Recuperação';
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
    document.getElementById('email').addEventListener('input', () => {
        hideError();
        hideSuccess();
    });
});
