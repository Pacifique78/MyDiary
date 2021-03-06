import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import app from '../../../index';
import testUser from '../../mockData/testUSer';
import v1UserTEst from '../../V1/Test/userTest.test';
import v1EntryTest from '../../V1/Test/v_entryTests.test';

v1UserTEst();
v1EntryTest();
const { expect } = chai;
chai.use(chaiHttp);
describe('User SignUp', () => {
    it('Should allow a user to signup', (done) => {
        chai.request(app).post('/api/v2/auth/signup')
            .send(testUser[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('firstName');
                expect(res.body.data).to.have.property('lastName');
                expect(res.body.data).to.have.property('email');
                expect(res.body).to.have.property('token');
                done();
            });
    });
    it('Should allow a user to signup', (done) => {
        chai.request(app).post('/api/v2/auth/signup')
            .send(testUser[6])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('firstName');
                expect(res.body.data).to.have.property('lastName');
                expect(res.body.data).to.have.property('email');
                expect(res.body).to.have.property('token');
                done();
            });
    });
    it('Should NOT allow a user to signup: Invalid data', (done) => {
        chai.request(app).post('/api/v2/auth/signup')
            .send(testUser[1])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' firstName  is not allowed to be empty');
                done();
            });
    });
    it('Should NOT allow a user to signup: user already exist', (done) => {
        chai.request(app).post('/api/v2/auth/signup')
            .send(testUser[0])
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('user with testUser@gmail.com already exists');
                done();
            });
    });
});
describe('User Signin', () => {
    it('Should allow a user to signin', (done) => {
        chai.request(app).post('/api/v2/auth/signin')
            .send(testUser[2])
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('token');
                done();
            });
    });
    it('Should NOT allow a user to signin: Email not found or incorrect password', (done) => {
        chai.request(app).post('/api/v2/auth/signin')
            .send(testUser[3])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Invalid username / password');
                done();
            });
    });
    it('Should NOT allow a user to signin: Invalid input or missing input', (done) => {
        chai.request(app).post('/api/v2/auth/signin')
            .send(testUser[5])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' password  is required');
                done();
            });
    });
});
describe('Change notification settings', () => {
    it('should set notification', (done) => {
        chai.request(app).patch('/api/v2/auth/reminder')
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
});
