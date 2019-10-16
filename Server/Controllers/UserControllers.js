import bcrypt from 'bcrypt';
import users from '../Model/userModel';
import entries from '../Model/entriesModel';
import jwt from 'jsonwebtoken';
import moment from 'moment';
class usersClass{
    async createUser(req, res){
        const{email} = req.body;
        const userFound = users.find(user => user.email === email);
        if(userFound){
            res.status(409).json({
                status: 409,
                'error': 'user with such email already exists'
            });
        }
        else{
            const {firstName, lastName, email, password} = req.body;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = {firstName, lastName, email, hashedPassword};
            users.push(newUser);
            const token = await jwt.sign({
                firstName, lastName, email
            }, process.env.secret, {
                expiresIn: '7d'
            });
            return res.status(201).json({
                status:201,
                message: 'User created',
                data: {
                    firstName,
                    lastName,
                    email
                },
                token
            });
        }
    }
    async login(req, res){
        const {email, password} = req.body;
        const userFound = users.find(user => user.email === email);
        if(userFound){
            const {firstName, lastName, password:hashedPassword} = userFound;
            const compare = await bcrypt.compare(password, hashedPassword);
            if(compare){
                const token = await jwt.sign({
                    firstName, lastName, email
                }, process.env.secret,{
                    expiresIn: '7d'}
                );
                return res.status(200).json({
                    status: 200,
                    message: 'User logged in successfully',
                    data: {
                        token
                    }
                });
            }
            return res.status(401).json({
                status: 401,
                error: 'incorrect password'
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Email not found'
        });
    }
    async createEntry(req, res){
        const {title, description} = req.body;
        const myEntries = [];
        for(let entry of entries){
            if(entry.createdBy === req.tokenData.email){
                myEntries.push(entry);
            }
        }
        const entryFound = myEntries.find(myEntrie=>myEntrie.title === title);
        if(entryFound){
            return res.status(409).json({
                status:409,
                error: 'Entry with such title already exists'
            });
        }
        else{
            const id = entries.length + 1, createdBy = req.tokenData.email, createdOn = moment().format('LLL');
            const newEntry = {id, createdBy, createdOn, title, description};
            entries.push(newEntry);
            return res.status(201).json({
                status:201,
                data: {
                    id,
                    message:'Entry created successfully',
                    createdOn,
                    title,
                    description
                }
            });
        }
    }
    modifyEntry(req, res){
        const id = parseInt(req.params.entryId);
        const {title, description} = req.body;
        const entryFound = entries.find(entry=>entry.id === id);
        if(!entryFound){
            return res.status(404).json({
                status:404,
                error: 'Entry with such id not found'
            });
        }
        else{
            if(entryFound.createdBy === req.tokenData.email){
                entryFound.title = title;
                entryFound.description = description;
                return res.status(200).json({
                    status:201,
                    data: {
                        message:'Entry successfully edited',
                        id,
                        title,
                        description
                    }
                });
            }
            return res.status(401).json({
                status:401,
                error: 'Not yours to modify'
            });
        }
    }
    deleteEntry(req, res){
        const id = parseInt(req.params.entryId);
        const entryFound = entries.find(entry=>entry.id === id);
        if(!entryFound){
            return res.status(404).json({
                status:404,
                error: 'Entry with such id not found'
            });
        }
        else{
            if(entryFound.createdBy === req.tokenData.email){
                entries.splice(entryFound, 1);
                return res.status(200).json({
                    status:200,
                    data: {
                        message:'Entry successfully deleted'
                    }
                });
            }
            return res.status(401).json({
                status:401,
                error: 'Not yours to delete'
            });
        }
    }
    getEntries(req, res){
        const myEntries = [];
        for(let entry of entries){
            if(entry.createdBy === req.tokenData.email){
                myEntries.push(entry);
            }
        }
        return res.status(200).json({
            status:200,
            data: myEntries
        });
    }
    getSpecificEntry(req, res){
        const id = parseInt(req.params.entryId);
        const entryFound = entries.find(entry=>entry.id === id);
        if(!entryFound){
            return res.status(404).json({
                status:404,
                error: 'Entry with such id not found'
            });
        }
        else{
            if(entryFound.createdBy === req.tokenData.email){
                return res.status(200).json({
                    status:200,
                    data: entryFound
                });
            }
            return res.status(401).json({
                status:401,
                error: 'This entry does not belong to you'
            });
        }
    }
}
const newClass = new usersClass();
export default newClass;