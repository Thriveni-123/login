const LoginService = require('../service/LoginService');
const constants = require('../constants');

module.exports.Login =  async (req,res) => {
    globalRes = res;
    try {
        await LoginService.Login(req,LoginResponse);
    }catch(error){
        console.log('Something went wrong: Controller : Login',error); 
    }
}

function LoginResponse(err, result,type) {
    let response = {...constants.defaultServerResponse};
    try {
            if(err){
                response.message = err.message;
            }else {
                const responseFromService =  result;
               
                if(type == 1)  
                {
                    response.status = 202;
                    response.message = constants.LOGINMESSAGE.PROFILE_FETCH;
                }  
                else 
                {
                    response.status = 200;
                    response.message = constants.LOGINMESSAGE.ADDPROFILE;
                }
                    
                    response.body = responseFromService;
            }
     }catch(error){
        console.log('Something went wrong: Controller :LoginResponse',error);
        response.message = error.message; 
     }
     return globalRes.status(response.status).send(response);
  }
