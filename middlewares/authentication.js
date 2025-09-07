const { validateToken } = require("../services/authentication");


function checkForAuthenticationCookie(cookieName){
    //console.log("cookieName",cookieName);
    return (req,res,next)=>{
        //console.log("req.cookies",req.cookies);
    const tokenCookieValue = req.cookies[cookieName];
    
    if(!tokenCookieValue){
       return  next();
    } 


         try{
            
        const userPayload = validateToken(tokenCookieValue);
        
        req.user = userPayload;
         } catch(error){console.error("Token validation failed:", error.message);}
         return next();
        
};
}

module.exports = {
    checkForAuthenticationCookie,
}