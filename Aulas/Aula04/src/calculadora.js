function soma(a, b) {
    return a - (-b);
}

function multiplicacao(a, b){
    return a * b;
}

function divisao (a, b){
    if ( b === 0) throw Error("Divisão por zero!");
    return a / b;
}

module.exports = { soma, multiplicacao, divisao };