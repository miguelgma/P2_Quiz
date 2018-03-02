const fs = require("fs");

const DB_FILENAME = "quizzes.json";

const load = () => {
	fs.readFile(DB_FILENAME, (err, data) => {
		if(err){
			if(err.code == "ENOENT"){
				save();
				return;
			}
			throw err;
		}

		let json = JSON.parse(data);

		if(json){
			quizzes = json;
		}
	});
};

const save = () => {
	fs.writeFile(DB_FILENAME,
		JSON.stringify(quizzes),
		err => {
			if(err) throw err;
		}); 
}

let quizzes = [	
	{
		question: "Capital de Italia",
		answer: "Roma"
	},
	{
		question: "Capital de Francia",
		answer: "Paris"
	},
	{
		question: "Capital de Grecia",
		answer: "Atenas"
	},
	{
		question: "Capital de Suecia",
		answer: "Estocolmo"
	}
];

exports.count = () => quizzes.length;

/*
Añade un nuevo quizz
*/
exports.add = (question, answer) => {
	quizzes.push({
		question:(question|| "").trim(),
		answer:(answer|| "").trim()
	});
	save();
};


/**
Actualiza el quizze situado en la posición index
*/
exports.update = (id, question, answer) => {
	const quiz = quizzes[id];

	if(typeof id == "undefined"){ //Si la posicion en el array NO existe, salta error
		throw new Error('El valor del parametro id no es valido.');
	}

	quizzes.splice(id, 1, {
		question:(question|| "").trim(),
		answer:(answer|| "").trim()
	});
	save();
};

exports.getAll  = () => JSON.parse(JSON.stringify(quizzes)); //Obtener todos los valores del array

exports.getByIndex = id => {
	const quiz = quizzes[id];

	if(typeof quiz == "undefined"){
		throw new Error("El valor de parametro id no es valido");
	}
	return JSON.parse(JSON.stringify(quiz));
	rl.prompt();
};

exports.deleteByIndex = id => {
	const quiz = quizzes[id];

	if(typeof quiz == "undefined"){
		throw new Error("El valor de parametro id no es valido");
	}

	quizzes.splice(id, 1);
	save();
}

load();