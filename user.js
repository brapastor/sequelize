var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
var connection = new Sequelize('demosq','root','',{
  host: 'localhost',
  port: 3306,
  logging: false,
  dialect: 'mysql',
});

var User = connection.define('User',
{
  username:Sequelize.TEXT,
  password: Sequelize.TEXT
},
{
  hooks:{
      afterValidate: function(user){
        user.password = bcrypt.hashSync(user.password, 8);
      },

    }
  },
{
    timestamps:true
}
);


connection
.sync({
  force:false,
  logging:console.log
})
.then(function(){
  //LLENAR DATOS
    return User.create({
    username:'joao',
    password: 'this is a password'
  });
})
.catch(function(err){
  console.log('err',err);
});
