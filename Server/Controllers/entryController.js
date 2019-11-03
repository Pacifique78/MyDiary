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
        const selectQuerry = 'SELECT * FROM entries WHERE id=$1';
        const entryFound = await querry(selectQuerry, [id]);
        if (entryFound[0] && checkOwner(req, entryFound[0].createdby)) {
            const editedOn = moment().format('LLL');
            const updateQuery = 'UPDATE entries SET title=$1, description=$2, editedOn=$3 WHERE id =$4 RETURNING *;';
            const values = [title, description, editedOn, id];
            const data = await querry(updateQuery, values);
            entryFound.title = title;
            entryFound.description = description;
            entryFound.editedOn = editedOn;
            return res.status(200).json({
                status: 200,
                message: 'Entry successfully edited',
                data: data[0],
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
