import { Request, Response } from 'express';
  
import { User } from '../model/user';
import { AppDataSource } from '../../config/db';
 

const userRepository = AppDataSource.getRepository(User);

async function getUser (req: Request, res: Response){
    try{
        const user = await userRepository.find();
        console.log(user)
        res.status(200).json({message:"User found Successfully", result :user})
    }catch(error){
        console.log(error)
        res.status(404).json({Message: "Somthing wnet wrong", error: error})
    }
}

async function addUser(req: Request, res: Response){
    const { userName, email, mobile, address, password} = req.body
    console.log(req.body)
    try{
        if(!userName || !email || !mobile || !address || !password){
            return res.status(401).json(" All fields are required")
        }
        const addUser = userRepository.create({
            userName, email, mobile, address, password 
        })
        await userRepository.save(addUser)
        res.status(200).json({message: "User created successfuly", result: addUser});
    }catch(error){
       console.log(error)
        res.status(404).json({message: "Somthing went wrong", error: error})
    }
}

async function updateUser ( req: Request, res: Response){
    const { id } = req.params;
    try{
        const user = await userRepository.findOneBy({ id: parseInt(id) })

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        userRepository.merge(user, req.body)

        const updatedUser = await userRepository.save(user)

        res.status(200).json({message: "User updated successfuly", result: updatedUser})

    }catch(error){
        res.status(404).json({message: "Somthing went wrong", error: error})
    }
}

async function deleteUser(req: Request, res: Response){
    const { id } = req.params;
    try{
        const result = await userRepository.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        res.status(404).json({message: 'Somting went wrong', error: error})
    }
}

export {getUser, addUser, updateUser, deleteUser}
