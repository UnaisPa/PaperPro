import User from "../../database/entities/User.js"

const blockUserRepo = async (userName,action) =>{
    try{
        let updateUser;
        let message;
        let blocked;
        //console.log(action)
        switch(action){
            case 'block' : updateUser = await User.updateOne({userName:userName},{$set:{isBlocked:true}});
            message = 'User Blocked!'
            blocked=true
            break;
            case 'unblock' : updateUser = await User.updateOne({userName:userName},{$set:{isBlocked:false}});
            message = 'User Unblocked!'
            blocked=false
            break;
            default : message='Something went wrong!'
        }

        return {success:true,message:message,blocked:blocked}
        

    }catch(err){
        throw new Error(err)
    }
}

export default blockUserRepo;