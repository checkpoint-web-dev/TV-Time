# Referências Visuais e Decisões de Design (UI/UX)

Este documento detalha as referências de produtos digitais utilizadas para fundamentar as decisões de interface, layout, paleta de cores e experiência do usuário (UX) do **Novo TV Time**.

---

### Paleta de Cores e Identidade Visual: TV Time Clássico
* **Imagem de Referência:** `print-tvtime.png`
* **Estilização e Tema:** Fundo Dark escuro/grafite (`#121212` / `#1C1C1E`) com detalhes e destaques no amarelo vibrante signature do TV Time (`#FFD000` / `#FFC107`).
* **Aplicação:** Botões de ação, badges de episódios vistos, barras de progresso, contadores de tempo e destaques no menu.

---

### Referência 1: Netflix (Navegação Organizacional por Gêneros)
* **Imagem de Referência:** `print-netflix.png`
* **Elemento Utilizado:** Hero Banner de destaque no topo e listas/carrosséis horizontais categorizados por gêneros (Ação, Drama, Comédia, Em Alta, Continuar Assistindo).
* **Onde foi Aplicado:** Página principal (`Home.jsx`).
* **Justificativa de Design:** Organização familiar e fluida que melhora a navegabilidade, permitindo ao usuário explorar o catálogo por categorias sem sobrecarregar a tela.

---

### Referência 2: Spotify (Layout de Perfil e Seção de Favoritos)
* **Imagem de Referência:** `print-spotify.png`
* **Elemento Utilizado:** Cabeçalho de perfil com avatar e nome em grande escala, seguido por vitrines de itens favoritos (séries/filmes em destaque) e estatísticas acumuladas.
* **Onde foi Aplicado:** Rota privada do perfil (`Perfil.jsx`).
* **Justificativa de Design:** Layout minimalista que valoriza o progresso do usuário, colocando seus títulos favoritos e estatísticas em evidência imediata.

---

### Referência 3: Letterboxd (Cards com Overlay de Métricas)
* **Imagem de Referência:** `print-letterboxd.png`
* **Elemento Utilizado:** Cards de pôsteres com indicadores visuais sobrepostos (ícone de olho para episódios/mídias vistas e ícone de coração com contagem de curtidas).
* **Onde foi Aplicado:** Componentes `SeriesCard.jsx` e `MovieCard.jsx`.
* **Justificativa de Design:** Feedback visual imediato diretamente sobre a capa da mídia, permitindo identificar o status e popularidade do título sem precisar abrir os detalhes.