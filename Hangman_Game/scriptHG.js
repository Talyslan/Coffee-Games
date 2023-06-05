//caminho relativo das imagens
let imagensDeErro = ['1cabeça.png', '2corpo.png', '3braço1.png', '4braço2.png', '5perna1.png', '6perna2.png', '7olho1.png', '8olho2.png', '9boca.png', '10nariz.png'] 


//Acessando no HTML a tag com os id="nome_do_id" : 
const tracosHtml = document.getElementById('tracos');
const tentativasHTML = document.getElementById('tentativas');
const palavraEscolhida = document.getElementById('palavraEscolhida');
const respostaFinal = document.getElementById('respostaFinal');
const chuteValor = document.getElementById('palavraChutada');
const chuteHtml = document.getElementById('chute');
const btn_trocarPalavra = document.querySelector("#escolherTrocar");
const btn_iniciar = document.querySelector("#iniciar");
const img = document.getElementById('boneco');
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");

// => 0 - nao escolheu, 1 - escolheu
let verificaSeJaEscolheuPalavra = 0;
let result = ''; // 'fim' => acabou; '' => ainda em jogo
let imgURL, imgFinal, tentativasNumUtilizadas, tentativasNum, erros, listaTracos, listaLetras, palavras

//clique no 'chute'/'trocar palavra' quando apertar enter
document.addEventListener('keyup', function(chave) {

  if (chave.key == 'Enter' && result != 'fim') {
    btn_iniciar.click;
  }
  
  if (chave.key === 'Enter' && result != 'fim'){
    chute.click;
    chute();
  }
  else if (chave.key === 'Enter' && result == 'fim') {
    btn_trocarPalavra.click;
    escolherTrocar();
  }
  else if (chave.key != 'Enter' & result != 'fim') 
    chuteValor.click;
  
})


function iniciar() {
  first.classList.add("sumir");
  second.classList.remove("sumir");
}

//functions das categorias
function frutas() {
  palavras = ["abacaxi","banana","caqui","damasco","figo","goiaba","kiwi", 'laranja', 'melancia', ''];
  console.log(palavras);
  console.log('eu tive aq frutas')
  
  second.classList.add("sumir");
  third.classList.remove("sumir");
  escolherTrocar();
} 

function cores() {
  palavras = ['Azul', 'Vermelho', 'Amarelo', 'Verde', 'laranja', 'ciano', 'rosa', 'dourado']
  console.log(palavras);
  console.log('eu tive aq cores')
  
  second.classList.add("sumir");
  third.classList.remove("sumir");
  escolherTrocar();
}

function animais() {
  palavras = ['Macaco', 'Elefante', 'Girafa', 'cachorro', 'papagaio', 'piriquito', 'jacare', 'rato', 'largatixa']
  console.log(palavras);
  console.log('eu tive aq animais')
  
  second.classList.add("sumir");
  third.classList.remove("sumir");
  escolherTrocar();
}

function mudarCategoria() {
  resetOptions();
  result = '';
  third.classList.add("sumir");
  second.classList.remove("sumir");
}


function escolherTrocar() {
  colocarChuteNaTela();
  tentativasHTML.innerHTML = `Tentativas : ${tentativasNum}`;
  
  let indiceAleatorio = parseInt(Math.random() * palavras.length);
  let letrasBaixa = palavras[indiceAleatorio].toUpperCase().trim();
  
  //LISTA DA PALAVRA ESCOLHIDA
  listaLetras = letrasBaixa.split('');   //['I', 'T', 'E', 'M']
  
  //faz uma lista com a quantidade de traços
  let quantidadeTracos = '_'.repeat(listaLetras.length); // '____'
  listaTracos = quantidadeTracos.split(''); //['_', '_', '_', '_']

  //colocando os '_' no HTML
  tracosHtml.innerHTML = `${listaTracos.join(' ')}`;

  //confirmar que palavra ja foi escolhida
  verificaSeJaEscolheuPalavra = 1;

  //texto fixo
  palavraEscolhida.innerHTML = 'Palavra escolhida: ';

  resetOptions();
  tentativasHTML.innerHTML = `Tentativas : ${tentativasNum}`;
  result = '';
}

