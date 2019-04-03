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
var computador = false;

function validacao(tabuleiroVal, bdVal) {
  if (tabuleiroVal[0][0] == tabuleiroVal[1][1] && tabuleiroVal[1][1] == tabuleiroVal[2][2] && tabuleiroVal[2][2] != transparente) {
    console.log("1");
    if (bdVal) {
      return true;
    }
    estadoJogo = false;
  }
  else if (tabuleiroVal[0][2] == tabuleiroVal[1][1] && tabuleiroVal[1][1] == tabuleiroVal[2][0] && tabuleiroVal[0][2] != transparente) {
console.log("2");
    if (bdVal) {
      return true;
    }
    estadoJogo = false;
  }
  else {
    for (var i = 0; i < 3; i++) {
      if (tabuleiroVal[i][0] == tabuleiroVal[i][1] && tabuleiroVal[i][1] == tabuleiroVal[i][2] && tabuleiroVal[i][2] != transparente) {
        console.log("3");
        if (bdVal) {
          return true;
        }
        estadoJogo = false;
        break;
      }
      else if (tabuleiroVal[0][i] == tabuleiroVal[1][i] && tabuleiroVal[0][i] == tabuleiroVal[2][i] && tabuleiroVal[0][i] != transparente) {
        console.log("4");
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

function computadorAI() {
  switch (jogadas) {
    case 1:
        if (tabuleiro[1][1].src != imagemX) {
          tabuleiro[1][1].src = imagemO;
          jogador = 1;
          ++jogadas;
        }
        else {

        }
      break;
    case 3:
        var  a = false;
        for (var i = 0; i < 3; i++) {
          for (var y = 0; y < 3; y++) {
            var tabuleiroAI = copiarTabuleiros();
            if (tabuleiroAI[i][y] == transparente) {
              if (!a) {
                tabuleiroAI[i][y] = imagemX;
                if (validacao(tabuleiroAI, true)) {
                  tabuleiro[i][y].src = imagemO;
                  jogador = 1;
                  ++jogadas;
                  return;
                }
                if (i == 2 && y == 2) {
                  i = 0;
                  y = 0;
                  a = true;
                }
              }
              else {
                console.log(copiarTabuleiros());
                var tabuleiroAI2 = copiarTabuleiros();
                console.log(tabuleiroAI2);
                tabuleiroAI2[i][y] = imagemO;
                for (var q = 0; q < 3; q++)  {
                  for (var w = 0; w < 3; w++) {
                    if (tabuleiroAI2[q][w] == transparente) {
                      tabuleiroAI2[q][w] = imagemO;
                      if (validacao(tabuleiroAI2, true)) {
                        tabuleiro[i][y].src = imagemO;
                        jogador = 1;
                        ++jogadas;
                        return;
                      }
                    }
                    console.log("q: " + q);
                    console.log("w: " + w);
                    if (q == 2 && w == 2) {
                      console.log("a");
                    }
                  }
                }
              }
            }
          }
        }
      break;
  }
}

function mudarImagem(quadrado) {
  if (estadoJogo) {
    if (jogador == 1 && quadrado.src == transparente) {
      quadrado.src = imagemX;
      validacao(copiarTabuleiros(), false);
      if (!computador) {
        jogador = 2;
      }
      else {
        computadorAI();
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
    computador = true;
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
