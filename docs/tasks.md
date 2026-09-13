# Novo TV Time - Tarefas de Implementacao

## FASE 1: Configuracao Inicial e Estilos Globais

- [x] **Task 1.1:** Definir as variaveis de CSS em `src/index.css`, incluindo as cores `#121212`, `#1C1C1E` e `#FFD000`, alem do reset global, tipografia base, layout responsivo e estados de foco.
- [ ] **Task 1.2:** Criar o servico e as funcoes helper para chamadas da API do TMDB em `src/services/tmdb.js`, utilizando `fetch` nativo, variaveis de ambiente para a chave e tratamento de respostas invalidas ou erros de rede.

## FASE 2: Roteamento e Shell da Aplicacao

- [ ] **Task 2.1:** Criar o componente `Navbar` em `src/components/Navbar/`, com navegacao interna para Home, Busca e Perfil usando os recursos do React Router e icones do `lucide-react` quando aplicavel.
- [ ] **Task 2.2:** Criar o `RootLayout` com `Outlet` e `Navbar`, mantendo a estrutura compartilhada das paginas e a area principal de conteudo.
- [ ] **Task 2.3:** Configurar a React Router Data API com `createBrowserRouter` em `src/App.jsx`, registrando as rotas `/`, `/busca`, `/midia/:id` e `/perfil`.
- [ ] **Task 2.4:** Criar o wrapper `PrivateRoute` em `src/components/PrivateRoute/`, verificando a existencia de uma sessao ou perfil valido no `localStorage` antes de renderizar a rota protegida.

## FASE 3: Componentes de UI Reutilizaveis

- [ ] **Task 3.1:** Criar o `MediaCard` com poster, titulo e overlay de vistos/curtidas, seguindo a referencia visual do Letterboxd e permitindo a navegacao para os detalhes da midia.
- [ ] **Task 3.2:** Criar o `GenreRow` como carrossel ou trilho horizontal no estilo Netflix, com titulo do genero, rolagem responsiva e cards de midia.
- [ ] **Task 3.3:** Criar o `HeroBanner` para exibir midias em destaque, incluindo imagem de fundo, titulo, sinopse curta, metadados e acao para abrir os detalhes.
- [ ] **Task 3.4:** Criar o `StatsCard` para exibir metricas do perfil, seguindo a referencia visual do Spotify e aceitando rotulo, valor, detalhe e icone.

## FASE 4: Paginas Principais (Telamento do MVP)

- [ ] **Task 4.1:** Implementar a pagina Home com `HeroBanner` e os trilhos de genero de Acao e Comedia/Drama, carregando os dados do TMDB.
- [ ] **Task 4.2:** Implementar a pagina Busca com campo de entrada e grade de resultados obtidos pela API do TMDB, incluindo estados de carregamento, vazio e erro.
- [ ] **Task 4.3:** Implementar a pagina Detalhes em `/midia/:id`, exibindo poster, titulo, sinopse e avaliacao, com o botao **Marcar como Visto** persistido no `localStorage`.
- [ ] **Task 4.4:** Implementar a pagina Perfil em `/perfil`, exibindo metricas de total assistido e tempo gasto, alem da lista ou grade de midias salvas, usando os registros do `localStorage`.
