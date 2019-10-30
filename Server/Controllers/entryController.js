import moment from 'moment';
import entries from '../Model/entriesModel';

class EntryClass {
    async createEntry(req, res) {
        try {
            const { title } = req.body;
            const myEntries = entries.filter((entry) => entry.createdBy === req.tokenData.email);
            const entryFound = myEntries.find(myEntrie => myEntrie.title === title);
            return res.status(409).json({
                status: 409,
                error: `Entry with ${entryFound.title} title already exists`,
            });
        } catch (error) {
            const { title, description } = req.body;
            const id = entries.length + 1;
            const createdBy = req.tokenData.email;
            const createdOn = moment().format('LLL');
            const newEntry = {
                id,
                createdBy,
                createdOn,
                title,
                description,
            };
            entries.push(newEntry);
            return res.status(201).json({
                status: 201,
                data: {
                    id,
                    message: 'Entry created successfully',
                    createdOn,
                    title,
                    description,
                },
            });
        }
    }

    modifyEntry(req, res) {
        try {
            const id = parseInt(req.params.entryId, 10);
            const {
                title,
                description,
            } = req.body;
            const entryFound = entries.find(entry => entry.id === id);
            if (entryFound.createdBy === req.tokenData.email) {
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
            }
            return res.status(403).json({
                status: 403,
                error: 'Not yours to modify',
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'Entry with such id not found',
            });
        }
    }

    deleteEntry(req, res) {
        try {
            const id = parseInt(req.params.entryId, 10);
            const entryFound = entries.find(entry => entry.id === id);
            if (entryFound.createdBy === req.tokenData.email) {
                entries.splice(entryFound, 1);
                return res.status(200).json({
                    status: 200,
                    data: {
                        message: 'Entry successfully deleted',
                    },
                });
            }
            return res.status(403).json({
                status: 403,
                error: 'Not yours to delete',
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'Entry with such id not found',
            });
        }
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

    getSpecificEntry(req, res) {
        try {
            const id = parseInt(req.params.entryId, 10);
            const entryFound = entries.find(entry => entry.id === id);
            if (entryFound.createdBy === req.tokenData.email) {
                return res.status(200).json({
                    status: 200,
                    data: {
                        message: 'entry successfully retrieved',
                        entryFound,
                    },
                });
            }
            return res.status(403).json({
                status: 403,
                error: 'This entry does not belong to you',
            });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: 'Entry with such id not found',
            });
        }
    }
}
const eClass = new EntryClass();
export default eClass;
