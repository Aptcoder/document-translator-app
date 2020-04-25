const expect =require('chai').expect
const request = require('supertest');
const app =require('../app').app
const User  = require('../models/users')


before((done) => {
    User.deleteMany({}).then(() => {
        var newuser = new User({
            username : "milz",
            password : "dee"
        })
        return newuser.save().then((user) => {
            console.log(`${user.username} created`)
            done();
        })
    }).catch((err) => {
        console.log('error before :' + err)
        done(err);
        })
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

    it('should not create user when username is taken',(done) => {
        request(app)
            .post('/users/newuser')
            .send({
                username: "milz",
                password : "no function"
            })
            .expect(401)
            .expect((res) => {
                expect(res.body.ErrorMessage).to.equal("Username already exists")
            })
            .end(done);
    })
})

describe('POST /users/login',() => {


    it('should log user in',(done) => {
        request(app)
            .post('/users/login')
            .send({
                username : "milz",
                password : "dee"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message).to.equal('login successful')
            })
            .end((err,res) => {
                if(err) {
                    return done(err)
                }
                expect(res.headers['x-auth']).to.be.a('string')
                done();
            })
    })

    it('should not login user with wrong password/username',(done) => {
        request(app)
            .post('/users/login')
            .send({
                username : "milz",
                password : "tope"
            })
            .expect(401)
            .expect(res => {
                expect(res.body.message).to.equal('wrong password or username')
            })
            .end((err,res) => {
                if(err) {
                    return done(err)
                }
                expect(res.headers['x-auth']).to.be.an('undefined');
                done();
            })
    })
})