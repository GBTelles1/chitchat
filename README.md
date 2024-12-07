# ChitChat

ChitChat é uma aplicação de chat em tempo real que permite aos usuários participar de salas de conversa abertas e enviar mensagens. O projeto foi desenvolvido como um desafio técnico e implementa um backend em NestJS com WebSocket e um frontend em Next.js utilizando TypeScript.

## 🚀 Funcionalidades

### Backend

- **Criação de Salas de Chat**: Possui endpoint para criação das salas.
- **Conexão em Tempo Real**: Utiliza WebSocket para garantir que mensagens e eventos (como entrada e saída de usuários) sejam atualizados em tempo real.
- **Autenticação**:
  - Usuários não autenticados podem entrar como "anônimos", passando um "username", e apenas visualizar mensagens.
  - Usuários autenticados podem enviar mensagens após completar o cadastro (nome, email e data de nascimento).
- **Mensagens Persistentes**: Histórico de mensagens das salas é armazenado no banco de dados.
- **Eventos**:
  - Notificação em tempo real de entrada e saída de usuários na sala.
  - Recebimento de novas mensagens em tempo real.
- **API REST**: Todas as entidades (User, Chat e Message) possuem endpoints REST para lidar com o CRUD no banco de dados.

### Frontend

- **Interface Responsiva**: Desenvolvida com Next.js, com foco em simplicidade e elegância.
- **Visualização de Mensagens**: As mensagens são carregadas e exibidas em ordem cronológica crescente.
- **Envio de Mensagens**: Usuários registrados podem enviar mensagens na sala. Usuários anônimos podem apenas visualizar as mensagens e eventos nas salas.
- **Conexão Automática**: Usuários permanecem logados ao recarregar a página. Sua autenticação possui 1 dia de validade nos cookies. Você pode deslogar a qualquer momento pela tela de listagem de chat (`/`).
- **Gerenciamento de Salas**: O frontend permite acessar diferentes salas de chat por URL.

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js**
- **NestJS**
- **TypeScript**
- **WebSocket** (`socket.io`)
- **TypeORM** (com PostgreSQL como banco de dados)
- **Swagger** para documentação da API

### Frontend

- **React**
- **Next.js 15**
- **TypeScript**
- **socket.io-client**

---

## 📄 Requisitos

Certifique-se de ter os seguintes softwares instalados:

- **Node.js** (v22)
- **npm** e **yarn**
- **Docker**

---

## 🔧 Instalação e Execução

### Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/chitchat.git
   cd chitchat/backend
   ```

2. Instale as dependências:

   ```bash
   yarn
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz da pasta `backend`, seguindo o `.env.example` disponibilizado, com as informações para estabelecer a conexão com o banco de dados

4. Inicie o servidor:

   ```bash
   docker-compose up -d
   ```
   O servidor estará disponível no endereço `http://localhost:8000`

5. Acesse a documentação da API no Swagger:
   ```
   http://localhost:8000/docs
   ```

### Frontend

1. Entre na pasta `frontend`:

   ```bash
   cd chitchat/chitchat-front
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse a aplicação:
   ```
   http://localhost:3000
   ```

---

## Exemplos de Uso

### 0. Registrar

- Entre na aplicação e você será redirecionado para a tela de login, caso não tenha uma autenticação nos cookies (username ou userID).
- Caso não tenha realizado um cadastro prévio, vá para "/register" clicando link na página de login.
- Registre-se passando apenas um username, caso queira entrar como anônimo e apenas visualizar as mensagens das salas, ou passando username, email e data de nascimento, caso queira também mandar mensagens nas salas.

### 1. Acessar uma Sala de Chat

- Vá para a homepage, `/`, onde é possível visualizar a listagem de salas existentes. Caso não tenham chats, você pode criar um pelo botão "New Chat".
- Escolha uma sala e clique para entrar na sua página.

### 2. Enviar Mensagens

- Na página do chat que decidiu entrar, você pode visualizar o histórico de mensagens e, também, enviar novas mensagens, caso esteja com um usuário não anônimo.

---

## 📋 Endpoints da API

A api possui documentação pelo Swagger e pode ser visualizada através do endpoint `/docs`.

---

## 📌 Observações

- O projeto foi desenvolvido com foco em funcionalidade e não design.

---

## 💡 Melhorias Futuras

- Adicionar testes unitários e de integração para maior confiabilidade.
- Melhorar o design da interface com foco na experiência do usuário.
- Implementar paginação no histórico de mensagens.

---

## 📬 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests**.
