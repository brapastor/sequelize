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
  //LLENAR DATOS
  var req = {
    body:{
      approved:true,
      title:'otr librssssso',
      body:'Someos la furi'
    }
  }
  Book.create(req.body, {
    fields:['title','body']
  }).then(function (insertBook) {
    console.log(insertBook.dataValues);
  })

  // var bookIntance = Book.build({
  //     title:'Some titleaa',
  //     body:'Someos la furi'
  //   });
  //   bookIntance.save();


}).catch(function(error){
  console.log('err',err);
});
