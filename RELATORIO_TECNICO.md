# Relatório Técnico - ArenaFit Academia

**Disciplina:** Design para Web II - Engenharia de Software (2.2026)
**Professor:** Evandro Cesar Estevam
**Integrantes:** _(preencher com os nomes do grupo)_
**Repositório:** https://github.com/viniciuscorreagoncalves-cyber/fitcode-academia

## 1. Apresentação do projeto

Site institucional da academia ArenaFit, com 5 páginas: Início, Modalidades, Planos, Estrutura e Matrícula. O objetivo é apresentar a academia, mostrar planos e horários e permitir que o visitante demonstre interesse pelo formulário de matrícula.

## 2. Tecnologias

HTML5, CSS3 (arquivo externo `Css/Style.css`) e JavaScript puro (`JavaScript_Completo/script.js` e `interface.js`). Sem frameworks ou bibliotecas.

## 3. Sprint 1 - Estrutura HTML

- 5 páginas com estrutura HTML5 completa (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Navegação entre todas as páginas.
- Formulário de matrícula com `fieldset`, campos de texto, e-mail, telefone, data, `select`, `radio` e `textarea`.
- Listas (página inicial e estrutura) e tabelas (planos e horários das aulas).
- Todas as páginas validadas no validador W3C, sem erros.

## 4. Sprint 2 - Estilização

- CSS em arquivo externo, sem estilo inline.
- Reset (`* { margin: 0; padding: 0; box-sizing: border-box; }`).
- Variáveis CSS em `:root` para cores, fonte, fundo e cartões.
- Hierarquia tipográfica de `h1` a `h3` e fonte Montserrat.
- Navegação estilizada com `:hover`.
- Pseudoclasses `:hover` e `:nth-child` e pseudoelementos `::before` e `::after`.
- Posicionamento `sticky` (menu), `relative` e `absolute` (detalhes dos cartões), `fixed` (modal).

## 5. Sprint 3 - Layout responsivo

- Flexbox no cabeçalho, menu e cartões.
- CSS Grid nos depoimentos e na página de modalidades.
- Abordagem Mobile First: o estilo base é o do celular e as media queries usam `min-width`.
- Breakpoints: 600px, 768px, 1024px e 1440px. Testado também em 320px.
- Transições e `transform` (`scale`, `translateY`) em cartões, botões e links, e animação `@keyframes aparecer`.
- Respeito à preferência `prefers-reduced-motion`.

## 6. Sprint 4 - JavaScript

**`script.js` (página de matrícula)**
- Máscaras de telefone e CPF.
- Validação dos dígitos verificadores do CPF.
- Bloqueio de data de nascimento futura.
- `preventDefault` no envio e mensagem de confirmação.

**`interface.js` (todas as páginas)**
- Menu mobile que abre e fecha no toque (botão hambúrguer).
- Modal de imagem: abre ao clicar na foto e fecha clicando fora, no botão × ou com a tecla ESC.
- Modo escuro com a escolha salva no navegador (`localStorage`).
- Uso de `querySelector` e `addEventListener`.

A confirmação da matrícula é demonstrativa: os dados não são enviados nem armazenados, pois não há servidor.

## 7. Trabalho em equipe (Git)

Repositório no GitHub com commits de todos os integrantes. Os conflitos de merge no `index.html` foram resolvidos mantendo a versão final do grupo.

| Integrante | Contribuição |
|---|---|
| _(nome)_ | _(preencher)_ |

## 8. Dificuldades e aprendizados

- Resolver conflitos de merge quando duas pessoas editam o mesmo arquivo.
- Tornar o menu usável no celular.
- Manter as cores legíveis no modo escuro usando variáveis CSS.

## 9. Possíveis melhorias

- Enviar a matrícula para um servidor e banco de dados.
- Galeria de fotos com navegação entre imagens no modal.
- Página de contato com mapa.
