const { randomBytes,createHmac } = require('crypto');
const { Schema,model } = require('mongoose');


const userSchema = new Schema ({

    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type : String,
        
    },
    password:{
        type: String,
        required : true,
    },
    profileImageURL: {
        type: String,
        default: "/images/avatar.png",
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default:  "USER",
    }
}, {timestamps :true}
);

userSchema.pre("save",function (next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    console.log(salt);
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");
    

    this.salt = salt;
    this.password = hashedPassword;

    next();

})

userSchema.static("matchPassword",async function(email,password){
    console.log("static method");
    const user = await this.findOne({email});
    console.log(email);
    console.log(user);
    if(!user)  throw new Error('User not found!');

    const salt = user.salt;                  // registered user on DB during signup
    const hashedPassword = user.password;

    const userProvidedHash =  createHmac('sha256',salt)
    .update(password)
    .digest("hex");

    console.log("hashed",hashedPassword);
    console.log("user",userProvidedHash);
    
    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password!');
    return {...user, password: undefined, salt:undefined};

})

const User =  model("user",userSchema);

module.exports = User;