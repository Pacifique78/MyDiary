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
        const selectQuerry = 'SELECT * FROM entries WHERE id=$1;';
        const entryFound = await querry(selectQuerry, [id]);
        if (entryFound[0] && checkOwner(req, entryFound[0].createdby)) {
            const deleteQuerry = 'DELETE FROM entries WHERE id=$1;';
            await querry(deleteQuerry, [id]);
            return res.status(200).json({
                status: 200,
                message: 'Entry successfully deleted',
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Entry not found',
        });
    }

    async getEntries(req, res) {
        const selectQuerry = 'SELECT * FROM entries WHERE createdby=$1;';
        const value = [req.tokenData.id];
        const results = await querry(selectQuerry, value);
        return res.status(200).json({
            status: 200,
            message: 'Entries successfully retreived',
            data: {
                results,
            },
        });
    }

    async getSpecificEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const selectQuerry = 'SELECT * FROM entries WHERE id=$1;';
        const entryFound = await querry(selectQuerry, [id]);
        if (entryFound[0] && checkOwner(req, entryFound[0].createdby)) {
            return res.status(200).json({
                status: 200,
                message: 'entry successfully retrieved',
                data: entryFound[0],
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'entry not found',
        });
    }
}
export default EntryClass;
