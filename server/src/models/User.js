const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: [true, 'Missing name field']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Missing username field']
    },
    password: {
        type: String,
        required: [true, 'Missing password field']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Missing email field']
    },
    phone: {
        type: String,
        required: [true, 'Missing phone field']
    },
    registry: {
        type: Number,
        unique: true,
        required: [true, 'Missing registry field']
    },
    profile: {
        type: String,
        default: 'common'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    course: {
        type: String,
        required: [true, 'Missing course field']
    },
    semester: {
        type: Number,
        required: [true, 'Missing semester field']
    },
    posts: {
        type: Number,
        default: 0,
        required: [true, 'Missing posts field']
    },
    passwordChangedAt : Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});


// Função para criar um token aleatório para resetar o password do usuário
// Posteriormente, envia-se o token para o email do usuário
UserSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha512')
        .update(resetToken)
        .digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


module.exports = mongoose.model('User', UserSchema);
