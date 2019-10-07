import bcrypt from 'bcrypt';
import users from '../Model/userModel';
import jwt from 'jsonwebtoken';
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
                    token
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
}
const newClass = new usersClass();
export default newClass;