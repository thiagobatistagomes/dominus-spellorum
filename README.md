# Dominus Spellorum 🧙‍♂️

> Aplicação web que permite a usuários (personagens mágicos) gerenciar os feitiços que dominam e os que desejam aprender, usando dados da API pública de Harry Potter.

---

## ✨ Objetivo

Este projeto foi desenvolvido como parte do trabalho final da disciplina **XDES03 – Programação Web** (UNIFEI), com foco em:

- Aplicação web completa (frontend + backend)
- CRUD com arquivos como base de dados
- Autenticação com login e rotas protegidas
- Consumo de API externa (HP-API)

---

## 🧪 Funcionalidades

- Cadastro e login de usuários (Juro solenemente não fazer nada de bom!)
- Listar todos os feitiços disponíveis (via API externa)
- Adicionar feitiços à lista de **dominados** ou **desejados**
- Mover feitiços de "desejados" para "dominados"
- Remover feitiços de ambas as listas
- Visualização personalizada por usuário

---

## 🧰 Tecnologias utilizadas

### Frontend
- Angular
- HTML/CSS
- TypeScript
- Reactive Forms
- JWT para autenticação

### Backend
- Node.js
- Express
- JSON Web Token (JWT)
- Manipulação de arquivos JSON (`fs.promises`)

### API externa
- [HP-API (Harry Potter API)](https://hp-api.onrender.com/)

---

## 📂 Estrutura do projeto

dominus-spellorum/
├── frontend/ → Aplicação Angular
├── backend/ → API Express com arquivos JSON
└── README.md