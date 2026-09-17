# Requisitos do Projeto: Novo TV Time

## 1. Visão Geral

O Novo TV Time é uma aplicação web para descobrir filmes e séries, organizar o que já foi assistido e acompanhar estatísticas pessoais. O MVP deve ter escopo enxuto, navegação simples e uma experiência visual inspirada em plataformas de streaming.

## 2. Problemas Selecionados

### Problema 1: Descobrir o que assistir

O usuário deve conseguir explorar conteúdos por gênero na página Home e pesquisar filmes ou séries pelo nome. Os resultados de busca e os dados dos títulos devem ser obtidos pela API do TMDB.

### Problema 2: Organizar o que já assistiu

Na página de detalhes, o usuário deve poder usar o botão **Marcar como Visto**. Os itens marcados devem ser salvos no `localStorage`, permitindo que o registro permaneça disponível após recarregar ou fechar a aplicação.

### Problema 3: Acompanhar estatísticas pessoais

O usuário deve ter uma página de Perfil em estilo Spotify, com uma visão resumida do seu consumo. A página deve exibir o total de conteúdos assistidos e o tempo total gasto, além de uma grade com os itens favoritados ou vistos.

## 3. Estrutura de Telas do MVP

### Home (`/`)

- Exibir um Hero Banner com um título em destaque e informações essenciais do conteúdo selecionado.
- Exibir dois trilhos de gênero:
  - Ação.
  - Comédia/Drama.
- Permitir que o usuário acesse os detalhes de um item a partir dos trilhos.

### Busca (`/busca`)

- Exibir um campo de busca simples para pesquisar por nome.
- Consultar a API do TMDB usando o texto informado.
- Exibir os resultados em uma grade de cards.
- Permitir que o usuário acesse os detalhes de cada resultado.

### Detalhes (`/midia/:id`)

- Exibir o pôster do filme ou série.
- Exibir título, sinopse e avaliação.
- Exibir o botão **Marcar como Visto**.
- Salvar e atualizar o status de visto no `localStorage`.

### Perfil (`/perfil`)

- Exibir cartões de estatísticas pessoais.
- Exibir o total de conteúdos assistidos.
- Exibir o tempo total gasto assistindo.
- Exibir uma grade de itens favoritados ou vistos.
- Usar os registros salvos no `localStorage` como fonte dos dados pessoais do MVP.

## 4. Rotas

| Rota | Tela | Objetivo |
| --- | --- | --- |
| `/` | Home | Descobrir conteúdos por destaque e gênero. |
| `/busca` | Busca | Pesquisar conteúdos pelo nome. |
| `/midia/:id` | Detalhes | Consultar informações e marcar um item como visto. |
| `/perfil` | Perfil | Visualizar itens pessoais e estatísticas. |

## 5. Regras Técnicas

### Whitelist: recursos permitidos

- React com componentes funcionais.
- Hooks `useState` e `useEffect`.
- `react-router` usando a Data API.
- `fetch` nativo do JavaScript para comunicação com a API do TMDB.
- `lucide-react` para ícones.
- `localStorage` para persistência dos itens marcados como vistos.

### Blacklist: recursos proibidos

- `useContext`.
- Redux e outras bibliotecas de gerenciamento de estado global.
- Axios.
- Tailwind CSS e Bootstrap.
- Custom Hooks.
- Tag `<a>` para navegação interna.

## 6. Restrições de Escopo

- O MVP deve conter somente as quatro telas e as quatro rotas descritas neste documento.
- Não haverá autenticação, login ou rotas privadas nesta versão.
- Não será necessário um backend próprio ou um banco de dados.
- Os dados de catálogo devem vir do TMDB, e os dados pessoais devem permanecer no `localStorage` do navegador.
- Toda navegação interna deve usar os recursos do `react-router`.

## 7. Direção Visual

- Usar tema escuro com linguagem visual de plataforma de streaming.
- Manter alto contraste, hierarquia clara de títulos e cards de conteúdo.
- Construir layout responsivo para desktop e dispositivos móveis.
- Usar CSS próprio, sem Tailwind CSS ou Bootstrap.
- Priorizar navegação direta entre Home, Busca, Detalhes e Perfil.

## 8. Critérios de Aceitação

- A Home apresenta Hero Banner e os dois trilhos de gênero definidos.
- A Busca permite pesquisar por nome e apresenta os resultados em grade.
- A tela de Detalhes apresenta pôster, sinopse, avaliação e o botão **Marcar como Visto**.
- O status de visto é persistido no `localStorage`.
- O Perfil apresenta cartões com total assistido e tempo gasto, além da grade de itens vistos ou favoritados.
- A aplicação usa somente os recursos da whitelist.
- Nenhum recurso da blacklist é utilizado.
- As quatro rotas do MVP funcionam e a navegação interna não utiliza `<a>`.
