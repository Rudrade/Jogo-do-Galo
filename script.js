var tabuleiro = [
  [document.getElementById("00"), document.getElementById("01"), document.getElementById("02")],
  [document.getElementById("10"), document.getElementById("11"), document.getElementById("12")],
  [document.getElementById("20"), document.getElementById("21"), document.getElementById("22")]
];
var jogador = 1;
const imagemX = document.getElementById("x").src;
const imagemO = document.getElementById("o").src;
const transparente = document.getElementById("00").src;
var estadoJogo = true;
var pontuacaoJ1 = 0, pontuacaoJ2 = 0, pontuacaoE = 0;
var jogadas = 0;
var comp = false;
var imagemInicial;

function computador() {
  console.log("jogadas: " + jogadas);
  if (jogadas == 1) {
    if (tabuleiro[0][0].src == imagemX || tabuleiro[0][2].src == imagemX || tabuleiro[2][0].src == imagemX || tabuleiro[2][2].src == imagemX) {
      tabuleiro[1][1].src = imagemO;
      jogadas++;
      imagemInicial = tabuleiro[1][1];
    }
  } else {
    T:if (imagemInicial == tabuleiro[1][1]) {
      for (var column = 0; column < 3; column++) {
        for (var row = 0; row < 3; row++) {
          if (tabuleiro[column][row].src == transparente) {
            var tab = copiarTabuleiros();
            tab[column][row] = imagemO;
            if (validacao(tab, true)) {
              tabuleiro[column][row].src = imagemO;
              validacao(tabuleiro, false);
              break T;
            }
          }
        }
      }
      for (var column = 0; column < 3; column++) {
        for (var row = 0; row < 3; row++) {
          if (tabuleiro[column][row].src == transparente) {
            var tab = copiarTabuleiros();
            tab[column][row] = imagemX;
            if (validacao(tab, true)) {
              tabuleiro[column][row].src = imagemO;
              validacao(tabuleiro, false);
              break T;
            }
          }
        }
      }
      for (var column = 0; column < 3; column++) {
        for (var row = 0; row < 3; row++) {
          if (tabuleiro[column][row].src == transparente) {
            tabuleiro[column][row].src = imagemO;
            validacao(tabuleiro, false);
            break T;
          }
        }
      }
    }
  }
  jogador = 1;
  document.getElementById("turnoI").src = imagemX;
}

function validacao(tabuleiroVal, bdVal) {
  if (tabuleiroVal[0][0] == tabuleiroVal[1][1] && tabuleiroVal[1][1] == tabuleiroVal[2][2] && tabuleiroVal[2][2] != transparente) {
    if (bdVal) {
      return true;
    }
    estadoJogo = false;
  } else if (tabuleiroVal[0][2] == tabuleiroVal[1][1] && tabuleiroVal[1][1] == tabuleiroVal[2][0] && tabuleiroVal[0][2] != transparente) {
    if (bdVal) {
      return true;
    }
    estadoJogo = false;
  } else {
    for (var i = 0; i < 3; i++) {
      if (tabuleiroVal[i][0] == tabuleiroVal[i][1] && tabuleiroVal[i][1] == tabuleiroVal[i][2] && tabuleiroVal[i][2] != transparente) {
        if (bdVal) {
          return true;
        }
        estadoJogo = false;
        break;
      } else if (tabuleiroVal[0][i] == tabuleiroVal[1][i] && tabuleiroVal[0][i] == tabuleiroVal[2][i] && tabuleiroVal[0][i] != transparente) {
        if (bdVal) {
          return true;
        }
        estadoJogo = false;
        break;
      }
    }
  }
  if (bdVal) {
    return false;
  }
  if (estadoJogo) {
    ++jogadas;
    if (jogadas == 9) {
      document.getElementById("totalE").innerHTML = ++pontuacaoE;
      estadoJogo = false;
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

function copiarTabuleiros() {
  var tabuleiroAI = [
    [tabuleiro[0][0].src, tabuleiro[0][1].src, tabuleiro[0][2].src],
    [tabuleiro[1][0].src, tabuleiro[1][1].src, tabuleiro[1][2].src],
    [tabuleiro[2][0].src, tabuleiro[2][1].src, tabuleiro[2][2].src]
  ];
  return tabuleiroAI;
}

function mudarImagem(quadrado) {
  if (estadoJogo) {
    if (jogador == 1 && quadrado.src == transparente) {
      quadrado.src = imagemX;
      validacao(copiarTabuleiros(), false);
      if (!comp) {
        jogador = 2;
      } else {
        computador();
      }
      document.getElementById("turnoI").src = imagemO;
    }
    else if (jogador == 2 && quadrado.src == transparente) {
      quadrado.src = imagemO;
      validacao(copiarTabuleiros(), false);
      jogador = 1;
      document.getElementById("turnoI").src = imagemX;
    }
  }
}

function recomecar() {
  jogador = 1;
  jogadas = 0;
  estadoJogo = true;

  for (var i = 0; i < 3; i++) {
    for (var y = 0; y < 3; y++) {
      tabuleiro[i][y].src = transparente;
    }
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

  document.getElementById("computador").addEventListener("click", function() {
    recomecar();
    jogador = 1;
    comp = true;
    estadoJogo = true;
    jogadas = 0;
  });

  document.getElementById("reset").addEventListener("click", function () {
    recomecar();
  });

  document.getElementById("total1").innerHTML = pontuacaoJ1;
  document.getElementById("total2").innerHTML = pontuacaoJ2;
  document.getElementById("totalE").innerHTML = pontuacaoE;

  console.log("Javascript carregado.");
}
