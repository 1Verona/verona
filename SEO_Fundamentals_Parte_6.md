# SEO Fundamentals — Parte 6

INSTRUÇÕES TÉCNICAS OBRIGATÓRIAS: [cole bloco técnico]

## 251. Capítulo 9 — Métricas e Diagnóstico Profissional

### 252. Objetivo do diagnóstico profissional
Diagnóstico profissional em SEO existe para responder três perguntas, nesta ordem:
1. O site está sendo encontrado? (indexação + rankeamento)
2. O site está sendo escolhido? (CTR + cliques)
3. O site está gerando negócio? (conversão + receita)

Sem essa sequência, times entram em "achismo" e desperdiçam ciclos de execução. O framework é alinhado ao uso de Google Search Console e GA4 [S1][S2][S6].

### 253. Diagnóstico 1: "não rankeia"
Sintomas comuns:
- Impressões baixas ou inexistentes nas consultas-alvo.
- URLs estratégicas ausentes no índice.
- Queda abrupta após mudanças técnicas.

Checklist de diagnóstico:
- Confirmar indexação com `site:` e URL Inspection [S4].
- Revisar bloqueios em `robots.txt`, `noindex`, canonicals e status HTTP.
- Validar cobertura no relatório de indexação do Search Console [S3].
- Auditar rastreabilidade, links internos e sitemap atualizado [S3][S4].
- Revisar aderência aos Search Essentials (conteúdo útil, sem práticas de spam) [S1].

KPIs de controle:
- URLs válidas indexadas (% do total estratégico)
- Impressões orgânicas por cluster
- Posição média por grupo de intenção

### 254. Diagnóstico 2: "não clica"
Sintomas comuns:
- Impressões crescem, mas cliques não acompanham.
- CTR abaixo da média do próprio site para posições equivalentes.
- Páginas ranqueando fora do match de intenção.

Checklist de diagnóstico:
- Analisar relatório de Performance (consulta x página x país x device) [S2].
- Reescrever titles e meta descriptions orientados à intenção e diferencial.
- Testar variações de snippet por lote (2 a 4 semanas).
- Aumentar elegibilidade para rich results (quando aplicável).
- Corrigir problemas de experiência de página (CWV), que afetam competitividade [S5][S8].

KPIs de controle:
- CTR por faixa de posição (1-3, 4-10, 11-20)
- Cliques orgânicos por landing page
- Ganho de cliques após refresh de snippet

### 255. Diagnóstico 3: "não converte"
Sintomas comuns:
- Tráfego orgânico cresce, mas leads/vendas não.
- Alto bounce em páginas de entrada comercial.
- Usuário chega em páginas informacionais sem ponte para próxima ação.

Checklist de diagnóstico:
- Configurar eventos-chave e conversões no GA4 [S6].
- Separar intenção informacional, comercial e transacional no funil.
- Revisar oferta, CTA, prova social, velocidade e clareza de proposta.
- Criar caminhos internos entre conteúdo topo/meio/fundo de funil.
- Medir microconversões (scroll, clique em CTA, início de formulário).

KPIs de controle:
- Taxa de conversão orgânica (sessão -> lead/venda)
- Receita por sessão orgânica
- Conversão por tipo de página e por query intent

### 256. Painel mínimo de métricas (stack profissional)
- Search Console: impressões, cliques, CTR, posição média, cobertura [S2][S3].
- GA4: sessões orgânicas, eventos-chave, conversões e jornada [S6].
- PageSpeed/Lighthouse: LCP, INP, CLS e oportunidades técnicas [S8][S9].
- Planilha/BI: metas mensais, variações e backlog priorizado por impacto.

### 257. Processo mensal de SEO (ritmo operacional)
Semana 1 — Coleta e leitura de dados
- Extrair GSC por consulta, página e dispositivo.
- Exportar GA4 (sessões, conversões, receita) e cruzar com páginas de entrada.
- Levantar alertas técnicos (indexação, CWV, erros críticos).

