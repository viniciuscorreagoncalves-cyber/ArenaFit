// =====================================================
// INTERFACE - ARENAFIT (carregado em todas as páginas)
// 1. Menu mobile (abre e fecha no toque)
// 2. Modal de imagem (fecha clicando fora ou com ESC)
// 3. Modo escuro (lembra a escolha do usuário)
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const botaoMenu = document.querySelector(".menu-toggle");
  const botaoTema = document.querySelector(".tema-toggle");
  const imagens = document.querySelectorAll("main img");

  // -----------------------------
  // MENU MOBILE
  // -----------------------------
  function fecharMenu() {
    nav.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  }

  if (nav && botaoMenu) {
    botaoMenu.addEventListener("click", function () {
      const aberto = nav.classList.toggle("aberto");
      botaoMenu.setAttribute("aria-expanded", String(aberto));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        fecharMenu();
      }
    });
  }

  // -----------------------------
  // MODO ESCURO
  // A escolha fica salva no navegador.
  // -----------------------------
  function aplicarTema(escuro) {
    document.body.classList.toggle("dark", escuro);

    if (botaoTema) {
      botaoTema.setAttribute("aria-checked", String(escuro));
    }
  }

  let temaSalvo = null;
  try {
    temaSalvo = localStorage.getItem("arenafit-tema");
  } catch (erro) {
    temaSalvo = null;
  }
  aplicarTema(temaSalvo === "escuro");

  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      const escuro = !document.body.classList.contains("dark");
      aplicarTema(escuro);

      try {
        localStorage.setItem("arenafit-tema", escuro ? "escuro" : "claro");
      } catch (erro) {
        // Sem armazenamento disponível: o tema vale só nesta visita.
      }
    });
  }

  // -----------------------------
  // MODAL DE IMAGEM
  // Clique na foto para ampliar.
  // Fecha clicando fora, no botão X ou com a tecla ESC.
  // -----------------------------
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Imagem ampliada");
  modal.hidden = true;

  const modalImg = document.createElement("img");
  modalImg.className = "modal-imagem";

  const botaoFechar = document.createElement("button");
  botaoFechar.type = "button";
  botaoFechar.className = "modal-fechar";
  botaoFechar.setAttribute("aria-label", "Fechar imagem");
  botaoFechar.textContent = "×";

  modal.append(modalImg, botaoFechar);
  document.body.appendChild(modal);

  function abrirModal(imagem) {
    modalImg.src = imagem.currentSrc || imagem.src;
    modalImg.alt = imagem.alt;
    modal.hidden = false;
    document.body.classList.add("modal-aberto");
    botaoFechar.focus();
  }

  function fecharModal() {
    modal.hidden = true;
    modalImg.removeAttribute("src");
    document.body.classList.remove("modal-aberto");
  }

  imagens.forEach(function (imagem) {
    imagem.classList.add("zoom");
    imagem.tabIndex = 0;

    imagem.addEventListener("click", function () {
      abrirModal(imagem);
    });

    imagem.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirModal(imagem);
      }
    });
  });

  modal.addEventListener("click", function (evento) {
    if (evento.target !== modalImg) {
      fecharModal();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !modal.hidden) {
      fecharModal();
    }
  });
});
