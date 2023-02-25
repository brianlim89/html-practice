// require mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// we need get schema from mongoose
const Schema = mongoose.Schema;

// we need to create user schema

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

userSchema.pre('save', async function(next) {
    const saltRounds= 1;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
})




const User = mongoose.model('user', userSchema);

module.exports = User;