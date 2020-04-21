module.exports = {
    hashRounds : 10,
    development : {
        port : process.env.PORT || 3000
    },
    production : {
        port : process.env.PORT 
    },

    secrete_key : "thisisthebeginingofanewworld"
}