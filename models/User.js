const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
});

userSchema.statics.register = async function(username, email, password) {
    if(!username || !email || !password) {
        throw Error("All the fields must be filled!");
    }

    if(!validator.isEmail(email)) {
        throw Error("Please enter a valid email!");
    }

    const usedUsername = this.find({ username });
    const usedEmail = this.find({ email });

    if(usedUsername) {
        throw Error('This username is already in use!');
    }

    if(usedEmail) {
        throw Error("This email is already in use!");
    }

    const salt = await bcrypt.genSalt(13)
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({ username, email, password:hash });
    console.log(user);

    return user;

}

const userModel = mongoose.model('user',userSchema);