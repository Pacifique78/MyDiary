import moment from 'moment';
import checkOwner from '../helpers/checkOwner';
import { querry } from '../db';

class EntryClass {
    async createEntry(req, res) {
        const { title, description } = req.body;
        const createdBy = await req.tokenData.id;
        const createdOn = moment().format('LLL');
        const insertQuery = 'INSERT INTO entries (createdby, createdon, title, description, editedOn) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
        const values = [createdBy, createdOn, title, description, createdOn];
        const result = await querry(insertQuery, values);
        const data = result[0];
        return res.status(201).json({
            status: 201,
            message: 'Entry created successfully',
            data: {
                data,
            },
        });
    }

    async modifyEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const { title, description } = req.body;
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.createdBy));
        if (entryFound) {
            const editedOn = moment().format('LLL');
            entryFound.title = title;
            entryFound.description = description;
            entryFound.editedOn = editedOn;
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'Entry successfully edited',
                    id,
                    title,
                    description,
                    editedOn,
                },
            });
        } return res.status(404).json({
            status: 404,
            error: 'Entry not found',
        });
    }

    async deleteEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.createdBy));
        if (entryFound) {
            entries.splice(entryFound, 1);
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'Entry successfully deleted',
                },
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Entry not found',
        });
    }

    getEntries(req, res) {
        const myEntries = entries.filter((entry) => entry.createdBy === req.tokenData.id);
        return res.status(200).json({
            status: 200,
            data: {
                message: 'Entries successfully retreived',
                myEntries,
            },
        });
    }

    async getSpecificEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.createdBy));
        if (entryFound) {
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'entry successfully retrieved',
                    entryFound,
                },
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'entry not found',
        });
    }
}
const eClass = new EntryClass();
export default eClass;
