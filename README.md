# Agente Copilot - Chat com Autenticação

Uma aplicação de chat web com sistema de autenticação e navegação, inspirada em interfaces modernas de chat como Microsoft 365.

## 🚀 Funcionalidades

- **Sistema de Autenticação**: Suporta múltiplos níveis de autenticação via parâmetro URL `auth`
  - `auth=0`: Sem autenticação (acesso direto)
  - `auth=1`: Autenticação básica (qualquer usuário/senha)
  - `auth=2`: Autenticação avançada (credenciais específicas: admin/admin123)

- **Página Inicial**: Navegue primeiro pela home page usando o parâmetro `home=1`

- **Interface de Chat**: Chat interativo com respostas automáticas do agente

- **Perfil de Usuário**: Visualize informações do usuário logado

- **Design Responsivo**: Interface moderna e adaptável

## 📋 Pré-requisitos

- Node.js (versão 12 ou superior)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ONestoGamer/Agente-copilot-baseado-em-modelo.git
cd Agente-copilot-baseado-em-modelo
```

2. Inicie o servidor:
```bash
node server.js
```

O servidor será iniciado em `http://localhost:3000`

## 💡 Como Usar

### Opções de URL

Você pode personalizar o comportamento da aplicação usando parâmetros na URL:

1. **Com autenticação e página inicial**:
   ```
   http://localhost:3000/?auth=2&home=1
   ```

2. **Apenas com autenticação básica**:
   ```
   http://localhost:3000/?auth=1
   ```

3. **Direto para o chat (sem autenticação)**:
   ```
   http://localhost:3000/
   ```

4. **Página inicial sem autenticação**:
   ```
   http://localhost:3000/?home=1
   ```

### Credenciais de Login

- **auth=1** (Básico): Qualquer nome de usuário e senha com 4+ caracteres
- **auth=2** (Avançado): 
  - Usuário: `admin`
  - Senha: `admin123`

## 🎨 Estrutura do Projeto

```
.
├── index.html      # Interface HTML principal
├── styles.css      # Estilos CSS
├── app.js          # Lógica JavaScript da aplicação
├── server.js       # Servidor HTTP Node.js
├── package.json    # Configuração do projeto
└── README.md       # Documentação
```

## 🔒 Segurança

⚠️ **AVISO IMPORTANTE**: Este é um projeto de demonstração/proof-of-concept educacional. **NÃO USE EM PRODUÇÃO!**

### Problemas de Segurança Conhecidos (apenas para demonstração):
- ❌ Credenciais hardcoded no código
- ❌ Autenticação client-side (não segura)
- ❌ SessionStorage pode ser manipulado pelo usuário
- ❌ Senhas em texto simples
- ❌ Sem proteção contra path traversal no servidor
- ❌ Mensagens de erro expõem credenciais válidas

### Para um Ambiente de Produção Real:
- ✅ Use HTTPS obrigatoriamente
- ✅ Implemente autenticação real no backend (OAuth, JWT, etc.)
- ✅ Use hash seguro para senhas (bcrypt, argon2)
- ✅ Implemente sessões server-side ou tokens seguros
- ✅ Adicione rate limiting e proteção contra ataques
- ✅ Valide e sanitize todas as entradas
- ✅ Implemente proteção CSRF
- ✅ Use variáveis de ambiente para configurações sensíveis

## 🌐 Deployment

Para fazer deploy em produção, você pode usar serviços como:
- Heroku
- Vercel
- Netlify
- GitHub Pages (para arquivos estáticos)

## 📝 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.