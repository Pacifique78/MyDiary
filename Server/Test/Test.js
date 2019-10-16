import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import app from '../../index';
chai.use(chaiHttp);

describe('Welcome Home page', () => {
    it('Should return a welcome text', (done) => {
        chai.request(app).get('/')
            .end((err, res) => {
                expect(res);
                done();
            });
    });
});
describe('User SignUp', ()=>{
    it('Should allow a user to signup', (done)=>{
        const testUser = {
            'firstName':'testUser',
            'lastName':'testUser',
            'email':'testUser@gmail.com',
            'password':'password'
        };
        chai.request(app).post('/api/v1/auth/signup')
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('token');
                done();
            });
    });
    it('Should NOT allow a user to signup: Invalid data', (done)=>{
        const testUser3 = {
            'lastName':'lastName',
            'firstName':'',
            'email':'userEmail@gmail.com',
            'password':'password'
        };
        chai.request(app).post('/api/v1/auth/signup')
            .send(testUser3)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Should NOT allow a user to signup: user already exist', (done)=>{
        const testUser1 = {
            firstName:'firstname',
            lastName:'lastName',
            email:'systemadmin@gmail.com',
            password:'password'
        };
        chai.request(app).post('/api/v1/auth/signup')
            .send(testUser1)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});