// Importar dependências
const express = require('express');
const cors = require('cors');

// Criar aplicação Express
const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Habilitar CORS para permitir requisições do front-end
app.use(express.json()); // Parser para JSON no body das requisições

// Credenciais válidas (fixas para este exemplo)
const VALID_CREDENTIALS = {
  email: 'teste@teste.com',
  password: '123456',
  username: 'Usuário Teste'
};

// Endpoint de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validar se email e senha foram enviados
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }

  // Validar credenciais
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    // Login bem-sucedido
    return res.status(200).json({
      success: true,
      username: VALID_CREDENTIALS.username
    });
  } else {
    // Credenciais inválidas
    return res.status(401).json({
      success: false,
      message: 'Credenciais inválidas'
    });
  }
});

// Endpoint de health check (opcional, mas recomendado)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor rodando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 Credenciais de teste:`);
  console.log(`   Email: ${VALID_CREDENTIALS.email}`);
  console.log(`   Senha: ${VALID_CREDENTIALS.password}`);
});
