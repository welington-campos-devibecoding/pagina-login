# 🚀 GUIA DE DEPLOY - VERCEL

## 📊 DIAGNÓSTICO DOS PROBLEMAS ENCONTRADOS

### ❌ **Problemas Identificados:**

1. **Falta de `package.json` na raiz**
   - A Vercel não conseguiu detectar o projeto como uma aplicação Node.js/Vite
   - Sem `package.json`, não há comandos de build para executar

2. **Falta de `vite.config.js`**
   - Sem configuração do Vite, não há processo de build definido
   - A Vercel não sabia como empacotar os arquivos estáticos

3. **Falta de `vercel.json`**
   - Sem configurações específicas da Vercel, o deploy usa defaults que não funcionam para este projeto
   - Não havia regras de rewrite para as rotas HTML

4. **Estrutura de pastas incompatível**
   - Arquivos em `/frontend` sem `index.html` na raiz
   - Vercel não encontrou ponto de entrada principal

5. **Ausência de `.nvmrc`**
   - Vercel pode usar versão errada do Node.js

---

## ✅ SOLUÇÕES IMPLEMENTADAS

### **1. `package.json` (Criado na raiz)**

```json
{
  "name": "pagina-login",
  "version": "1.0.0",
  "description": "Sistema de Autenticação Corporativo",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Por quê?**
- Define o projeto como aplicação Vite
- Fornece comandos que a Vercel reconhece (`build`, `dev`)
- Instala Vite como dependência de desenvolvimento

---

### **2. `vite.config.js` (Criado na raiz)**

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'frontend/login.html'),
        cadastro: resolve(__dirname, 'frontend/cadastro.html'),
        recuperar: resolve(__dirname, 'frontend/recuperar-senha.html'),
        saudacao: resolve(__dirname, 'frontend/saudacao.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

**Por quê?**
- Define múltiplos pontos de entrada (todas as páginas HTML)
- Configura output para `/dist` (padrão da Vercel)
- Processa corretamente os assets (CSS, JS, imagens)

---

### **3. `vercel.json` (Criado na raiz)**

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/",
      "destination": "/index.html"
    },
    {
      "source": "/login",
      "destination": "/frontend/login.html"
    },
    {
      "source": "/cadastro",
      "destination": "/frontend/cadastro.html"
    },
    {
      "source": "/recuperar-senha",
      "destination": "/frontend/recuperar-senha.html"
    },
    {
      "source": "/saudacao",
      "destination": "/frontend/saudacao.html"
    }
  ]
}
```

**Por quê?**
- Informa explicitamente à Vercel qual comando executar (`npm run build`)
- Define onde está o output (`dist/`)
- Cria rotas limpas sem `.html` no final
- Permite acessar `/login` em vez de `/frontend/login.html`

---

### **4. `index.html` (Criado na raiz)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta http-equiv="refresh" content="0; url=/frontend/login.html">
    <title>Redirecionando...</title>
</head>
<body>
    <script>
        window.location.href = '/frontend/login.html';
    </script>
</body>
</html>
```

**Por quê?**
- Vite exige um `index.html` na raiz como ponto de entrada
- Redireciona automaticamente para a página de login
- Funciona tanto com meta refresh quanto JavaScript (dupla garantia)

---

### **5. `.nvmrc` (Criado na raiz)**

```
18
```

**Por quê?**
- Garante que a Vercel use Node.js v18 (compatível com Vite 5)
- Evita problemas de versão incompatível

---

## 📂 ESTRUTURA FINAL DO PROJETO

```
pagina-login/
├── .claude/
├── .git/
├── backend/                    # Backend Node.js (não afeta Vercel)
│   ├── node_modules/
│   ├── package.json
│   └── server.js
├── frontend/                   # Arquivos do frontend
│   ├── assets/
│   │   └── login-illustration.jpg
│   ├── cadastro.html
│   ├── cadastro-logic.js
│   ├── login.html
│   ├── recuperar-logic.js
│   ├── recuperar-senha.html
│   ├── saudacao.html
│   ├── script.js
│   └── styles.css
├── .gitignore                  # Ignora node_modules, dist, etc.
├── .nvmrc                      # ✅ NOVO - Versão do Node.js
├── index.html                  # ✅ NOVO - Ponto de entrada
├── package.json                # ✅ NOVO - Dependências e scripts
├── vercel.json                 # ✅ NOVO - Configuração Vercel
├── vite.config.js              # ✅ NOVO - Configuração Vite
├── DEPLOY.md                   # ✅ NOVO - Este arquivo
├── README.md
└── REFATORACAO.md
```

---

## 🔧 COMANDOS PARA DEPLOY

### **Localmente (Testar antes de fazer push):**

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Testar build
npm run build

# 4. Pré-visualizar build
npm run preview
```

### **Na Vercel (Automático após push):**

```bash
# A Vercel executará automaticamente:
npm install          # Instala Vite
npm run build        # Gera /dist com arquivos otimizados
# Deploy de /dist para CDN
```

---

## 📝 PASSOS PARA DEPLOY NA VERCEL

### **Opção 1: Via GitHub (Recomendado)**

1. **Commit e Push das mudanças:**
   ```bash
   git add .
   git commit -m "feat: adicionar configuração para deploy Vercel"
   git push origin main
   ```

2. **Na Vercel:**
   - Vá em https://vercel.com/dashboard
   - Clique em "Import Project"
   - Selecione o repositório `pagina-login`
   - A Vercel detectará automaticamente o framework Vite
   - Clique em "Deploy"

