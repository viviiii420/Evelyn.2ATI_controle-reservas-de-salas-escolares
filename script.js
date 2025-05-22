const salas = [];

// Função auxiliar para validar número inteiro positivo
function ehInteiroPositivo(valor) {
  return Number.isInteger(valor) && valor > 0;
}

// Função auxiliar para encontrar sala pelo número
function encontrarSala(numero) {
  return salas.find(sala => sala.numero === numero);
}

function cadastrarSala(numero, capacidade) {
  if (!ehInteiroPositivo(numero) || !ehInteiroPositivo(capacidade)) {
    alert("Número da sala e capacidade devem ser inteiros positivos.");
    return false;
  }
  if (encontrarSala(numero)) {
    alert("Sala já cadastrada!");
    return false;
  }
  salas.push({ numero, capacidade, disponivel: true });
  alert(`Sala ${numero} cadastrada com sucesso.`);
  return true;
}

function listarSalas() {
  if (salas.length === 0) {
    console.log("Nenhuma sala cadastrada.");
    return [];
  }
  const listaFormatada = salas.map(({ numero, capacidade, disponivel }) =>
    `Sala ${numero} | Capacidade: ${capacidade} | Status: ${disponivel ? "Livre" : "Reservada"}`
  );
  listaFormatada.forEach(linha => console.log(linha));
  return listaFormatada;
}

function reservarSala(numero) {
  if (!ehInteiroPositivo(numero)) {
    alert("Número da sala inválido.");
    return false;
  }
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
  return true;
}

function liberarSala(numero) {
  if (!ehInteiroPositivo(numero)) {
    alert("Número da sala inválido.");
    return false;
  }
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
  return true;
}


