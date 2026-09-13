# Arquitetura do Novo TV Time

## 1. Visao da Arquitetura

O Novo TV Time sera uma Single Page Application (SPA) em React para descoberta, acompanhamento e organizacao de filmes e series. A aplicacao combina:

- React com componentes funcionais em PascalCase;
- React Router usando a Data API (`createBrowserRouter` e `RouterProvider`);
- estado local controlado exclusivamente por `useState`;
- efeitos de carregamento e sincronizacao controlados por `useEffect`;
- comunicacao com o TMDB por `fetch` nativo;
- persistencia local com `localStorage`;
- CSS puro, com estilos globais em `src/index.css` e estilos locais junto aos componentes;
- icones da biblioteca `lucide-react`.

Nao serao utilizados `useContext`, `useRef`, `useReducer`, custom hooks, Redux, Zustand, React Query, Axios ou bibliotecas de UI. A arquitetura tambem nao cria uma pasta `routes/`: a configuracao do roteador pertence ao `App.jsx`, conforme a arvore oficial do projeto.

## 2. Mapeamento da Estrutura

A estrutura de entrega deve permanecer exatamente assim:

```text
proximo-tv-time/
├── docs/
│   ├── references/
│   │   ├── references.md
│   │   └── imagens/
│   ├── requirements.md
│   └── architecture.md
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

### Diretorios e arquivos

| Caminho | Responsabilidade |
| --- | --- |
| `docs/` | Documentacao funcional, tecnica e visual do produto. |
| `docs/references/` | Registro das referencias de interface e das decisoes de UX. |
| `docs/references/references.md` | Explica as influencias de TV Time, Netflix, Spotify e Letterboxd. |
| `docs/references/imagens/` | Armazena as imagens usadas como referencia visual, sem participar do bundle da aplicacao. |
| `docs/requirements.md` | Regras obrigatorias, whitelist, blacklist, escopo e criterios de aceitacao. |
| `docs/architecture.md` | Este documento: estrutura, rotas, componentes, estado, API e estilo. |
| `src/` | Codigo-fonte da aplicacao React. |
| `src/components/` | Componentes reutilizaveis. Cada componente deve ter sua propria pasta, seguindo `Nome/Nome.jsx` e `Nome/Nome.css`. |
| `src/pages/` | Telas associadas as rotas: Home, Detalhes, Busca e Perfil. As paginas orquestram componentes e dados da tela, sem concentrar estilos globais. |
| `src/App.jsx` | Compoe o roteador Data API e fornece o `RouterProvider` para toda a aplicacao. |
| `src/main.jsx` | Ponto de entrada do React; importa o CSS global e renderiza `<App />` no elemento raiz do HTML. |
| `src/index.css` | Tokens visuais globais, reset, tipografia, layout base e regras responsivas. |
| `.gitignore` | Impede o versionamento de dependencias, arquivos de ambiente, builds e outros artefatos locais. |
| `package.json` | Metadados, scripts e dependencias, incluindo React, `react-router-dom` e `lucide-react`. |
| `README.md` | Instrucoes de instalacao, execucao, configuracao da chave TMDB e visao geral do projeto. |

### Regra de componentes

Todo componente compartilhado deve seguir o padrao de uma pasta por componente:

```text
src/components/HeroBanner/
├── HeroBanner.jsx
└── HeroBanner.css
```

O JSX importa somente o CSS do proprio componente. O `index.css` fica reservado para regras globais; estilos especificos nao devem ser acumulados nele.

## 3. Roteamento com React Router Data API

O `App.jsx` define o objeto do roteador com `createBrowserRouter` e o entrega ao React por meio de `RouterProvider`. As telas podem ser implementadas dentro de `src/pages/`, e os componentes de interface ficam em `src/components/`.

### Mapa de rotas

| Rota | Tela | Acesso | Funcao |
| --- | --- | --- | --- |
| `/` | `Home` | Publica | Exibe hero e fileiras de catalogo por genero. |
| `/midia/:id` | `Details` | Publica | Mostra poster, sinopse, metadados e acoes da midia selecionada. O id vem de `useParams`. |
| `/busca` | `Search` | Publica | Recebe o termo de busca e apresenta resultados de filmes e series. A navegacao programatica pode usar `useNavigate`. |
| `/perfil` | `Profile` | Privada | Exibe avatar, favoritos, vistos e estatisticas; deve ser envelopada por `PrivateRoute`. |

### Configuracao esperada no `App.jsx`

O exemplo abaixo define a responsabilidade do arquivo. Os nomes das paginas podem ser ajustados aos arquivos concretos dentro de `src/pages/`, mantendo as mesmas rotas.

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Search from './pages/Search/Search'
import Profile from './pages/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/midia/:id',
    element: <Details />,
  },
  {
    path: '/busca',
    element: <Search />,
  },
  {
    path: '/perfil',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
```

