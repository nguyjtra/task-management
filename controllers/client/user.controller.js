
const user=require('../../models/user.model')
const md5=require('md5')
const helper=require('../../helpers/generate.helper')
const ForgotPassword=require('../../models/forgot-password.model')
const sendEmailHelper=require('../../helpers/sendEmail.helper')
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

module.exports.login=async (req,res)=>{
    try {
        const email=req.body.email
        const pass=req.body.password
        const exitUser=await user.findOne({
            email:email,
            deleted:false
        })

        if(!exitUser){
            res.json({
                code:400,
                message:"email not exit"
            })
            return;
        }
        else{
            if(md5(pass)!=exitUser.password){
                res.json({
                    code:400,
                    message:"wrong password"
                })
                return; 
            }
        }
        res.json({
            code:200,
            message:"success",
            token:exitUser.token
        })
    } catch (error) {
        res.json({
            code:400,
            message:"error"
        })
    }
}

module.exports.forgot=async(req,res)=>{
    try {
        const email=req.body.email
        const User = await user.findOne({
            email: email,
            deleted: false
          });
        console.log(User)
          if(!User) {
            res.json({
              code: 400,
              message: "Email not exit !"
            });
            return;
          }
        
          const otp = helper.generateRandomNumber(6);
        
          // Việc 1: Lưu email, OTP vào database
          const forgotPasswordData = {
            email: email,
            otp: otp,
            expireAt: Date.now() + 3*60*1000
          };
        
          const forgotPassword = new ForgotPassword(forgotPasswordData);
          await forgotPassword.save();
        
          // Việc 2: Gửi mã OTP qua email của user
          const subject = "your OTP is.";
          const htmlSendMail = ` <b style="color: green;">${otp}</b>. Expire in 3 minute .`;
          sendEmailHelper.sendEmail(email, subject, htmlSendMail);
        
        res.json({
            message:"OTP send !",
            code:200
        })
    } catch (error) {
        res.json({
            message:"error",
            code:400
        })
    }
   
}

module.exports.otp=async(req,res)=>{
    try {
        const email=req.body.email
        const otp=req.body.otp
        const result = await ForgotPassword.findOne({
            email: email,
            otp:otp
          });
          if(!result) {
            res.json({
              code: 400,
              message: "otp not exit !"
            });
            return;
          }    
        
        const User=await user.findOne({
            email: email,
        })
        res.json({
            message:"OTP match !",
            code:200,
            token:User.token
        })
    } catch (error) {
        res.json({
            message:"error",
            code:400
        })
    }
}

module.exports.reset=async(req,res)=>{
    try {
        const token=req.body.token
        const password=req.body.password
        await user.updateOne({
            token:token,
            deleted:false
        },{
            password:md5(password)
        })
        res.json({
            message:"reset success ",
            code:200
        })
    } catch (error) {
        res.json({
            message:"error",
            code:400
        })
    }
   

}

module.exports.profile=async(req,res)=>{
    try {
        let token=req.tokenVerify
        const User=await user.findOne({
            token:token,
            deleted:false
        }).select("-password -token")
       
        res.json({
            code:200,
            message:"success",
            user:User
        })
    } catch (error) {
        res.json({
            message:"error",
            code:400
        })
    }
}