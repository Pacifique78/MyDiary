import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../index';
import testEntry from '../Model/testEntry';

const { expect } = chai;
chai.use(chaiHttp);
describe('Create a new entry', () => {
    it('Should return a success: new entry created', (done) => {
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', testEntry[6].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.a('object');
                expect(res.body.data.message).to.equal('Entry created successfully');
            });
        done();
    });
    it('Should return an error: Title already used', (done) => {
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', testEntry[6].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry with My title title already exists');
            });
        done();
    });
    it('Should return an error: Invalid data', (done) => {
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', testEntry[6].token)
            .send(testEntry[1])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' title  must be a string');
            });
        done();
    });
    it('Should return an error: Token is not provided', (done) => {
        chai.request(app).post('/api/v1/entries')
            .set('Authorization', testEntry[8].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
            });
        done();
    });
});
describe('Modify an entry', () => {
    it('Should return a success: entry successfully edited', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[6].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body.data.message).to.equal('Entry successfully edited');
                done();
            });
    });
    it('Should return an error: Invalid data', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[3]}`)
            .set('Authorization', testEntry[6].token)
            .send(testEntry[1])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' title  must be a string');
            });
        done();
    });
    it('Should return an error: entry not found', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[5].entryId}`)
            .set('Authorization', testEntry[6].token)
            .send(testEntry[2])
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry with such id not found');
                done();
            });
    });
    it('Should return an error: entry not yours to modify', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[7].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Not yours to modify');
                done();
            });
    });
    it('Shouls return an error: Token is not provided', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[8].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
                done();
            });
    });
    it('Should not return a success: Invalid params', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[4].entryId}`)
            .set('Authorization', testEntry[6].token)
            .send(testEntry[0])
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' entryId  must be a positive number');
                done();
            });
    });
});
describe('Get all entries', () => {
    it('Should should return all entries', (done) => {
        chai.request(app).get('/api/v1/entries')
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.be.a('object');
                expect(res.body.data.message).to.equal('Entries successfully retreived');
            });
        done();
    });
    it('Shouls not return all entries: Token is not provided', (done) => {
        chai.request(app).get('/api/v1/entries')
            .set('Authorization', testEntry[8].token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
            });
        done();
    });
});
describe('Get specific entry', () => {
    it('Should not return an entry : entryId not found', (done) => {
        chai.request(app).get(`/api/v1/entries/${testEntry[5].entryId}`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry with such id not found');
            });
        done();
    });
    it('Shouls not return an entry: Token is not provided', (done) => {
        chai.request(app).get(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[8].token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
            });
        done();
    });
    it('Should not return an entry : Invalid params', (done) => {
        chai.request(app).get(`/api/v1/entries/${testEntry[4].entryId}`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' entryId  must be a positive number');
            });
        done();
    });
    it('Should not return an entry : entry does not belong to you', (done) => {
        chai.request(app).get(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[7].token)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('This entry does not belong to you');
            });
        done();
    });
    it('Should return an entry with the specified ID', (done) => {
        chai.request(app).get(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                expect(res.body.data).to.have.property('message');
                expect(res.body.data).to.have.property('entryFound');
                expect(res.body.data.entryFound).to.be.a('object');
            });
        done();
    });
});
describe('Delete an entry', () => {
    it('Should Not delete an entry : entry id not found', (done) => {
        chai.request(app).delete(`/api/v1/entries/${testEntry[5].entryId}/`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Entry with such id not found');
            });
        done();
    });
    it('Should not delete an entry: not yours to delete', (done) => {
        chai.request(app).delete(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[7].token)
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Not yours to delete');
            });
        done();
    });
    it('Should not delete an entry: token not provided', (done) => {
        chai.request(app).delete(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[8].token)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal('Token not provided');
            });
        done();
    });
    it('Should not delete an entry: Invalid params', (done) => {
        chai.request(app).patch(`/api/v1/entries/${testEntry[4].entryId}`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body.error).to.equal(' title  is required');
                done();
            });
    });
    it('Should allow successfully: entry deleted successfully', (done) => {
        chai.request(app).delete(`/api/v1/entries/${testEntry[3].entryId}`)
            .set('Authorization', testEntry[6].token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('message');
                expect(res.body.data.message).to.equal('Entry successfully deleted');
            });
        done();
    });
});