`PrivateRoute` recebe a tela protegida por `children`. Ele consulta a sessao ou a existencia do perfil persistido e renderiza `children` quando o usuario esta autenticado. Caso contrario, usa `useNavigate` para direcionar o usuario ao fluxo de login definido pela aplicacao. Toda navegacao interna deve usar `Link` ou `useNavigate`; nao deve usar `<a href="...">` para rotas internas.

## 4. Arvore de Componentes e Contratos de Props

A pagina deve permanecer responsavel pela composicao. Os componentes recebem dados por props desestruturadas e nao dependem de estado global.

```text
App
├── RouterProvider
├── Home
│   ├── Header
│   ├── HeroBanner
│   └── GenreRow
│       └── MovieCard ou SeriesCard
├── Details
│   ├── Header
│   └── MovieCard ou SeriesCard (quando aplicavel)
├── Search
│   ├── Header
│   └── MovieCard ou SeriesCard
└── PrivateRoute
    └── Profile
        ├── Header
        ├── MovieCard ou SeriesCard
        └── StatsCard
```

### Componentes principais

| Componente | Props principais | Responsabilidade visual e funcional |
| --- | --- | --- |
| `HeroBanner` | `title`, `overview`, `backdropUrl`, `mediaId`, `onAction` | Banner de destaque no topo da Home, inspirado na Netflix. Usa imagem de fundo, sinopse curta e acao para abrir detalhes ou iniciar o acompanhamento. |
| `GenreRow` | `title`, `items`, `mediaType`, `onSelect` | Fileira horizontal inspirada na Netflix. Exibe o nome do genero e cards navegaveis, com rolagem horizontal em telas menores. |
| `SeriesCard` | `series`, `isWatched`, `likes`, `onToggleWatched` | Card de serie com poster e overlay inspirado no Letterboxd. O overlay pode mostrar olho para vistos, coracao para curtidas e titulo sem exigir a abertura dos detalhes. |
| `MovieCard` | `movie`, `isWatched`, `likes`, `onToggleWatched` | Versao para filmes com o mesmo sistema de poster e metricas sobrepostas, preservando a diferenca entre filme e serie no texto auxiliar. |
| `StatsCard` | `label`, `value`, `icon`, `detail` | Bloco de estatistica do perfil, inspirado no Spotify. Destaca quantidade de vistos, horas acompanhadas, favoritos ou progresso. O `icon` deve usar `lucide-react`. |
| `PrivateRoute` | `children` | Guarda a rota de perfil. Renderiza o conteudo recebido em `children` somente quando a sessao local for valida. |
| `Header` | `user`, `onSearch`, `onLogout` | Navegacao global, busca e acesso ao perfil. Links internos usam `Link`. |

### Uso de `children`

`children` deve ser usado para componentes que envelopam ou organizam conteudo, principalmente `PrivateRoute`. Isso permite que a protecao da rota seja independente da tela protegida:

```jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const profile = localStorage.getItem('tv-time-profile')

  useEffect(() => {
    if (!profile) {
      navigate('/')
    }
  }, [navigate, profile])

  return profile ? children : null
}
```

O redirecionamento com `useNavigate` deve permanecer dentro de `PrivateRoute`; nao duplicar a mesma regra em cada pagina privada. Em uma implementacao que precise evitar a leitura direta durante cada render, o perfil pode ser carregado em `useState` e sincronizado com `useEffect`, sem criar um custom hook.

## 5. Gerenciamento de Estado, TMDB e Persistencia

### Estado local

Cada pagina ou componente mantem somente o estado necessario ao seu proprio fluxo com `useState`, por exemplo:

- termo digitado e resultados da busca;
- item em destaque no `HeroBanner`;
- listas de filmes e series carregadas;
- estado de carregamento e mensagem de erro;
- filtros, pagina atual ou categoria selecionada;
- marcacao de item visto ou favorito.

Nao criar store global nem contexto. Quando um estado precisar subir na arvore, a pagina proprietaria controla o valor e passa dados e callbacks por props.

