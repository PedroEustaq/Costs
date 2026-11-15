<div align="center">
  
  ![EclairWeb](public/COSTS_logo.svg)

</div>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite" width="150" alt="My Skills" />
  </a>
</p>


Esse é um projeto que eu desenvolvi fazendo o curso do Matheus Battisti (Hora de codar) , no curso dá pra aprender dele dá pra aprender muitos conceitos como:
o básico de react, aprender a criar aplicações
modulação de arquivos e organização de pastas,
Criação da <sua_propria> tag do html! (er.. no caso classes e componentes para evitar repetição de código)
Como funciona um servidor, builds, deploys e segurança frontend e backend no geral.
Requisições GET POST PUT etc no react.
Usar npm pra instalar qualquer biblioteca da familia npm e usar no seu projeto.
Aprender a criar um jsx. (mistura de JS e html)
<iframe width="560" height="315" src="https://www.youtube.com/embed/yEhuRXccoGE?si=Zo7BlAVTeBENZ3W5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


o projeto tem a ideia principal em ser um gerenciador de finanças pessoal, para pessoas que não conseguem controlar o seus gastos, ou controlar CADA pedaço dele.

<img src="https://i.ytimg.com/vi/mcb-4Y9msao/maxresdefault.jpg" width="150" alt="My Skills" />

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
