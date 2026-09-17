# TV Time

## Nome do produto

TV Time

## Integrantes do grupo

- Murilo Castro Chialastri
- Gabriel Brito Braga
- Hiago Silva de Oliveira

## Problema

Muitas pessoas têm dificuldade em organizar o que assistiram, descobrir novos filmes e séries relevantes e acompanhar seus hábitos de consumo em um único lugar. Além disso, plataformas de recomendação e catalogação costumam estar fragmentadas e pouco intuitivas.

## Solução

O TV Time foi criado para centralizar a descoberta de conteúdos, permitir a busca por filmes e séries, guardar o histórico de itens assistidos e apresentar estatísticas pessoais de forma visual e prática. A proposta é oferecer uma experiência moderna inspirada em plataformas de streaming, com navegação simples e foco em organização do consumo de mídia.

## Tecnologias

- React
- Vite
- JavaScript
- React Router DOM
- TMDB API
- CSS personalizado
- localStorage
- Lucide React

## API usada

- TMDB (The Movie Database)

A aplicação utiliza a API do TMDB para buscar filmes, séries, destaques e informações detalhadas de cada item exibido na interface.

## Funcionalidades

- Página inicial com banner principal e trilhos por gênero
- Busca por títulos de filmes e séries
- Visualização de detalhes de cada conteúdo
- Marcação de itens como assistidos
- Persistência dos itens assistidos no localStorage
- Página de perfil com estatísticas pessoais
- Visual design em tema escuro com estética de streaming
- Navegação entre Home, Busca, Detalhes e Perfil

## Uso de IA

A equipe utilizou ferramentas de inteligência artificial para auxiliar no processo de desenvolvimento, incluindo:

- geração e organização de ideias para a estrutura do projeto
- ajuda na criação de componentes e na arquitetura da interface
- revisão de textos e documentação
- apoio na organização de requisitos e melhorias de usabilidade
- suporte na escrita do README e documentação técnica

O uso de IA serviu como apoio para produtividade e refinamento do projeto, sem substituir a tomada de decisão do grupo.

## Instruções de execução do projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Passo a passo

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cod TV-Time
```

2. Acesse a pasta do projeto:

```bash
cd TV-Time
```

3. Instale as dependências:

```bash
npm install
```

4. Configure a variável de ambiente da API do TMDB no arquivo `.env` na raiz do projeto:

```env
VITE_TMDB_TOKEN=sua_chave_aqui
```

5. Inicie o projeto:

```bash
npm run dev
```

6. Abra o endereço exibido no terminal no navegador.

### Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Observações

- O projeto foi desenvolvido como MVP.
- A autenticação e os dados de catálogo são obtidos pela API do TMDB.
- O histórico pessoal fica salvo no navegador via localStorage.
- A navegação interna utiliza React Router.

## Licença

Projeto desenvolvido para fins acadêmicos e de estudo.
