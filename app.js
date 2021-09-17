const gameBox = document.getElementById('game');
const gameSettings = document.getElementById('settings');
const countWins = document.getElementById('wins');

var colors = ["#000000","#000000","#FF0000","#FF0000","#800000","#800000","#FFFF00","#FFFF00","#808000","#808000","#00FF00","#00FF00","#00FFFF","#00FFFF","#0000FF","#0000FF"];
var colorsDesordenados = [];

var wins = 0;

// Cartas volteadas
var flipCards = [];
// Cartas acertadas
var flipedMatched = [];

// Desordena la primera array
function desordenar(c){
    colorsDesordenados = c.sort(function() { return Math.random() - 0.5 });
    imprimir();
}

//imprime el juego
function imprimir(e){
    let c = colors || colorsDesordenados;
    if(e != undefined){
        flipCards.push(e);

        // si has volteado 3 cartas reinicia flipCards y añade la última añadida
        if(flipCards.length == 3){
            flipCards = []
            flipCards.push(e);
        }
        
        //Ciamdp hay dos cartas en flipCards comprueba si son del mismo color, y si lo son añade los colores a flipMatched
        if(flipCards.length == 2){
            if(colorsDesordenados[flipCards[0]] == colorsDesordenados[flipCards[1]]){
                flipedMatched.push(flipCards[0],flipCards[1]);
                console.log(true);
            }
        }
    }

    let template = '';
    for(let i = 0; i < c.length; i++){
        let setClass = "back";
        let onclick = `onclick="imprimir(${i})"`;
        let background = ``;

        // Voltea las cartas pulsadas
        for(let j = 0; j < flipCards.length;j++){
            if(flipCards[j] == i){
                setClass = "";
                onclick = "";
                background = `style="background: ${c[i]}";`
            }
        }

        // voltea las cartas ya descubiertas
        for(let j = 0; j < flipedMatched.length;j++){
            if(flipedMatched[j] == i){
                setClass = "";
                onclick = "";
                background = `style="background: ${c[i]}";`
            }
        }
        template += `
            <div class="${setClass}" ${background} id="card" ${onclick}>
            </div>
        `;
    }
    gameBox.innerHTML = template;
    
    // Entra cuando ganas
    if(flipedMatched.length == colors.length){
        gameWin();
    }
}

// Enseña el menú de que has ganado y si quieres reiniciar
function gameWin(){
    template = `
        <div class="gameWin">
            <h1>Congratulations you beat the game !</h1>
            <h2>Play again?</h2>
            <button onclick="play()">RESTART</button>
        </div>
    `
    gameSettings.style.display = "flex";
    gameSettings.innerHTML = template;

    wins += 1;
    countWins.innerHTML = `WINS: ${wins}`;

}

// Resetea la partida
function play(){
    flipCards = [], flipedMatched = [];
    desordenar(colors);
    gameSettings.style.display = "none";
}

// Menú para empezar por primera vez 
function start(){
    play();
    template = `
        <div class="gameWin">
            <button onclick="play()">PLAY</button>
        </div>
    `
    gameSettings.style.display = "flex";
    gameSettings.innerHTML = template;
}

/* START */
start();


const cards = document.querySelectorAll("#card");
