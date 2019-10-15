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
describe('User Signin', ()=>{
    it('Should allow a user to signin', (done)=>{
        const testUser = {
            'email':'systemadmin@gmail.com',
            'password':'admin'
        };
        chai.request(app).post('/api/v1/auth/signin')
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                done();
            });
    });
    it('Should NOT allow a user to signin: Email not found', (done)=>{
        const testUser2 = {
            'email':'testUser1@gmail.com',
            'password':'password'
        };
        chai.request(app).post('/api/v1/auth/signin')
            .send(testUser2)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Should NOT allow a user to signin: Incorrect password', (done)=>{
        const testUser3 = {
            'email':'systemadmin@gmail.com',
            'password':'password'
        };
        chai.request(app).post('/api/v1/auth/signin')
            .send(testUser3)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Should NOT allow a user to signin: Invalid input or missing input', (done)=>{
        const testUser1 = {
            'email':'systemadmin@gmail.com',
            //"password":"password"
        };
        chai.request(app).post('/api/v1/auth/signin')
            .send(testUser1)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
describe('Create a new entry', ()=>{
    it('Should return a success: new entry created', (done)=>{
        const testEntry1= {
            'title': 'My title',
            'description': 'My description'
        };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', token)
            .send(testEntry1) 
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.a('object');
            });
        done();
    });
    it('Should return an error: Title already used', (done)=>{
        const testentry2= {
            'title':'My First Program',
            'description':'My description'
        };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).post('/api/v1/entries') 
            .set('Authorization', token)
            .send(testentry2)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error');
            });
        done();
    });
    it('Should return an error: Invalid data', (done) =>{
        const testEntry4= {
            'title':true,
            'description':'hey there'
        };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', token)
            .send(testEntry4)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
            });
        done();
    });
    it('Should return an error: Token is not provided', (done) => {
        const testEntry5= {
            'title': 'diary',
            'description':'my new diary'
        };
        const token = '';
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', token)
            .send(testEntry5)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
            });
        done();
    });
});