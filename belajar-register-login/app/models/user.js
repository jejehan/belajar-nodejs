var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        email   : String,
        password: String
    }
});

//fungsi untuk menggenerate passoword menjadi terenkripsi
userSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

//fungsi untuk mengecek apakah password sudah benar?
userSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
