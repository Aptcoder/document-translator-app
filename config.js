module.exports = {
    hashRounds : 10,
    development : {
        port : process.env.PORT || 3000,
        db : "mongodb://localhost:27017/DocTrans"
    },
    production : {
        port : process.env.PORT 
    },
    test : {
        port : 3000,
        db : "mongodb://localhost:27017/DocTransTest"
    },
    api_key : "trnsl.1.1.20200422T011944Z.402eead6367ae0e3.5ff9403fee039ed790408396ba154b2d3103ca97",
    secrete_key : "thisisthebeginingofanewworld"
}