Semana 2 — Priorização
- Classificar backlog em: impacto esperado x esforço x risco.
- Definir 3 a 5 apostas principais do mês (conteúdo, técnico, CTR, CRO).
- Estabelecer hipóteses com métrica de sucesso e janela de medição.

Semana 3 — Execução
- Implementar correções técnicas e melhorias de arquitetura interna.
- Publicar/atualizar conteúdos de maior potencial.
- Rodar otimizações de snippet em lote.

Semana 4 — Medição e aprendizado
- Comparar baseline vs resultado por hipótese.
- Documentar ganhos, perdas e efeitos colaterais.
- Atualizar playbook e preparar o próximo ciclo.

Cadência de governança:
- Reunião semanal de 30 minutos com responsáveis.
- Review mensal com decisão de manter, pausar ou escalar iniciativas.

### 258. Matriz de decisão rápida (diagnóstico -> ação)
- Não rankeia: prioridade em rastreabilidade/indexação + arquitetura + conteúdo base.
- Não clica: prioridade em SERP fit (snippet + intenção + diferenciação).
- Não converte: prioridade em UX, oferta, CTAs e alinhamento de funil.

---

## 259. Capítulo 10 — Carreira, Networking e Plano 90 Dias

### 260. Trilhas de carreira em SEO
Trilha 1: Generalista de crescimento
- Atua em conteúdo, técnico, analytics e CRO.
- Ideal para startups e times enxutos.

Trilha 2: Especialista técnico
- Foco em crawling, indexação, logs, CWV, arquitetura.
- Alto impacto em sites grandes e e-commerce.

Trilha 3: Conteúdo e estratégia
- Foco em pesquisa de demanda, topical authority, refresh editorial.
- Alto impacto em mídia, B2B e educação.

Trilha 4: Liderança SEO
- Gestão de roadmap, stakeholders, orçamento e metas.
- Traduz SEO em resultado de negócio.

### 261. Networking estratégico: comunidades BR e internacionais
Comunidades BR (para aprendizado e conexão):
- Search Central Live Brasil (ecossistema oficial Google no país) [S12].
- SEO Summit Brasil (networking com profissionais e empresas do mercado) [S13].
- São Paulo SEO Meetup (encontros presenciais de praticantes) [S14].

Comunidades internacionais:
- Google Search Central Help Community [S11].
- Women in Tech SEO (Slack) [S15].
- Traffic Think Tank (comunidade privada) [S16].
- WebmasterWorld (fórum histórico de webmasters/SEO) [S17].
- Reddit r/SEO (troca prática e casos reais) [S18].

Regra prática de networking profissional:
- 70% contribuir (responder, compartilhar teste, dar feedback).
- 20% aprender (acompanhar discussões técnicas e tendências).
- 10% pedir ajuda (com contexto e dados).

### 262. 30 canais YouTube de SEO separados por nível
Nível Iniciante (1-10):
1. Google Search Central
2. Ahrefs
3. Semrush
4. Neil Patel
5. Moz
6. HubSpot Marketing
7. Income School
8. Surfside PPC
9. Matt Diggity
10. Authority Hacker

Nível Intermediário (11-20):
11. Crawling Mondays by Aleyda Solis
12. Search Engine Journal
13. Yoast
14. Marie Haynes
15. Content and Conversation (FATJOE)
16. Craig Campbell SEO
17. Adam Enfroy
18. Chris Palmer SEO
19. SEO Fight Club
20. Search News You Can Use (Marie Haynes)

Nível Avançado (21-30):
21. iPullRank
22. Zyppy
23. Tech SEO Pro
24. SEO Office Hours Shorts (Search Central)
25. Detailed (Glen Allsopp)
26. Omniscient Digital
27. SEOtesting
28. Blue Array SEO
29. Scheming Schemas
30. Majestic

Critério de uso por senioridade:
- Iniciante: fundamentos + consistência de execução.
- Intermediário: diagnóstico, processos e testes controlados.
- Avançado: escala, automação, experimentação e estratégia de negócio.

### 263. Plano de evolução semana a semana (90 dias)
Semana 1
- Setup completo de GSC + GA4 + dashboard base.
- Definir 20 keywords estratégicas e 10 páginas prioritárias.

