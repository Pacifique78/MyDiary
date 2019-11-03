import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../index';
import testEntry from '../Model/mockData/testEntry';

dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe('Create a new entry', () => {
    it('Should return a success: new entry created', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.userToken1)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.a('object');
                expect(res.body.data.message).to.equal('Entry created successfully');
            });
        done();
    });
    it('Should return a success: second entry created', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.userToken2)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.a('object');
                expect(res.body.data.message).to.equal('Entry created successfully');
            });
        done();
    });
    it('Should return an error: unauthorized access', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.falseToken)
            .send(testEntry[1])
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('You are not authorized to perform this task');
            });
        done();
    });
    it('Should return an error: Invalid data', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.userToken1)
            .send(testEntry[1])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' title  must be a string');
            });
        done();
    });
    it('Should return an error: Token is not provided', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', '')
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
            });
        done();
    });
    it('Should return an error: Bad token', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.falseToken2)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
            });
        done();
    });
});
