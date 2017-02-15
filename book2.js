var Sequelize = require('sequelize');
var connection = new Sequelize('demosq','root','',{
  host: 'localhost',
  port: 3306,
  logging: false,
  dialect: 'mysql',
});

var Book = connection.define('books',
{
  title:Sequelize.TEXT,
  body: Sequelize.TEXT,
  approved:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
  }
},
{
    timestamps:true
});

connection
.sync({
  force:true,
  logging:console.log
})
.then(function(){
  Book.bulkCreate([
    {
      title:'Articulo 1',
      body:'Articulo 1',
    },
    {
      title:'Articulo 2',
      body:'Articulo 2',
    }
  ],{
    validate:true,
    ignoreDuplicates:true
  }).then(function(){

  });
}).catch(function(error){
  console.log('err',err);
});
