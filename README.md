# Verona - Portfolio 2027

Portfólio de João Verona: edição de vídeo, motion graphics, formação em Ciência da Computação e projetos que conectam IA e produção criativa.

Site estático com navegação horizontal no desktop, scroll vertical para avançar, leitura vertical no celular e versões em inglês e português.

## Visualizar localmente

```sh
npm run dev
```

Abra http://localhost:4173. Requer Python 3 para o servidor local.

## Gerar a versão de produção

```sh
npm run build
npm run preview
```

O build usa somente APIs nativas do Node.js e gera `dist/`, preservando também os arquivos existentes em `public/`, incluindo os vídeos. Não é necessário instalar dependências para gerar o site estático.

Os arquivos ativos do site são `index.html`, `style.css`, os scripts JavaScript na raiz e `assets/`. O código anterior em `src/` permanece no repositório como referência e não participa do build atual.

Contato: joao@verona.media
