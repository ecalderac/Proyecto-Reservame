//Puerto
process.env.PORT = process.env.PORT || 3000;

//Base de Datos
process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/BD_RESERVAME';

//SEED
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo-para-reservame.#$%&%#$&"#$"Ñ[';

//Caducidad token
process.env.CADUCIDAD_TOKEN = '48h';