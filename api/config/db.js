module.exports = {
    user : "postgres",
    password : "password",
    host : "localhost",
    port : 5432,
    database : "DIMS",
    dialect : "postgres",
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}