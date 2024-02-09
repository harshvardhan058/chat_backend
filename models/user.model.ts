import mongoose from "mongoose"
// import jwt,{Secret} from "jsonwebtoken"
// import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        lowercase: true,
        trim: true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true
    },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true,
    //     lowercase: true,
    //     trim: true,
    //     index: true
    // },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    // avatar: {
    //     type: String, //cloudinary url
    //     required: true,
    // },
    // loginType:{
    //     type: String,
    //     // required:true,
    //     enum:["email","google","facebook","github"]
    // },
    // refreshToken:{
    //     type:String,
    // },
    profilePic:{
        type: String,
        default: ""
    }
},
{
    timestamps:true
})

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });
  
// userSchema.methods.isPasswordCorrect = async function (password:string) {
//     return await bcrypt.compare(password, this.password);
// };
  
// userSchema.methods.generateAccessToken = async function () {
//     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
//     return await jwt.sign(
//       {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullName: this.fullName,
//       },
//       accessTokenSecret as Secret,
//       {
//         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//       }
//     );
// };
  
// userSchema.methods.generateRefreshToken = async function () {
//     const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
//     return await jwt.sign(
//       {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullName: this.fullName,
//       },
//       refreshTokenSecret as Secret,
//       {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//       }
//     );
// };

export const User = mongoose.model("User",userSchema);