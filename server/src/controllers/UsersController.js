const User = require('../models/User');
const AppError = require('../utils/appError');
const sendMail = require('../utils/email');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

class UsersController {
    async index (request, response) {
        try {
            const user = await User.findById(request.userid);

            if (user && user.profile !== 'admin') {
                return response.status(403).json({ message: 'Not allowed' });
            }

            const users = await User.find({}, { password: 0 });

            response.status(200).send(users);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async show (request, response) {
        try {
            const { registry } = request.params;
            const user = await User.findOne({ registry }, { password: 0 });

            if (user) {
                response.status(200).send(user);
            } else {
                response.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async update (request, response) {
        try {
            const { registry } = request.params;
            const user = await User.findOne({ registry });

            if (user) {
                const body = request.body;

                await User.findOneAndUpdate({ registry }, { $set: body });

                response.status(200).json({ message: 'OK' });
            } else {
                response.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async destroy (request, response) {
        try {
            const { registry } = request.params;
            const user = await User.findOne({ registry });

            if (user) {
                if (user.profile === 'admin') {
                    await User.findOneAndDelete({ registry });
                    response.status(200).json({ message: 'OK' });
                } else {
                    response.status(403).json({ message: 'Not allowed' });
                }
            } else {
                response.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async forgotPassword (req, res, next) {
        try {
            // 1) Get user based on posted email
            const user = await User.findOne({ email: req.body.email });
            if(!user){
                return next(new AppError('There is no user with email address specified!',404));
            }
            // 2) Generate random token
            const resetToken = user.createPasswordResetToken();
            await user.save({ validateBeforeSave : false });
            // 3) Send it to user's email 
            const resetURL = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`;
            const message = `Forgot your password? Submit a PATCH request with a new password to ${resetURL}\n If you didn't forget your password, please ignore this email!`;
            try {
                await sendMail({
                    email: req.body.email,
                    subject: 'Your password reset token (valid for 10 min)',
                    message: message
                });
                res.status(200).json({
                    status: 'success',
                    message: 'Token sent to email!'
                });
            } 
            catch (err) {
                console.log(err);
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save({ validateBeforeSave : false });
                return next(new AppError('Error sending email Try again later!',500));
            }
        } catch (err) {
            
            res.status(500).json({ status : 'fail' , message: err.message });
        }
    }

    async resetPassword(req, res, next) {

        try {

            // 1) Get user based on token
            const hashedToken = crypto.createHash('sha512').update(req.params.token).digest('hex');
            
            const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt:Date.now() } });

            
            // 2) If token not expired && user exists, set the new password
            if (!user) {
                return next(new AppError('Token is invalid or has expired',400));
            }
            user.password = bcrypt.hashSync(req.body.password, 10);
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
        
            await user.save();

            res.status(200).json({
                status: 'success',
                message: 'New password saved successfully!!'
            });
            
        } 
        catch (error) {
            res.status(500).json({ status : 'fail' , message: error.message });
        }
    }

}

module.exports = UsersController;
