const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        mobile:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role: {
            type:String,
            default: 'user'
        }, 
        isBlocked: {
            type:Boolean,
            default: false
        },
        cart: {
            type:Array,
            default: [],
        },
        address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,
    }
);

// password encryption by using bcrypt. Install bcrypt: npm i bcrypt --save-dev
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(saltRounds);
    this.password = await bcrypt.hashSync(this.password, salt);
});

// match the encrypted password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model('User', userSchema);