Semana 2
- Auditoria técnica inicial (indexação, status code, sitemap, canonicals).
- Corrigir erros críticos de rastreio.

Semana 3
- Mapear intenção de busca por cluster.
- Reescrever 10 titles e meta descriptions de páginas-chave.

Semana 4
- Publicar 2 conteúdos de base e atualizar 3 páginas antigas.
- Medir variação de impressões e CTR.

Semana 5
- Melhorar links internos entre páginas de topo e fundo de funil.
- Criar blocos de CTA contextual.

Semana 6
- Rodar otimização de Core Web Vitals nas páginas mais acessadas.
- Validar ganhos com PageSpeed/Lighthouse.

Semana 7
- Implementar dados estruturados relevantes ao tipo de página.
- Revisar elegibilidade de rich results.

Semana 8
- Revisão de conteúdo com queda (refresh editorial orientado a intenção).
- Consolidar páginas canibalizadas.

Semana 9
- Construir relatório executivo: rankeamento, cliques, conversão, receita.
- Apresentar hipóteses do próximo ciclo.

Semana 10
- Novo lote de otimização de snippets e CTAs.
- Testar melhoria de copy nas páginas comerciais.

Semana 11
- Benchmark competitivo (temas, formatos, lacunas de conteúdo).
- Planejar próximos 60 dias com backlog priorizado.

Semana 12
- Reprocessar diagnóstico: não rankeia / não clica / não converte.
- Documentar aprendizados replicáveis.

Semana 13 (fechamento dos 90 dias)
- Consolidar resultados do trimestre.
- Definir metas do próximo ciclo: tráfego qualificado, conversão e eficiência.

### 264. Plano de carreira em 3 níveis (aplicação prática)
Nível Júnior (0-12 meses)
- Meta: dominar fundamentos, ferramentas e rotina mensal.
- Entrega esperada: relatórios consistentes e melhorias de base.

Nível Pleno (1-3 anos)
- Meta: liderar diagnósticos e projetos ponta a ponta.
- Entrega esperada: crescimento de tráfego qualificado e conversão.

Nível Sênior/Lead (3+ anos)
- Meta: escalar operações e alinhar SEO ao P&L.
- Entrega esperada: previsibilidade de resultado e formação de time.

### 265. Bibliografia e fontes citadas
[S1] Google Search Essentials
https://developers.google.com/search/docs/essentials

[S2] Search Console Performance Reports
https://support.google.com/webmasters/answer/7576553

[S3] Search Console Page Indexing Report
https://support.google.com/webmasters/answer/7440203

[S4] Why is my page missing from Google Search?
https://support.google.com/webmasters/answer/7474347

[S5] Core Web Vitals report (Search Console)
https://support.google.com/webmasters/answer/10218333

[S6] Google Analytics: key events and conversions (GA4/Google Ads integration)
https://support.google.com/analytics/answer/10632359

[S7] SEO Starter Guide
https://developers.google.com/search/docs/fundamentals/seo-starter-guide

[S8] About PageSpeed Insights
https://developers.google.com/speed/docs/insights/v5/about

[S9] Lighthouse in Chrome DevTools
https://developer.chrome.com/docs/devtools/lighthouse/

[S10] Google Search Help and Support (Search Central)
https://developers.google.com/search/help

[S11] Google Search Central Help Community
https://support.google.com/webmasters/community

[S12] Search Central Live Brazil (Google Search Central Blog)
https://developers.google.com/search/blog/2025/01/search-central-live-brazil

[S13] SEO Summit Brasil
https://seosummit.com.br/

[S14] São Paulo SEO Meetup
https://www.meetup.com/topics/fundamentals-of-search-engine-optimization/br/

[S15] Women in Tech SEO (Join Community)
https://www.womenintechseo.com/join/

[S16] Traffic Think Tank
https://trafficthinktank.com/

[S17] WebmasterWorld Forums
https://www.webmasterworld.com/

[S18] Reddit r/SEO
https://www.reddit.com/r/SEO/

