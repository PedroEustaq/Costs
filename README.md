<div align="center">
  
  ![EclairWeb](public/COSTS_logo.svg)

</div>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite" width="150" alt="My Skills" />
  </a>
</p>


<a href="https://google.com" target="_blank">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa1TzFAko_Ccqwylqn6J_8Y5xAqK8FqzreQdegz5ZWaB_2yjxWcRmRjSo&s=10"
       width="300"
       align="right"
       alt="Imagem clicável">
</a>

Esse é um projeto que eu desenvolvi fazendo o curso do Matheus Battisti (Hora de Codar).No curso, dá pra aprender a linguagem react e muitos conceitos, como:


- o básico de React e como criar aplicações;
- modulação de arquivos e organização de pastas;
- criação dos seus próprios componentes, que funcionam como “tags” personalizadas, pra evitar repetição de código;
- como funciona um servidor, builds, deploys e segurança frontend e backend no geral;
- requisições GET, POST, PUT etc. no React;
- usar o npm pra instalar bibliotecas do ecossistema npm e aplicá-las no projeto;
- aprender a criar JSX, que é a mistura de JavaScript com HTML.


---

<iframe width="560" height="315" src="https://www.youtube.com/embed/yEhuRXccoGE?si=Zo7BlAVTeBENZ3W5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


o projeto tem a ideia principal em ser um gerenciador de finanças pessoal, para pessoas que não conseguem controlar o seus gastos, ou controlar CADA pedaço dele.

<img src="https://i.ytimg.com/vi/mcb-4Y9msao/maxresdefault.jpg" width="150" alt="My Skills" />


| # | Comando | Quando rodar | O que faz |
|:-:|---------|--------------|-----------|
| 1 | `npm install` | Sempre (primeira vez, ou após mudar `package.json`) | Instala o `firebase-tools` e demais dependências do projeto |
| 2 | `npx firebase login` | Uma vez por máquina (só se ainda não estiver logado) | Autentica sua conta Google no Firebase CLI |
| 3 | `npx firebase init emulators` | Uma vez por projeto | Configura os emuladores locais — marque **Auth**, **Firestore** e **Hosting** no wizard |
| 4 | `npm start` | Toda vez que for testar | Sobe os emuladores e serve a aplicação em `http://localhost:5000` |

---

# Tutorial: How to Configure and Run the Project

## Prerequisites
- Node.js installed (LTS version recommended)
- npm (Node Package Manager) or yarn
- Git installed

## Step by Step

### 1. Clone the Repository
In the terminal, run the following command to clone the repository:

```bash
git clone [REPOSITORY_URL]
cd [PROJECT_FOLDER_NAME]
```
## 2. Install Dependencies
Install project dependencies with npm or yarn:
```
npm install
# or
yarn install
```
## 3. Configure the Environment
The project uses a backend server simulated with json-server (REST API) and a frontend in React + Vite.

## 4. Start Backend & Frontend
In a terminal, run the command to launch the backend and frontend:
```
npx concurrently "npm run dev" "npm run backend"
```
## 6. Access the Application
After starting the frontend, the application will be available at:

Frontend: http://localhost:5173 (or the port indicated in the terminal)
Backend (API): http://localhost:5234
