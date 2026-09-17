# TV Time

Aplicação web para descobrir filmes e séries, acompanhar o que já foi assistido e visualizar estatísticas pessoais em um visual inspirado em plataformas de streaming.

## Sobre o projeto

O TV Time é uma interface em React para explorar conteúdos do TMDB com navegação em páginas dedicadas para:

- Home com destaques e trilhos por gênero
- Busca por títulos
- Detalhes de filmes e séries
- Perfil com estatísticas e itens marcados como assistidos

A aplicação usa armazenamento local do navegador para persistir o histórico de conteúdos marcados como vistos, sem necessidade de backend ou banco de dados.

## Funcionalidades

- Exploração de filmes e séries em destaque
- Trilhos por gênero na página inicial
- Busca por nome com consulta à API do TMDB
- Página de detalhes com sinopse, avaliação e dados do conteúdo
- Botão para marcar conteúdo como visto
- Persistência do estado no localStorage
- Página de perfil com estatísticas pessoais
- Layout visual dark mode com aparência de streaming

## Stack

- React
- Vite
- React Router DOM
- JavaScript
- TMDB API
- CSS Modules/arquivo CSS próprio
- Lucide React

## Estrutura do projeto

```bash
TV-Time/
├── docs/
│   ├── architecture.md
│   ├── requirements.md
│   └── references/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

## Requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm
- Uma chave da API do TMDB

## Configuração

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd TV-Time
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com uma das opções de autenticação do TMDB:

```env
VITE_TMDB_API_KEY=sua_chave_aqui
# ou
VITE_TMDB_TOKEN=seu_token_aqui
```

No código atual do projeto, a autenticação é lida com `VITE_TMDB_TOKEN`. A variável `VITE_TMDB_API_KEY` também pode ficar no arquivo para manter as opções disponíveis, mas a aplicação utiliza o token no momento.

## Scripts

```bash
npm run dev
```

Inicia o servidor de desenvolvimento do Vite.

```bash
npm run build
```

Gera a build de produção.

```bash
npm run preview
```

Pré-visualiza a build gerada localmente.

```bash
npm run lint
```

Executa a análise de lint do projeto.

## Rotas

- `/` — Home
- `/busca` — Busca por títulos
- `/midia/:id` — Detalhes do conteúdo
- `/perfil` — Perfil do usuário

## Como funciona

A aplicação consulta o TMDB para recuperar dados de filmes e séries e exibe os resultados na interface. O status de conteúdo assistido é salvo no `localStorage`, permitindo que a experiência continue após recarregar a página ou fechar o navegador.

## Documentação

O projeto contém documentação complementar em:

- [docs/requirements.md](docs/requirements.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/references/references.md](docs/references/references.md)

## Observações

- Não há autenticação ou backend próprio nesta versão.
- Os dados pessoais do usuário ficam no navegador via `localStorage`.
- A aplicação foi desenvolvida como MVP seguindo uma estrutura simples e orientada ao fluxo de descoberta e acompanhamento de conteúdos.

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de estudo.
