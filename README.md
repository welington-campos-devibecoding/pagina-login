# Microsserviço de Login

Projeto full-stack de autenticação com front-end HTML/CSS/JavaScript puro e back-end Node.js + Express.

## Estrutura do Projeto

```
/projeto-login
  /.claude
    config.md                 # Configurações e especificações do projeto
  /backend
    server.js                 # Servidor Express com endpoint de login
    package.json              # Dependências do back-end
  /frontend
    login.html                # Página de login
    saudacao.html             # Página de boas-vindas após login
    styles.css                # Estilos CSS
    script.js                 # Lógica JavaScript do front-end
  README.md                   # Este arquivo
```

## Tecnologias Utilizadas

### Back-end
- Node.js
- Express.js
- CORS

### Front-end
- HTML5
- CSS3
- JavaScript (ES6+)

## Como Executar o Projeto

### 1. Instalar Dependências do Back-end

```bash
cd backend
npm install
```

### 2. Iniciar o Servidor Back-end

```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

### 3. Abrir o Front-end

Abra o arquivo `frontend/login.html` no navegador ou use um servidor local:

**Opção 1: Abrir diretamente**
- Navegue até a pasta `frontend`
- Clique duas vezes em `login.html`

**Opção 2: Usar Live Server (recomendado)**
```bash
# Se você tiver o Live Server instalado globalmente
cd frontend
npx live-server
```

**Opção 3: Usar Python**
```bash
cd frontend
python -m http.server 8000
# Acesse http://localhost:8000/login.html
```

## Credenciais de Teste

Para testar o sistema, use as seguintes credenciais:

- **Email**: `teste@teste.com`
- **Senha**: `123456`

## Funcionalidades

### Back-end
- ✅ Endpoint POST `/login` para autenticação
- ✅ Validação de credenciais
- ✅ CORS habilitado
- ✅ Respostas padronizadas (200 para sucesso, 401 para falha)
- ✅ Endpoint GET `/health` para verificar status do servidor

### Front-end
- ✅ Formulário de login com validação
- ✅ Validação de formato de email
- ✅ Mensagens de erro amigáveis
- ✅ Feedback visual durante o login
- ✅ Redirecionamento após login bem-sucedido
- ✅ Página de saudação personalizada
- ✅ Botão de logout
- ✅ Design responsivo

## Fluxo da Aplicação

1. Usuário acessa `login.html`
2. Preenche email e senha
3. Clica em "Entrar"
4. Front-end envia requisição POST para `http://localhost:3001/login`
5. Back-end valida as credenciais
6. Se válido: retorna `{ success: true, username: "..." }`
7. Front-end redireciona para `saudacao.html?user=Nome`
8. Página de saudação exibe mensagem personalizada
9. Usuário pode clicar em "Sair" para voltar ao login

## API Endpoints

### POST /login
Autentica o usuário.

**Request:**
```json
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

**Response (Sucesso - 200):**
```json
{
  "success": true,
  "username": "Usuário Teste"
}
```

**Response (Falha - 401):**
```json
{
  "success": false,
  "message": "Credenciais inválidas"
}
```

### GET /health
Verifica se o servidor está rodando.

**Response (200):**
```json
{
  "status": "OK",
  "message": "Servidor rodando"
}
```

## Checklist de Validação

- [x] Login funcional
- [x] Roteamento OK
- [x] Comunicação front > back operacional
- [x] Mensagens de erro amigáveis
- [x] Fluxo ponta a ponta validado
- [x] CORS configurado corretamente
- [x] Tratamento de erros implementado
- [x] Validação de campos no front-end
- [x] Design responsivo
- [x] Feedback visual durante operações

## Melhorias Futuras

- [ ] Autenticação com JWT
- [ ] Persistência de dados em banco de dados
- [ ] Registro de novos usuários
- [ ] Recuperação de senha
- [ ] Proteção contra ataques de força bruta
- [ ] Testes automatizados
- [ ] Docker para containerização

## Problemas Comuns

### Erro de CORS
Se você receber erros de CORS, verifique se:
- O back-end está rodando em `http://localhost:3001`
- O middleware CORS está configurado corretamente no `server.js`

### Servidor não inicia
- Verifique se a porta 3001 não está em uso
- Certifique-se de que as dependências foram instaladas (`npm install`)

### Login não funciona
- Abra o console do navegador (F12) para ver erros
- Verifique se o back-end está rodando
- Confirme que está usando as credenciais corretas

## Licença

MIT
