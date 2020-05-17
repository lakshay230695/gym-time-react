/* eslint-disable */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Schema
var UserSchema = new Schema({
    Password: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    EmailId: { type: String, unique: true, required: true, match: /.+\@.+\..+/, index: true },
    //Only for applicant
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

UserSchema.methods.findUsersWithSameEmail = function(callback) {
    return this.model("User").find({ EmailId: this.EmailId }, callback);
};

UserSchema.methods.findUserbyEmailandPassword = function() {
    return this.model("User")
        .find({ EmailId: this.EmailId, Password: this.Password })
        .limit(1)
        .then(obj => {
            return Promise.resolve(obj);
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

module.exports = mongoose.model("User", UserSchema);