import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../../../index';
import testEntry from '../../mockData/testEntry';

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
                expect(res.body.message).to.equal('Entry created successfully');
            });
        done();
    });
    it('Should return an error: unauthorized access', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.falseToken)
            .send(testEntry[0])
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
    it('Should return a success: second entry created', (done) => {
        chai.request(app).post('/api/v2/entries')
            .set('Authorization', process.env.userToken2)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.a('object');
                expect(res.body.message).to.equal('Entry created successfully');
            });
        done();
    });
});
describe('Modify an entry', () => {
    it('Should return a success: entry successfully edited', (done) => {
        chai.request(app).patch(`/api/v2/entries/${testEntry[3].entryId}`)
            .set('Authorization', process.env.userToken1)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body.message).to.equal('Entry successfully edited');
                done();
            });
    });
    it('Should return an error: entry not found', (done) => {
        chai.request(app).patch(`/api/v2/entries/${testEntry[5].entryId}`)
            .set('Authorization', process.env.userToken1)
            .send(testEntry[2])
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry not found');
                done();
            });
    });
    it('Should return an error: this entry is not yours', (done) => {
        chai.request(app).patch(`/api/v2/entries/${testEntry[3].entryId}`)
            .set('Authorization', process.env.userToken2)
            .send(testEntry[2])
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry not found');
                done();
            });
    });
    it('Should not return a success: Invalid params', (done) => {
        chai.request(app).patch(`/api/v2/entries/${testEntry[4].entryId}`)
            .set('Authorization', process.env.userToken1)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' entryId  must be a positive number');
                done();
            });
    });
});
describe('Get specific entry', () => {
    it('Should not return an entry : entryId not found', (done) => {
        chai.request(app).get(`/api/v2/entries/${testEntry[5].entryId}`)
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('entry not found');
                done();
            });
    });
    it('Should return an entry with the specified ID', (done) => {
        chai.request(app).get(`/api/v2/entries/${testEntry[3].entryId}`)
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                done();
            });
    });
});
describe('Delete an entry', () => {
    it('Should Not delete an entry : entry id not found', (done) => {
        chai.request(app).delete(`/api/v2/entries/${testEntry[5].entryId}/`)
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry not found');
                done();
            });
    });
    it('Should allow successfully: entry deleted successfully', (done) => {
        chai.request(app).delete(`/api/v2/entries/${testEntry[3].entryId}`)
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });
});
describe('Get all entries', () => {
    it('Should should return all entries', (done) => {
        chai.request(app).get('/api/v2/entries')
            .set('Authorization', process.env.userToken2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('object');
                expect(res.body.message).to.equal('Entries successfully retreived');
                done();
            });
    });
    it('Should should not return an entry: no entry found', (done) => {
        chai.request(app).get('/api/v2/entries')
            .set('Authorization', process.env.userToken1)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('No entry found');
                done();
            });
    });
});
