const html = document.querySelector('html');
const btnContexto = document.querySelectorAll('[data-modo]');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btnStart = document.querySelector('#start-pause');
const btnIniciarOuPausar = document.querySelector('#start-pause span');
const imgIniciarOuPausar = document.querySelector('#start-pause img');
const temporizador = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

btnContexto.forEach(button => {
    const modoBtn = button.dataset.modo;
    button.addEventListener('click', () => {
        alterarContexto(modoBtn);

        btnContexto.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    });
});

function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            tempoDecorridoEmSegundos = 1500;
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;     
            tempoDecorridoEmSegundos = 300;
            break;

        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            tempoDecorridoEmSegundos = 900;
            break;

        default:
            break;
    }

    mostrarTempo();
}

function recarregaPagina(){
    window.location.reload();
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaTempoFinalizado.play();
        zerarContagem();

        setInterval(recarregaPagina, 6000);
        return;
    }
    
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

btnStart.addEventListener('click', iniciarOuPausarContagem);

function iniciarOuPausarContagem(){
    if(intervaloId){
        musicaPause.play();
        zerarContagem();
        return;
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    imgIniciarOuPausar.setAttribute('src', './imagens/pause.png');
    btnIniciarOuPausar.textContent = 'Pausar';
}

function zerarContagem(){
    clearInterval(intervaloId);
    imgIniciarOuPausar.setAttribute('src', './imagens/play_arrow.png');
    btnIniciarOuPausar.textContent = 'Começar';
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
