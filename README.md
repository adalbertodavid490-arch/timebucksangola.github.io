# TimeBucks — Website Promocional

Website moderno, responsivo e 100% estático para promover a plataforma TimeBucks.

## Conteúdo do projeto

```
.
├── index.html                 # Página principal (HTML5 + SEO + Open Graph)
├── style.css                  # Estilos, animações e responsividade
├── script.js                  # Interatividade e animações
├── README.md                  # Este ficheiro
├── .nojekyll                  # Necessário para GitHub Pages servir a pasta assets
└── assets/
    ├── fonts/                 # Sora + Plus Jakarta Sans (local, sem CDN)
    │   ├── google-fonts.css
    │   └── *.woff2
    ├── fontawesome/           # Font Awesome 6.5.2 (local, sem CDN)
    │   ├── css/all.min.css
    │   └── webfonts/*
    └── images/
        └── og-timebucks.jpg   # Imagem Open Graph
```

Não existem dependências externas obrigatórias: fontes e ícones estão incluídos
localmente, pelo que o site funciona offline e no GitHub Pages sem configuração extra.

## Abrir no Visual Studio Code

1. Extraia o ZIP.
2. Abra a pasta no VS Code (`Ficheiro > Abrir Pasta`).
3. Instale a extensão **Live Server** (opcional) e clique em `Go Live`,
   ou abra `index.html` diretamente no navegador.

Nenhum processo de build, npm ou instalação de dependências é necessário.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os ficheiros para a raiz do repositório:

```bash
git init
git add .
git commit -m "Add TimeBucks promotional website"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

3. No GitHub: **Settings > Pages**.
4. Em **Source**, escolha `Deploy from a branch`.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Guarde e aguarde o link: `https://SEU-USUARIO.github.io/SEU-REPO/`.

O ficheiro `.nojekyll` já está incluído para garantir que a pasta `assets/`
é servida corretamente.

### Domínio personalizado (opcional)

Em **Settings > Pages > Custom domain**, indique o seu domínio e crie os
registos DNS indicados pelo GitHub.

## Personalização rápida

- **Link de afiliado**: procure `https://timebucks.com/?refID=229706467` em
  `index.html` e substitua pelo seu link.
- **Cores**: edite as variáveis no topo de `style.css` (`:root`).
- **Textos**: edite diretamente `index.html`.
- **Logo**: ajuste `.brand-mark` e `.brand-text` em `index.html`.

## Aviso

Este website é promocional e independente da TimeBucks. Não representa a
plataforma oficial e não garante ganhos. As oportunidades e recompensas variam
conforme a disponibilidade, localização e condições de cada atividade.

## Créditos

- Fontes: Google Fonts (Sora, Plus Jakarta Sans) — SIL Open Font License.
- Ícones: Font Awesome 6.5.2 Free — CC BY 4.0 / SIL OFL 1.1 / MIT.
- Imagem Open Graph: Unsplash.
