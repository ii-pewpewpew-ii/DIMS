const sequelize = require("../utils").dbConnection;
const Sequelize = require("sequelize");

const User = sequelize.define("User",{
    emailid : {
        type : Sequelize.TEXT,
        allowNull : false,
        unique : true,
        validate : {isEmail : true, notNull : true, notEmpty : true}
    },
    password : {
        allowNull : false,
        type : Sequelize.TEXT
    },
    userid : {
        primaryKey : true,
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true
    },
    username : {
        type : Sequelize.TEXT,
        allowNull : false,
        unique : true
    }
});

const UserProfile = sequelize.define("user_profile",{
    username : {
        primaryKey : true,
        type : Sequelize.TEXT,
        allowNull : false,
        unique : true
    },
    firstname : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    lastname : {
        type : Sequelize.TEXT,
        allowNull : true
    }
});

User.hasOne(UserProfile,{
    foreignKey : 'username',
    sourceKey: 'username'
});

UserProfile.belongsTo(User,{
    foreignKey : 'username',
    targetKey: 'username'
});

module.exports = {
    User,
    UserProfile
};