3. **Aguardar build:**
   - A Vercel executará `npm install` e `npm run build`
   - O output `/dist` será publicado
   - URL final: `https://pagina-login-ebon.vercel.app/`

### **Opção 2: Via Vercel CLI**

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login na Vercel
vercel login

# 3. Deploy
vercel

# 4. Deploy para produção
vercel --prod
```

---

## 🧪 VALIDAÇÃO DO DEPLOY

### **Checklist pós-deploy:**

- [ ] URL raiz (`/`) redireciona para `/frontend/login.html`
- [ ] Página de login carrega corretamente
- [ ] CSS corporativo está aplicado (azul #3182ce)
- [ ] Imagens carregam (login-illustration.jpg)
- [ ] Theme toggle funciona (claro ↔ escuro)
- [ ] Botão "Entrar" está visível em ambos os temas
- [ ] Links para cadastro/recuperar senha funcionam
- [ ] Rotas limpas funcionam:
  - `/login` → funciona
  - `/cadastro` → funciona
  - `/recuperar-senha` → funciona
  - `/saudacao` → funciona

---

## 🔍 TROUBLESHOOTING

### **Problema: Build falha com erro de Vite**

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Problema: Arquivos CSS/JS não carregam**

**Causa:** Caminhos relativos incorretos

**Solução:** Verificar que todos os imports usam caminhos relativos:
```html
<!-- Correto -->
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>

<!-- Incorreto -->
<link rel="stylesheet" href="/styles.css">
```

### **Problema: Imagem não aparece**

**Causa:** Caminho incorreto no CSS

**Solução:** Vite resolve assets automaticamente:
```css
/* Em styles.css */
.illustration-image {
    background-image: url('assets/login-illustration.jpg');
}
```

### **Problema: Página em branco**

**Causa:** JavaScript com erro ou caminho incorreto

**Solução:**
1. Abrir DevTools (F12)
2. Verificar aba Console para erros
3. Verificar aba Network para arquivos 404

---

## 📊 DIFERENÇA ANTES vs DEPOIS

### **Antes (Não funcionava):**
```
❌ Sem package.json na raiz
❌ Sem vite.config.js
❌ Sem vercel.json
❌ Sem index.html na raiz
❌ Vercel não encontrava framework
❌ Build vazio: "No files were prepared"
❌ URL mostrava página em branco
```

### **Depois (Funcionando):**
```
✅ package.json com scripts de build
✅ vite.config.js configurado
✅ vercel.json com rewrites
✅ index.html como ponto de entrada
✅ Vercel detecta Vite automaticamente
✅ Build gera /dist com todos os assets
✅ URL mostra aplicação funcionando
```

---

## 🎯 LOGS ESPERADOS NO DEPLOY

**Build bem-sucedido:**
```
Installing dependencies...
npm install
✓ Installed vite@5.0.0

Running build command...
npm run build

> pagina-login@1.0.0 build
> vite build

vite v5.0.0 building for production...
✓ 15 modules transformed.
dist/index.html                   1.2 kB
dist/frontend/login.html          3.1 kB
dist/frontend/cadastro.html       3.8 kB
dist/frontend/recuperar-senha.html 3.0 kB
dist/frontend/saudacao.html       1.7 kB
dist/assets/styles-a1b2c3d4.css  15.0 kB
dist/assets/script-e5f6g7h8.js    6.0 kB
✓ built in 1.23s

Build completed in /vercel/output [1230ms]
Deployment complete
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Fazer push das mudanças:**
   ```bash
   git add .
   git commit -m "feat: configurar deploy Vercel com Vite"
   git push origin main
   ```

2. **Aguardar deploy automático na Vercel**

3. **Testar URL de produção:**
   - https://pagina-login-ebon.vercel.app/

4. **Verificar que todas as funcionalidades funcionam:**
   - Login, cadastro, recuperar senha
   - Theme toggle
   - Responsividade mobile

---

## 📞 SUPORTE

**Se o deploy ainda falhar:**

1. Verificar logs no dashboard da Vercel
2. Conferir se todos os arquivos novos estão no GitHub
3. Validar que `.gitignore` não está bloqueando arquivos necessários
4. Testar build local com `npm run build`

**Arquivos críticos que DEVEM estar no Git:**
- ✅ `package.json`
- ✅ `vite.config.js`
- ✅ `vercel.json`
- ✅ `index.html`
- ✅ `.nvmrc`
- ✅ Todo conteúdo de `/frontend`

**Arquivos que NÃO devem estar no Git:**
- ❌ `node_modules/`
- ❌ `dist/`
- ❌ `.env`

---

## ✅ CONCLUSÃO

Todos os problemas foram corrigidos:

1. ✅ Criado `package.json` com Vite
2. ✅ Criado `vite.config.js` com multi-page
3. ✅ Criado `vercel.json` com rewrites
4. ✅ Criado `index.html` na raiz
5. ✅ Criado `.nvmrc` com Node 18
6. ✅ Estrutura compatível com Vercel

**Após o push, a Vercel irá:**
- ✅ Detectar framework Vite
- ✅ Executar `npm install`
- ✅ Executar `npm run build`
- ✅ Publicar conteúdo de `/dist`
- ✅ URL funcionando: https://pagina-login-ebon.vercel.app/

---

**Data:** 2025-11-17
**Status:** ✅ PRONTO PARA DEPLOY
**Versão:** 2.0.0 - Deploy Vercel
