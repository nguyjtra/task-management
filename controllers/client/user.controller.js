
const user=require('../../models/user.model')
const md5=require('md5')
const helper=require('../../helpers/generate.helper')
module.exports.register=async(req,res)=>{
    try {
        const exitUser=await user.findOne({
            email:req.body.email,
            deleted:false
        })
        if(exitUser){
            res.json({code: 400,message:"email exit"})
            return ;
        }
        const data={
            fullName:req.body.fullName,
            email:req.body.email,
            password:md5(req.body.password),
            token:helper.generateRandomString(30)
        }


        let newUser=new user(data)
        await newUser.save();
        res.json({code: 200,
                message:"success",
                token:data.token
            })
    } catch (error) {
        res.json({
            code: 400,
            message:"error"
        })
    }
}