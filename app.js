/* **Jogo do Número Secreto - Projeto Inicial de Programação**

Este projeto foi desenvolvido por mim, Leandro, como parte do curso inicial de Programação da Alura.

O objetivo do projeto é criar um jogo simples para aprender os fundamentos da lógica de programação. O jogador tenta adivinhar o número aleatório sorteado pelo computador.

Durante o desenvolvimento, explorei conceitos como:

 - Geração de números aleatórios;
 - Interação com o usuário;
 - Estruturas condicionais e loops.

Caso tenha sugestões de melhorias, dicas ou apenas queira trocar uma ideia, fique à vontade para entrar em contato pelo e-mail: souza.leandro78@gmail.com.

Divirta-se!
*/

/* **Secret Number Game - Initial Programming Project**

This project was developed by me, Leandro, as part of Alura's introductory Programming course.

The goal of this project is to create a simple game to learn the fundamentals of programming logic. The player tries to guess the random number drawn by the computer.

During development, I explored concepts such as:

- Generating random numbers;  
- User interaction;  
- Conditional structures and loops.

If you have suggestions for improvements, tips, or just want to exchange ideas, feel free to contact me at: souza.leandro78@gmail.com.

Enjoy!
*/

/* Testando commits e alterações
*/

alert('Olá! Este é o Jogo do número secreto. O objetivo do jogo é adivinhar o número que foi sorteado. Na próxima tela você será requisitado a preencher um número máximo para o sorteio. Quanto maior o número, mais difícil o jogo.');

let listaDeNumerosSorteados = [];
let numeroLimite;

while (isNaN(numeroLimite)) {
    numeroLimite = parseInt(prompt('Digite o número máximo.'));
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(`${chute}`);
    console.log(parseInt(chute));
    console.log(isNaN(chute));

    if (validarChute(chute) == false) { //se a validação falhar, interrompe a aplicação
        return;
    } 
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

function validarChute(chute) {
    switch (true) { //compara true com as expressões contidas em case. Ou seja, apenas entra nos cases se a própria condição for verdadeira.
        case chute < 0 || chute > numeroLimite:
            alert(`O chute precisa estar entre 1 e ${numeroLimite}.`);
            return false;

        case parseInt(chute) == false:
            alert(`O chute precisa ser um número inteiro entre 1 e ${numeroLimite}.`);
            return false;
    
        default:
            return true;
    }

    /*Porque eu usei switch ao invés de uma sequencia de if?
    
    Foi uma escolha pessoal, eu acho a estrutura switch case muito elegante e organizada. No meu entendimento, fica mais fácil de rastrear o código, além de melhorar o desenvolvimento a medida que os testes são feitos e novas condições de validação são percebidas como necessárias.
    */
}