### Consumo do TMDB

As paginas que necessitam de dados usam `useEffect` para disparar `fetch` nativo. A chave deve vir de uma variavel de ambiente configurada conforme o `README.md`; ela nao deve ser gravada diretamente no JSX.

Fluxo recomendado:

1. Inicializar o estado da resposta como lista vazia e o estado de carregamento como verdadeiro.
2. Executar `fetch` para o endpoint do TMDB dentro de `useEffect`.
3. Converter a resposta com `response.json()` e guardar somente os dados necessarios em `useState`.
4. Tratar resposta invalida ou erro de rede com uma mensagem de estado.
5. Encerrar o carregamento tanto no sucesso quanto no erro.

O componente deve montar URLs de poster e backdrop a partir dos caminhos retornados pelo TMDB, usando uma constante de configuracao local. O estado de API nao deve ser confundido com o estado de persistencia do usuario.

### `localStorage`

O `localStorage` e a camada de persistencia simples para:

- perfil local do usuario, em uma chave como `tv-time-profile`;
- lista de ids vistos, em uma chave como `tv-time-watched`;
- favoritos ou curtidas, caso esse recurso seja habilitado, em uma chave separada.

`useEffect` pode sincronizar alteracoes de `useState` com o armazenamento. Ao inicializar uma pagina, os valores devem ser lidos do `localStorage`, tratados como JSON quando necessario e convertidos para um valor inicial seguro quando a chave nao existir. A persistencia e local e nao substitui autenticacao real de servidor.

## 6. Guia de Estilo em `src/index.css`

### Tokens globais

O arquivo deve declarar as cores obrigatorias no `:root`, mantendo o fundo grafite e o amarelo de identidade do TV Time:

```css
:root {
  --color-background: #121212;
  --color-surface: #1c1c1e;
  --color-yellow: #ffd000;
  --color-yellow-strong: #ffc107;
  --color-text: #f5f5f5;
  --color-text-muted: #a7a7ad;
  --color-border: #303034;
  --content-width: 1280px;
  --space-section: 2rem;
}
```

O `index.css` tambem deve conter:

- `box-sizing: border-box` e reset de margens essenciais;
- `body` com fundo `#121212`, texto claro e tipografia legivel;
- superfices e paineis usando `#1C1C1E`;
- estados de foco visiveis para teclado;
- estilos base para botoes, imagens e links;
- container com largura maxima e margem automatica;
- grid, flexbox e `gap` para evitar posicionamento fragil;
- transicoes discretas para hover de cards, botoes e links;
- regras para evitar overflow horizontal fora das fileiras de genero.

### Responsividade

O layout deve ser mobile-first. A Home usa fileiras horizontais com cards de dimensao estavel; o Hero reduz sua altura e o texto em telas estreitas; o perfil reorganiza favoritos e estatisticas de colunas para uma coluna; e o detalhe empilha poster e informacoes quando nao houver espaco.

As media queries devem priorizar estes comportamentos:

```css
.content-container {
  width: min(100% - 2rem, var(--content-width));
  margin-inline: auto;
}

@media (min-width: 768px) {
  .content-container {
    width: min(100% - 4rem, var(--content-width));
  }
}
```

Cards, botoes, barras de navegacao e fileiras devem conservar dimensoes previsiveis para que textos, icones e overlays nao causem deslocamentos. O amarelo `#FFD000` deve ser reservado para chamadas de acao, progresso, selecao e metricas importantes, mantendo contraste suficiente com os fundos escuros.

## 7. Limites de Implementacao

- Componentes funcionais devem usar nomes em PascalCase.
- Hooks permitidos: somente `useState` e `useEffect`, alem das APIs de roteamento listadas nos requisitos (`useParams` e `useNavigate`).
- Nao colocar declaracoes `const`, `let`, loops `for`/`while` ou `if` tradicional dentro das chaves do retorno JSX.
- Nao usar navegacao interna com `<a href>`.
- Manter cada componente pequeno, com responsabilidade unica e props explicitas.
- Evitar comentarios que apenas repitam o codigo; documentar somente decisoes arquiteturais que nao sejam obvias.
- Atualizar o `README.md` quando forem adicionadas variaveis de ambiente, scripts ou passos de execucao.

Essa organizacao mantem a interface visual alinhada as referencias de Netflix, Spotify e Letterboxd, sem perder as restricoes tecnicas definidas para o Novo TV Time.