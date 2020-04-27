module.exports = {
    hashRounds : 10,
    development : {
        port : process.env.PORT || 3000,
        db : "mongodb://localhost:27017/DocTrans"
    },
    production : {
        port : process.env.PORT ,
        db: process.env.MONGODB_URI
    },
    test : {
        port : 3000,
        db : "mongodb://localhost:27017/DocTransTest"
    },
    api_key : process.env.API_KEY,
    secrete_key : process.env.SECRETE_KEY
}