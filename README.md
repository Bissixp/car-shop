##  :car: Car Shop :car: 
Neste projeto foi desenvolvido uma API RESTful para uma loja de veículos utilizando POO (Programação Orientada a Objetos) e princípios de SOLID com um banco de dados MongoDB.

Também foi implementado testes unitários.

## Instalação
<details>
  <summary><strong>:whale: Com Docker ou sem Docker</strong></summary><br />
  
  ## Sem Docker

  ### 1 - Clone o repositório
```bash
git clone git@github.com:Bissixp/car-shop.git
```
  ### 2 - Mude para pasta do repositório
```bash
cd car-shop
```
  ### 3 - Instale as dependências
```bash
npm install
```
  ### 4 - Rode o servidor
```bash
npm start
```
### 5 - Faça requisições para o servidor aberto na porta 3001
Recomendo utilizar a extensão Thunder Client no VS Code para fazer as requisições

---

## Com docker

### 1 - Clone o repositório
```bash
git clone git@github.com:Bissixp/car-shop.git
```
### 2 - Mude para pasta do repositório
```bash
cd car-shop
```
### 3 - Rode o contêiner na pasta raiz da aplicação
```bash
docker-compose up -d
```
### 4 - Abra o terminal do container
```bash
docker exec -it car_shop bash
```
### 5 - Instale as dependências no terminal do container
```bash
npm install
```
### 6 - Rode o servidor
```bash
npm start
```
### 7 - Faça requisições para o servidor aberto na porta 3001
Recomendo utilizar a extensão Thunder Client no VS Code para fazer as requisições

 </details>


## 📋 Tecnologias utilizadas

- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose.js
- Mocha
- Chai
- Sinon
- SOLID
- POO(Programação Orientada a Objeto)
