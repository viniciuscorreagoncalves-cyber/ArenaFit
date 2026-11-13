// =====================================================
// JAVASCRIPT COMPLETO - ARENAFIT
// Funcionalidades aplicadas ao formulário de matrícula:
// 1. Máscara automática para telefone
// 2. Máscara automática para CPF
// 3. Validação dos dígitos do CPF
// 4. Verificação da data de nascimento
// 5. Confirmação do envio do formulário
//
// Observação: este formulário é demonstrativo. Os dados
// não são armazenados em banco de dados nem enviados
// para um servidor.
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const telefone = document.getElementById("telefone");
  const cpf = document.getElementById("cpf");
  const formulario = document.getElementById("form-matricula");
  const nascimento = document.getElementById("nascimento");

  // -----------------------------
  // MÁSCARA DO TELEFONE
  // Exemplo: (18) 99999-9999
  // -----------------------------
  if (telefone) {
    telefone.addEventListener("input", function () {
      let numeros = telefone.value.replace(/\D/g, "").slice(0, 11);

      if (numeros.length > 10) {
        numeros = numeros.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
      } else if (numeros.length > 6) {
        numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (numeros.length > 2) {
        numeros = numeros.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
      }

      telefone.value = numeros;
    });
  }

  // -----------------------------
  // MÁSCARA DO CPF
  // Exemplo: 000.000.000-00
  // -----------------------------
  if (cpf) {
    cpf.addEventListener("input", function () {
      let numeros = cpf.value.replace(/\D/g, "").slice(0, 11);

      numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
      numeros = numeros.replace(/(\d{3})(\d)/, "$1.$2");
      numeros = numeros.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

      cpf.value = numeros;
    });
  }

  // -----------------------------
  // VALIDAÇÃO DOS DÍGITOS DO CPF
  // -----------------------------
  function cpfValido(valor) {
    const numero = valor.replace(/\D/g, "");

    if (numero.length !== 11 || /^(\d)\1{10}$/.test(numero)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += Number(numero.charAt(i)) * (10 - i);
    }

    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10) primeiroDigito = 0;

    if (primeiroDigito !== Number(numero.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += Number(numero.charAt(i)) * (11 - i);
    }

    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10) segundoDigito = 0;

    return segundoDigito === Number(numero.charAt(10));
  }

  // -----------------------------
  // IMPEDIR DATA DE NASCIMENTO FUTURA
  // -----------------------------
  if (nascimento) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    nascimento.max = `${ano}-${mes}-${dia}`;
  }

  // -----------------------------
  // VALIDAÇÃO E CONFIRMAÇÃO
  // -----------------------------
  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const telefoneNumeros = telefone ? telefone.value.replace(/\D/g, "") : "";
      const cpfInformado = cpf ? cpf.value : "";

      if (cpf && !cpfValido(cpfInformado)) {
        alert("CPF inválido. Confira os números digitados.");
        cpf.focus();
        return;
      }

      if (telefone && telefoneNumeros.length < 10) {
        alert("Digite um telefone válido com DDD.");
        telefone.focus();
        return;
      }

      if (nascimento && nascimento.value) {
        const dataEscolhida = new Date(`${nascimento.value}T00:00:00`);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataEscolhida > hoje) {
          alert("A data de nascimento não pode ser futura.");
          nascimento.focus();
          return;
        }
      }

      alert(
        `Parabéns, ${nome}! Sua matrícula foi preenchida com sucesso. ` +
        "Esta é uma confirmação demonstrativa; os dados não foram armazenados."
      );

      formulario.reset();
    });
  }
});
