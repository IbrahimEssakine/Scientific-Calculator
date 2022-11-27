const affichage1El = document.querySelector('.affichage1');
const affichage2El = document.querySelector('.affichage2');
const LastResultEl = document.querySelector('.last-resultat');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const scientifiqueEl = document.querySelectorAll('.scientifique');
const clearEl = document.querySelector('.clear');
const clearelementEl = document.querySelector('.clear-element');
const equalEl = document.querySelector('.equal');
const bottonsEl = document.querySelectorAll('.botton');
let affichage1='';
let affichage2='';
let result=null;
let lastOperation='';
let lastScientifique='';
let haveDot=false;
let audios=new Audio('erreur.mp3');
numbersEl.forEach( number=> {
    number.addEventListener('click',(e)=> {
        if(e.target.innerText ==='.' && !haveDot){
            haveDot=true;
        }else if (e.target.innerText === '.' && haveDot){
            return;
        }
        affichage2 += e.target.innerText;
        affichage2El.innerText = affichage2;

    })})
operationEl.forEach( operation=>{
    operation.addEventListener('click', (e)=>{
        if(!affichage2){return;}
        haveDot=false;
        const OperationName = e.target.innerText;
        if (affichage1 && affichage2 && lastOperation) {
            mathOperation();
        }else{
            result=parseFloat(affichage2);
        }
        clearVar(OperationName);
        lastOperation=OperationName;
    })
})
scientifiqueEl.forEach( scientifique=>{
    scientifique.addEventListener('click', (e)=>{
        if(!affichage2){return;}
        haveDot=false;
        const ScientifiqueName = e.target.innerText;
        lastScientifique=ScientifiqueName;
        if (affichage2) {
            result=parseFloat(affichage2);
            scientifiqueOp();
        }
    })
})

function clearVar(name = '') {
    affichage1 += affichage2 + ' ' + name + ' ';
    affichage2 = '';
    affichage1El.innerText=affichage1;
    LastResultEl.innerText = result;
}

function clearVarPlus(name = '') {
    affichage1 += name+'('+affichage2 + ') ';
    affichage2 = '';
    affichage1El.innerText=affichage1;
    LastResultEl.innerText = result;
}

function mathOperation() {
    if(lastOperation === '*'){
        result = parseFloat(result)*parseFloat(affichage2);
    }else if(lastOperation === '+'){
        result = parseFloat(result)+parseFloat(affichage2);
    }else if(lastOperation === '-'){
        result = parseFloat(result)-parseFloat(affichage2);
    }else if(lastOperation === '/'){
        result = parseFloat(result)/parseFloat(affichage2);
    }else if(lastOperation === '%'){
        result = parseFloat(result)%parseFloat(affichage2);
    }
}
function scientifiqueOp(){
    sm=true;
    if(lastScientifique === 'abs'){
        if (result>=0) {
            result = result;
            }else{
            result=-result;
            }
            clearVarPlus(lastScientifique);
    }else if(lastScientifique === '²'){
        result*=result;
        clearVar(lastScientifique);
    }else if(lastScientifique === 'ln'){
        result = Math.LN2(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === '!'){
        let fact=1;
       for (let i = 1; i <= result; i++) {
        fact*=i;
       }
       result=fact;
       clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'sin'){
        result = Math.sin(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'cos'){
        result = Math.cos(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'tan'){
        result = Math.tan(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'log'){
        result = Math.log(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'inv'){
            result = -result;
            clearVarPlus(lastScientifique);
    }else if(lastScientifique === 'exp'){
        result = Math.exp(result);
        clearVarPlus(lastScientifique);
    }else if(lastScientifique === '√'){
        const precision = 0.0001;
        var start = 1;
        if (result >1) {
            while (start*start < result) {
                start+=precision;
            }
        start-=precision;
        result=start;
        clearVarPlus(lastScientifique);
    }
    }else if(lastScientifique === '1/'){
        result = 1/result;
        clearVarPlus(lastScientifique);
    }
}

clearEl.addEventListener('click', (e)=>{
    affichage1 ='';
    affichage2='';
    result=null;
    affichage1El.innerText=0;
    affichage2El.innerText=0;
    LastResultEl.innerText=0;
})

clearelementEl.addEventListener('click',(e)=>{
    affichage2El.innerText=0;
    affichage2='';
})

window.addEventListener('keydown', (e)=>{
    clickbotton(e.key);
    clickequal(e.key);
})

function clickbotton(key){
    bottonsEl.forEach(botton=>{
        if(botton.innerText === key){
            botton.click();
        }})
}

equalEl.addEventListener('click',(e)=>{
    haveDot=false;
    if(affichage1){
        mathOperation();}
    affichage2=result;
    affichage1='';
    affichage1El.innerText='';
    LastResultEl.innerText='';
    affichage2El.innerText=result;
    console.log(result);
    if(result == Infinity){
        audios.play();
    }
})

function clickequal(key) {
    if( key === "Enter" || key === "="){
        equalEl.click;
}}