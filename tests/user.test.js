const expect =require('chai').expect
const request = require('supertest');
const app =require('../app').app
const User  = require('../models/users')


beforeEach(() => {
    User.remove({}).then(() => {

    }).catch((err) => console.log('error before :' + err))
})

describe('POST /users/newuser',() => {
    var user = {
        username : "Tope Alabi",
        password : "alabi"
    }
    it('should create a new user',(done) => {
        request(app)
            .post('/users/newuser')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.body.message).to.equal('User Created')
            })
            .end((err,res) => {
                if(err){
                    return done(err)
                }
                User.findOne({username : res.body.username}).then((user) => {
                    expect(user.username).to.equal("Tope Alabi")
                    done();
                }).catch((err) => done(err))
            })
    })

    it('should not create user when username is taken',() => {
        
    })
})