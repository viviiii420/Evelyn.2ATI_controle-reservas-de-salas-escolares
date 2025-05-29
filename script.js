// Array para armazenar as salas cadastradas
const salas = [];

// Função auxiliar para validar número inteiro positivo
function ehInteiroPositivo(valor) {
  return Number.isInteger(valor) && valor > 0;
}

// Função auxiliar para encontrar sala pelo número
function encontrarSala(numero) {
  return salas.find(sala => sala.numero === numero);
}

// Função para cadastrar uma nova sala
function cadastrarSala(numero, capacidade, status) {
  if (!ehInteiroPositivo(numero) || !ehInteiroPositivo(capacidade)) {
    alert("Número da sala e capacidade devem ser inteiros positivos.");
    return false;
  }
  if (encontrarSala(numero)) {
    alert("Sala já cadastrada!");
    return false;
  }
  salas.push({ numero, capacidade, disponivel: status === 'livre' });
  alert(`Sala ${numero} cadastrada com sucesso.`);
  atualizarTabelaSalas();
  return true;
}

// Função para reservar uma sala
function reservarSala(numero) {
  const sala = encontrarSala(numero);
  if (!sala) {
    alert("Sala não encontrada.");
    return false;
  }
  if (!sala.disponivel) {
    alert("Sala já está reservada!");
    return false;
  }
  sala.disponivel = false;
  alert(`Sala ${numero} reservada com sucesso.`);
  atualizarTabelaSalas();
  return true;
}

// Função para liberar uma sala
function liberarSala(numero) {
  const sala = encontrarSala(numero);
  if (!sala) {
    alert("Sala não encontrada.");
    return false;
  }
  if (sala.disponivel) {
    alert("Sala já está livre!");
    return false;
  }
  sala.disponivel = true;
  alert(`Sala ${numero} liberada com sucesso.`);
  atualizarTabelaSalas();
  return true;
}

// Função para atualizar a tabela de salas
function atualizarTabelaSalas() {
  const tabela = document.getElementById("tabelaSalas").getElementsByTagName('tbody')[0];
  tabela.innerHTML = ''; // Limpa o conteúdo atual da tabela

  salas.forEach(sala => {
    const novaLinha = tabela.insertRow();

    const celulaNumero = novaLinha.insertCell(0);
    celulaNumero.textContent = sala.numero;

    const celulaCapacidade = novaLinha.insertCell(1);
    celulaCapacidade.textContent = sala.capacidade;

    const celulaStatus = novaLinha.insertCell(2);
    celulaStatus.textContent = sala.disponivel ? 'Livre' : 'Reservada';

    const celulaAcoes = novaLinha.insertCell(3);
    if (sala.disponivel) {
      const btnReservar = document.createElement("button");
      btnReservar.textContent = "Reservar";
      btnReservar.className = "btn btn-reservar";
      btnReservar.onclick = () => reservarSala(sala.numero);
      celulaAcoes.appendChild(btnReservar);
    } else {
      const btnLiberar = document.createElement("button");
      btnLiberar.textContent = "Liberar";
      btnLiberar.className = "btn btn-liberar";
      btnLiberar.onclick = () => liberarSala(sala.numero);
      celulaAcoes.appendChild(btnLiberar);
    }
  });
}

// Função para lidar com o envio do formulário
document.getElementById("formSala").addEventListener("submit", function(event) {
  event.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const numero = parseInt(document.getElementById("numero").value);
  const capacidade = parseInt(document.getElementById("capacidade").value);
  const status = document.getElementById("status").value;
  const recursos = document.getElementById("recursos").value;

  if (tipo === 'especial' && !recursos) {
    alert("Por favor, informe os recursos da sala especial.");
    return;
  }

  cadastrarSala(numero, capacidade, status);
});
