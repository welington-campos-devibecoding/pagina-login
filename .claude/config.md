# Configuração do Projeto - Microsserviço de Login

## 1. Contexto do Projeto

Microsserviço full-stack composto por:
- Uma tela de login (Front-end)
- Uma tela de saudação após autenticação
- Um back-end simples que valida o usuário e retorna sucesso ou falha
- Estrutura limpa, escalável e com separation of concerns

## 2. Arquitetura

### Back-end
- **Stack**: Node.js + Express
- **Endpoint**: POST /login recebendo `{ email, password }`
- **Validação**: Credenciais fixas (email: `teste@teste.com`, senha: `123456`)
- **Respostas**:
  - 200 + JSON `{ success: true, username: "Nome do Usuário" }`
  - 401 + JSON `{ success: false, message: "Credenciais inválidas" }`
- **CORS**: Habilitado
- **Porta**: http://localhost:3001

### Front-end
- **Stack**: HTML + CSS + JavaScript puro (sem frameworks)
- **Página login.html**:
  - Campo email
  - Campo senha
  - Botão "Entrar"
  - Ao logar com sucesso: redirecionar para `saudacao.html?user=Nome`
- **Página saudacao.html**:
  - Ler parâmetro `user` da URL
  - Exibir: "Bem-vindo, {Nome}!"
  - Botão "Sair" que volta ao login

## 3. Estrutura de Pastas
```
/projeto-login
  /backend
    server.js
    package.json
  /frontend
    login.html
    saudacao.html
    styles.css
    script.js
  README.md
```

## 4. Diretrizes de Desenvolvimento

- Manter separation of concerns entre front-end e back-end
- Código limpo e bem comentado
- Validações adequadas no cliente e servidor
- Mensagens de erro amigáveis
- Estrutura escalável para futuras expansões

## 5. Checklist de Validação

- [ ] Login funcional
- [ ] Roteamento OK
- [ ] Comunicação front > back operacional
- [ ] Mensagens de erro amigáveis
- [ ] Fluxo ponta a ponta validado
- [ ] CORS configurado corretamente
- [ ] Tratamento de erros implementado
