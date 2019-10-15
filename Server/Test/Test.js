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
describe('Modify an entry', ()=>{
    it('Should return a success: entry successfully edited', (done)=>{
        const entryId = 1;
        const testEntry= {
            'title': 'My First Program',
            'description':'my new diary'
        };
        const  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).patch(`/api/v1/entries/${entryId}`) 
            .set('Authorization', token)
            .send(testEntry)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                done();
            });
    });
    it('Should return an error: entry not found', (done)=>{
        const entryId2 = 500;
        const testEntry2= {
            'title': 'My First Program',
            'description':'my new diary'
        };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).patch(`/api/v1/entries/${entryId2}`) 
            .set('Authorization', token)
            .send(testEntry2)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Should return an error: entry not yours to modify', (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        const entryId3 = 2;
        const testEntry3= {
            'title': 'My First Program',
            'description':'my new diary'
        };
        chai.request(app).patch(`/api/v1/entries/${entryId3}`)
            .set('Authorization', token)
            .send(testEntry3)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Shouls return an error: Token is not provided', (done) => {
        const entryId4 = 2;
        const testEntry4= {
            'title': 'My First Program',
            'description':'my new diary'
        };
        const token = '';
        chai.request(app).patch(`/api/v1/entries/${entryId4}`)
            .set('Authorization', token)
            .send(testEntry4)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                done();
            });
    });
    it('Should not return a success: Invalid params', (done)=>{
        const entryId5 = '2-';
        const testEntry5= {
            'title': 'My First Program',
            'description':'my new diary'
        };
        const  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).patch(`/api/v1/entries/${entryId5}`) 
            .set('Authorization', token)
            .send(testEntry5)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
});
describe('Delete an entry', () => {
    it('Should allow successfully: entry deleted successfully', (done) => {
        const entryId = 1;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).delete(`/api/v1/entries/${entryId}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
            });
        done();
    });
    it('Should Not delete an entry : entry id not found', (done) => {
        const entryId = 100;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).delete(`/api/v1/entries/${entryId}/`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
            });
        done();
    });
    it('Should not delete an entry: not yours to delete', (done) => {
        const entries2 = 2;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).delete(`/api/v1/entries/${entries2}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
            });
        done();
    });
    it('Should not delete an entry: token not provided', (done) => {
        const entryId4 = 1;
        const token = '';
        chai.request(app).delete(`/api/v1/entries/${entryId4}`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
            });
        done();
    });
});
describe('Get all entries', ()=>{
    it('Should should return all entries', (done)=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJzeXN0ZW0iLCJsYXN0TmFtZSI6ImFkbWluIiwiZW1haWwiOiJzeXN0ZW1hZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzExNjUzNDAsImV4cCI6MTU3MTc3MDE0MH0.dd-NAk1eByRTrV1fmSTLiSqVSoB4gjJ2fPGPPI2yx_w';
        chai.request(app).get('/api/v1/entries') 
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
            });
        done();
    });
    it('Shouls not return all mentors: Token is not provided', (done) => {
        const token = '';
        chai.request(app).get('/api/v1/entries')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
            });
        done();
    });
});