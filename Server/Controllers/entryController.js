import moment from 'moment';
import entries from '../Model/entriesModel';
import checkOwner from '../helpers/checkOwner';

class EntryClass {
    async createEntry(req, res) {
        const { title, description } = req.body;
        const id = entries.length + 1;
        const createdBy = await req.tokenData.id;
        const createdOn = moment().format('LLL');
        const newEntry = {
            id, createdBy, createdOn, title, description,
        };
        entries.push(newEntry);
        return res.status(201).json({
            status: 201,
            data: {
                message: 'Entry created successfully',
                id,
                createdOn,
                title,
                description,
            },
        });
    }

    async modifyEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const { title, description } = req.body;
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.createdBy));
        if (entryFound) {
            entryFound.title = title;
            entryFound.description = description;
            return res.status(200).json({
                status: 201,
                data: {
                    message: 'Entry successfully edited',
                    id,
                    title,
                    description,
                },
            });
        } return res.status(404).json({
            status: 404,
            error: 'Entry not found',
        });
    }

    async deleteEntry(req, res) {
        const id = parseInt(req.params.entryId, 10);
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.id));
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
        const myEntries = entries.filter((entry) => entry.createdBy === req.tokenData.email);
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
        const entryFound = await entries.find(entry => entry.id === id && checkOwner(req, entry.id));
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
