'use strict'

const stdin = process.stdin,
    stdout = process.stdout,
    person = {
        name: null,
        age: 0
    }

const saveAge = (age) => {

    person.age = age;

    if (person.age >=18){
        stdout.write(`${person.name} es mayor de edad, tiene ${person.age} años.\n`)
    } else {
        stdout.write(`${person.name} es menor de edad, tiene ${person.age} años.\n`)
    }

    process.exit(1)
}

const saveName = (name) => {
    person.name = name;

    // Vuelve a preguntar
    const question = 'Hola ' + person.name + ' Cuantos años tienes..?';

    quiz(question, saveAge);
}

const quiz = (question, callback) => {
    stdin.resume();
    stdout.write( question + ': ')

    stdin.once('data', function(res){
        callback( res.toString().trim() );
    })
}

// Todo lo que entre por consola se codifica en utf8
stdin.setEncoding('utf8');
quiz('Como te llamas..?', saveName);