var tabuleiro = [
  [document.getElementById("00"), document.getElementById("01"), document.getElementById("02")],
  [document.getElementById("10"), document.getElementById("11"), document.getElementById("12")],
  [document.getElementById("20"), document.getElementById("21"), document.getElementById("22")]
];
var jogador = 1;
var imagemX = document.getElementById("x").src;
var imagemO = document.getElementById("o").src;
var transparente = document.getElementById("00").src;
var estadoJogo = 1;
var pontuacaoJ1 = 0, pontuacaoJ2 = 0, pontuacaoE = 0;
var jogadas = 0;
var computador = 0;

//267
function validacao(jogador) {
  if (tabuleiro[0][0].src == tabuleiro[1][1].src && tabuleiro[1][1].src == tabuleiro[2][2].src && tabuleiro[2][2].src != transparente) {
    estadoJogo = 0;
  }
  else if (tabuleiro[0][2].src == tabuleiro[1][1].src && tabuleiro[1][1].src == tabuleiro[2][0].src && tabuleiro[0][2].src != transparente) {
    estadoJogo = 0;
  }
  else {
    for (var i = 0; i < 3; i++) {
      if (tabuleiro[i][0].src == tabuleiro[i][1].src && tabuleiro[i][1].src == tabuleiro[i][2].src && tabuleiro[i][2].src != transparente) {
        estadoJogo = 0;
        break;
      }
      else if (tabuleiro[0][i].src == tabuleiro[1][i].src && tabuleiro[0][i].src == tabuleiro[2][i].src && tabuleiro[0][i].src != transparente) {
        estadoJogo = 0;
        break;
      }
    }
  }

  if (estadoJogo == 1) {
    jogadas++;
    if (jogadas == 9) {
      document.getElementById("totalE").innerHTML = ++pontuacaoE;
      estadoJogo = 0;
    }
  }
  else {
    if (jogador == 1) {
      document.getElementById("total1").innerHTML = ++pontuacaoJ1;
    }
    else {
      document.getElementById("total2").innerHTML = ++pontuacaoJ2;
    }
  }
}

function mudarImagem(quadrado) {
  if (estadoJogo == 1) {
    if (jogador == 1 && quadrado.src == transparente) {
      quadrado.src = imagemX;
      validacao(jogador);
      if (computador == 0) {
        jogador = 2;
      }
      else {
        computador(quadrado.id);
      }
      document.getElementById("turnoI").src = imagemO;
    }
    else if (jogador == 2 && quadrado.src == transparente) {
      quadrado.src = imagemO;
      validacao(jogador);
      jogador = 1;
      document.getElementById("turnoI").src = imagemX;
    }
  }
}

function recomecar() {
  jogador = 1;
  jogadas = 0;
  estadoJogo = 1;

  for (var i = 0; i < 3; i++) {
    for (var y = 0; y < 3; y++) {
      tabuleiro[i][y].src = transparente;
    }
  }
}

function computador(quadrado) {
  switch (jogadas) {
    case 0:
      tabuleiro[0][0].src = imagemO;
    break;
    case 2:
      for (var i = 0; i < 3; i++) {
        for (var y = 0; y < 3; y++) {
          if (tabuleiro[i][y].src = imagemX) {
            jogadaInicial = tabuleiro[i][y].id;
          }
        }
      }
    break;
  }
}

window.onload = function() {
  for (var i = 0; i < 3; i++) {
    for (var y = 0; y < 3; y++) {
      tabuleiro[i][y].addEventListener("click", function () {
        mudarImagem(this);
      });
    }
  }

  document.getElementById("reset").addEventListener("click", function () {
    recomecar();
  });

  document.getElementById("total1").innerHTML = pontuacaoJ1;
  document.getElementById("total2").innerHTML = pontuacaoJ2;
  document.getElementById("totalE").innerHTML = pontuacaoE;

  console.log("Javascript carregado.");
}
