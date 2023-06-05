//pages principais
const page_inicio = document.querySelector(".inicio");
const page_contra_maquina = document.querySelector(".jogar-contra-maquina");
const page_multiplayer = document.querySelector(".multiplayer");
const page_mensagem = document.querySelector(".mensagem");
const quadradao = document.querySelector(".quadradao");
const btn_inicio = document.querySelector(".botao-para-comecar");
//nomes
const nome_jogadores = document.querySelector(".jogadores");
const spans = document.querySelectorAll("span");
const p_mensagem_final = document.querySelector(".nomeDoVencedor");
const input_contra_maquina = document.querySelector("input#player");
const input_multiplayer_player1 = document.querySelector("input#player1");
const input_multiplayer_player2 = document.querySelector("input#player2");

let jogador1 = spans[0];
let jogador2 =  spans[1];

let jogar_contra_maquina = false;
let jogar_multiplayer = false;
let vez_da_jogada = 0;

//retorna uma lista com todas as divs que tenha a classa ".casaQuadradinho"
const casa_quadradinho = document.querySelectorAll(".casaQuadradinho");

let combinacoes_vitorias = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function acabarJogo_empate() {
  p_mensagem_final.innerHTML = `Empate!`;
  page_mensagem.classList.remove("sumir");
}

function acabarJogo(classe_do_jogador_da_vez, jogador) {
  const ehGanhador = verificarVitoria(classe_do_jogador_da_vez);
  
    if (ehGanhador) {
      p_mensagem_final.innerHTML = `${jogador} Venceu`;
      page_mensagem.classList.remove("sumir");
    }
}

function verificarVitoria(jogadorAtual) {
  return combinacoes_vitorias.some(combinacao => {
    return combinacao.every(indice => {
     return casa_quadradinho[indice].classList.contains(jogadorAtual);
    });
  });
}

function ehEmpate() {
  return [...casa_quadradinho].every((casinha) => {
    return casinha.classList.contains("x") || casinha.classList.contains("circulo");
  });
}

//MAIN - JOGO E REGRAS DE JOGO
function JOGO_contra_maquina() {
  let nome_player = `${input_contra_maquina.value} - X`;
  let nome_bot = `Bot - O`;

  if(input_contra_maquina.value !== '')
    jogador1.innerHTML = nome_player;

  jogador2.innerHTML = nome_bot;

  troca_background(spans[0], spans[1]);
  
  //colocar X e O
  //percorre todas as divs esperando para serem clicadas
  for (let celula of casa_quadradinho) {
    celula.addEventListener('click', (uma_casa) => {
   
    if (vez_da_jogada % 2 == 0 && !celula.classList.contains("circulo") ){
      uma_casa.target.classList.add("x");
          
      if(ehEmpate()) 
        acabarJogo_empate();
      else
        acabarJogo("x", input_contra_maquina.value);
  
      vez_da_jogada++;
      troca_background(spans[1], spans[0]);
    }

    let indexRandom_useds = [];
    let indexRandom = Math.floor(Math.random() * 8);
    indexRandom_useds.push(indexRandom);

    // if (!indexRandom_useds.contains(indexRandom))
      casa_quadradinho[indexRandom].classList.add("circulo"); 

    
    // if(ehEmpate())
    //   acabarJogo_empate();
    // else
    //   acabarJogo("circulo", `Bot`);
            
    // vez_da_jogada++;
      
    // troca_background(spans[0], spans[1]);
  }) //fim da function(uma_casa)
    
  } 
}

function JOGO_multiplayer() {
  let nome_player1 = `${input_multiplayer_player1.value} - X`;
  let nome_player2 = `${input_multiplayer_player2.value} - O`;
  
  if(input_multiplayer_player1.value !== '' && input_multiplayer_player2.value !== '') {
    jogador1.innerHTML = nome_player1;
    jogador2.innerHTML = nome_player2;
  }
  
  troca_background(spans[0], spans[1]);
  
  //colocar X e O
  //percorre todas as divs esperando para serem clicadas
  for (let celula of casa_quadradinho) {
    celula.addEventListener('click', (uma_casa) => {
   
    if (vez_da_jogada % 2 == 0 && !celula.classList.contains("circulo") ){
      uma_casa.target.classList.add("x");
          
      if(ehEmpate()) 
        acabarJogo_empate();
      else
        acabarJogo("x", input_multiplayer_player1.value);
  
      vez_da_jogada++;
      troca_background(spans[1], spans[0]);
    }
    else if (vez_da_jogada % 2 != 0 && !celula.classList.contains("x") ) {
      uma_casa.target.classList.add("circulo"); 
  
      if(ehEmpate())
        acabarJogo_empate();
      else
        acabarJogo("circulo", input_multiplayer_player2.value);
          
      vez_da_jogada++;
      troca_background(spans[0], spans[1]);
    }  
  }) //fim da function(uma_casa)

  } 
}

//colocar e tirar classe do CSS pra visualizar de quem é a vez
function troca_background(p1, p2) {
  p1.classList.remove("fundoOriginal");
  p2.classList.add("fundoOriginal");
}

//reiniciar jogo
function reiniciar() {
  vez_da_jogada = 0;

  troca_background(spans[0], spans[1]);
  
  for (let casinha of casa_quadradinho) {
    casinha.classList.remove("x");
    casinha.classList.remove("circulo");
  }
  
  page_mensagem.classList.add("sumir");
}

function voltarFIM() {
  reiniciar();
  page_inicio.classList.remove("sumir");
}

// CONTRA A MAQUINA OU MULTIPLAYER 
function playMaquina() {
  jogar_contra_maquina = true;
  vez_da_jogada = 0;

  page_inicio.classList.add("sumir");
  page_contra_maquina.classList.remove("sumir");
}

function multiplayer() {
  jogar_multiplayer = true;
  
  page_inicio.classList.add("sumir");
  page_multiplayer.classList.remove("sumir");
}

// BOTAO DE VOLTAR
function voltarMaquina() {
  page_contra_maquina.classList.add("sumir");
  page_inicio.classList.remove("sumir");
}

function voltarMultiplayer() {
  page_multiplayer.classList.add("sumir");
  page_inicio.classList.remove("sumir");
}

//botao pra jogar
function jogar() {  
  page_multiplayer.classList.add("sumir");
  page_contra_maquina.classList.add("sumir");
  nome_jogadores.classList.remove("sumir");
  
  if (jogar_contra_maquina)
    JOGO_contra_maquina();
  else if (jogar_multiplayer)
    JOGO_multiplayer();
}

function botao_para_comecar() {
  btn_inicio.classList.add("sumir");
  page_inicio.classList.remove("sumir");
  quadradao.classList.remove("sumir")
}