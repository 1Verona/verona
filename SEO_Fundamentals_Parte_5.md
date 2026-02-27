# SEO Fundamentals — Parte 5

## 201. Capítulo 7 — SEO Técnico Aplicável

SEO técnico é o bloco de execução que garante rastreabilidade, indexação e elegibilidade de ranqueamento. Nesta etapa, o foco é remover barreiras de descoberta e interpretação por mecanismos de busca.

### 202. Auditoria em 30 minutos (roteiro prático)

**0–5 min: Status de indexação e cobertura**
- Verificar `site:seudominio.com` para sinais gerais de presença no índice.
- Abrir Google Search Console: relatório de indexação, páginas excluídas e motivos.
- Conferir alertas de ações manuais e problemas de segurança.

**5–10 min: Rastreamento técnico básico**
- Validar `robots.txt` (`/robots.txt`) e confirmar ausência de bloqueios acidentais em áreas críticas.
- Conferir sitemap XML (`/sitemap.xml`) e status de envio no Search Console.
- Checar códigos HTTP das páginas principais (200, 301, 404, 500).

**10–15 min: Renderização e JavaScript**
- Revisar páginas estratégicas com inspeção de URL no Search Console.
- Confirmar se conteúdo principal, links e metadados aparecem no HTML renderizado.
- Avaliar risco de conteúdo depender exclusivamente de JS sem fallback.

**15–20 min: Core Web Vitals e desempenho**
- Consultar PageSpeed Insights (mobile e desktop) nas páginas de maior tráfego.
- Priorizar LCP, INP e CLS com foco em template, não apenas em URL isolada.
- Identificar oportunidades rápidas: compressão de imagem, preload de recursos críticos, redução de scripts bloqueantes.

**20–25 min: Dados estruturados e canônicos**
- Validar marcação de Schema (quando aplicável) e erros no Search Console.
- Verificar `rel=canonical` e consistência entre versão canônica e indexável.
- Confirmar ausência de conflito entre canonical, noindex e redirecionamento.

**25–30 min: Arquitetura interna e prioridade de correção**
- Revisar profundidade de clique das páginas-chave (idealmente até 3 cliques).
- Mapear páginas órfãs e links internos quebrados.
- Fechar com backlog priorizado por impacto SEO × esforço técnico.

### 203. Tabela problema → causa → solução

| Problema | Causa provável | Solução recomendada |
|---|---|---|
| Página importante não indexa | `noindex`, canonical para outra URL ou bloqueio em `robots.txt` | Remover conflito de diretivas, ajustar canonical e solicitar reindexação no Search Console |
| Queda de tráfego após deploy | Alteração de rotas, títulos, canonicals ou status HTTP | Rodar checklist pós-release, restaurar mapeamento de URLs e validar redirecionamentos 301 |
| LCP alto em páginas de negócio | Imagem hero pesada, servidor lento, CSS/JS bloqueante | Otimizar imagem (formato moderno), melhorar cache/CDN e reduzir recursos críticos |
| Conteúdo não aparece para o Google | Renderização tardia por JS sem SSR/prerender | Implementar SSR/prerender híbrido e garantir conteúdo essencial no HTML inicial |
| Muitas URLs duplicadas | Parâmetros, filtros e variações sem canonical consistente | Definir canonical por cluster de páginas, normalizar parâmetros e ajustar links internos |
| Rich results não elegíveis | Dados estruturados incompletos ou inválidos | Corrigir propriedades obrigatórias, testar e monitorar validação no Search Console |
| Orçamento de rastreamento ineficiente | URLs de baixo valor rastreadas em excesso | Restringir padrões irrelevantes, fortalecer arquitetura e sitemap apenas com URLs úteis |

### 204. Checklist técnico aplicável (execução contínua)

- `Indexação`: páginas estratégicas indexáveis e sem conflitos de diretivas.
- `Rastreabilidade`: robots e sitemap alinhados com objetivos de negócio.
- `Performance`: Core Web Vitals em nível aceitável para templates críticos.
- `Arquitetura`: linkagem interna guiando autoridade para páginas de conversão.
- `Confiabilidade`: monitoramento de erros 4xx/5xx e regressões pós-release.

## 205. Capítulo 8 — Link Building Estratégico e Seguro

Link building sustentável prioriza relevância editorial, contexto temático e relacionamento real. O objetivo é ganhar autoridade sem violar políticas de spam.

### 206. Estratégias white-hat (seguras e escaláveis)

- **Digital PR orientado a dados**: publicar estudos, benchmarks e insights inéditos com potencial de citação.
- **Linkable assets**: criar páginas-recurso (guia, calculadora, template) que merecem referência orgânica.
- **Guest posting seletivo**: contribuir em sites confiáveis, com foco em valor do conteúdo e não em volume.
- **Co-marketing**: parcerias com marcas complementares para conteúdos conjuntos e distribuição cruzada.
- **Recuperação de menções sem link**: monitorar citações da marca e solicitar inclusão do link fonte.
- **Broken link building**: identificar links quebrados em páginas relevantes e sugerir conteúdo equivalente atualizado.
- **Reclamação de ativos próprios**: consolidar links para páginas corretas após mudanças de URL/migração.

### 207. Modelos de outreach (prontos para uso)

**Modelo 1 — Menção sem link**

Assunto: Atualização rápida na referência ao [Nome da Marca]

Olá, [Nome],

Vi que vocês citaram [Marca/Conteúdo] neste artigo: [URL]. Obrigado pela menção.

Para facilitar o acesso do leitor à fonte original, vocês podem adicionar este link?
[URL oficial]

Se preferir, também envio um trecho atualizado com dados de [ano].

Obrigado pelo excelente conteúdo,
[Seu nome]

**Modelo 2 — Broken link building**

Assunto: Link quebrado na página [Título da Página]

Olá, [Nome],

Durante uma leitura da página [URL], notei que este link parece indisponível: [URL quebrada].

Temos um material atualizado sobre o mesmo tema que pode servir como substituição:
[Seu URL]

Se ajudar, também posso sugerir outras fontes complementares.

Abraços,
[Seu nome]

**Modelo 3 — Pitch de ativo linkável**

Assunto: Recurso inédito para complementar seu conteúdo sobre [Tema]

Olá, [Nome],

Publicamos um material novo sobre [Tema], com [dado diferencial: pesquisa própria, benchmark, ferramenta].

Conteúdo: [URL]

Acredito que ele complementa bem seu artigo [URL do artigo alvo], especialmente na seção [X].

Se fizer sentido editorial, ficarei feliz em contribuir com contexto adicional.

Obrigado,
[Seu nome]

### 208. Governança de risco em link building

- Não comprar links com objetivo de manipular ranking.
- Não usar redes privadas de blogs (PBN) e automação massiva de baixa qualidade.
- Não escalar trocas recíprocas artificiais.
- Qualificar prospects por relevância temática, qualidade editorial e tráfego real.
- Mensurar por impacto composto: rankings, páginas de entrada, leads e receita assistida.

## 209. Referências oficiais do Google

- Google Search Essentials: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Search Essentials (políticas técnicas e de spam): https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Links rastreáveis (boas práticas técnicas): https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Sitemaps (visão geral): https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Robots.txt (introdução): https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Core Web Vitals e métricas de experiência: https://web.dev/vitals/
- Google Search Console (documentação): https://support.google.com/webmasters/