function chute() {
  //pegando a string do chute
  let modificacoesChuteValor = chuteValor.value.trim();
  modificacoesChuteValor = modificacoesChuteValor.toUpperCase();
  let LetrasDoChute = modificacoesChuteValor;
  
  //ATUALIZA VALOR DAS TENTATIVAS E ERROS
  tentativasNum--;
  tentativasNumUtilizadas++;
  
  if (tentativasNum > 0 && LetrasDoChute != listaLetras.join('') && listaTracos.join('') != listaLetras.join('')) {

    //aumentar erros e colocar img de erro
    if (!listaLetras.includes(LetrasDoChute)) {
      erros++;
      imgURL = imagensDeErro[erros - 1];
      img.innerHTML = `<img src="images/bonecoForca/${imgURL}" alt="Boneco de erros" />`
    }
    
  }

  //NA TELA : QUANTIDADE DE ERROS E TENTATIVAS
  tentativasHTML.innerHTML = `Tentativas : ${tentativasNum} <br> Erros : ${erros}`;

  if (tentativasNum == 0) {
    imgFinal = imagensDeErro[imagensDeErro.length - 1];
    img.innerHTML = `<img src="images/bonecoForca/${imgFinal}" alt="Boneco de erros" />`
    perdeu(); 
  }
  
  //chute > 2 caracteres chutados e for igual a palavra escolhida => GANHOU
  //chute > 2 caracteres e diferente da palavra escolhida => errou o chute
  if (LetrasDoChute.length > 1 && LetrasDoChute == listaLetras.join(''))
    ganhou();
  else if (LetrasDoChute.length > 1 && LetrasDoChute != listaLetras.join(''))
    palavraEscolhida.innerHTML = 'CHUTE ERRADO! Continue tentando...';
  
  //Atualiza os traços da tela com as letras
  for (let i = 0; i < listaLetras.length; i++) {

    if (listaLetras[i] == LetrasDoChute) {
      let indiceDaListaLetras = listaLetras.indexOf(listaLetras[i], i);
      listaTracos[indiceDaListaLetras] = listaLetras[i];

      //mostra os traços atualizados e se ja for preenchidos todas as letras você ganhou
      if (listaTracos.join('') != listaLetras.join(''))
        tracosHtml.innerHTML = `${listaTracos.join(' ')}`;
      else if (listaTracos.join('') == listaLetras.join(''))
        ganhou()
          
    }
  }

  //depois de apertar 'Chute' limpar o input
  limpar()
}

//Funções para simplficar o código

function limpar() {
  //Limpa o INPUT
  document.getElementById('palavraChutada').value = '';
}

function ganhou() {
  //esses parametros X é só para fim de teste
  tracosHtml.innerHTML = `VOCÊ GANHOU! <br> 👑`;
  palavraEscolhida.innerHTML = `Parabéns, a palavra escolhida era ${listaLetras.join('')}!`;
  tentativasHTML.innerHTML = `Foram utilizadas : <br> ${tentativasNumUtilizadas} tentativas <br> ${erros} erros`;
  result = 'fim';
  tirarChuteDaTela();
  limpar();
}

function perdeu() { 
  tracosHtml.innerHTML = `A palavra escolhida era ${listaLetras.join('')}`;
  palavraEscolhida.innerHTML = 'VOCÊ PERDEU! <br> ❌'
  tentativasHTML.innerHTML = `Foram utilizadas : <br> ${tentativasNumUtilizadas} tentativas <br> ${erros} erros`;
  result = 'fim';
  tirarChuteDaTela();
  limpar();
}

function resetOptions () {
  tentativasNum = 10;
  tentativasHTML.innerHTML = ``;
  tentativasNumUtilizadas = 0;
  erros = 0;
  img.innerHTML = '';
  limpar();
}

function tirarChuteDaTela() {
  chuteValor.style.display = "none";
  chuteHtml.style.display = "none";
}

function colocarChuteNaTela() {
  chuteValor.style.display = "inline";
  chuteHtml.style.display = "inline";
}