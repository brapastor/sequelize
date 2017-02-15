var Sequelize = require('sequelize');
var connection = new Sequelize('demosq','root','',{
  host: 'localhost',
  port: 3306,
  logging: false,
  dialect: 'mysql',
});

var Article = connection.define('article',
{
  slug:{
    type:Sequelize.STRING,
    primaryKey:true
  },
  title:{
    type:Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate:{
      len:{
        args:[10,150],
        msg: "Pendejo mete mas"
      }
    }
  },
  body:{
    type:Sequelize.TEXT,
    validate:{
      startsWithUpper: function(bodyVal){
        var first = bodyVal.charAt(0);
        var startsWithUpper = first === first.toUpperCase();
        if(!startsWithUpper){
          throw new Error('la primera letra no es mayuscula!')
        }
        else{
          //...
        }
      }
    }
    // defaultValue:'comming soon...'
  }
},
{
  hooks:{
      beforeValidate: function() {
      console.log('beforeValidate');
      },
      afterValidate: function(){
        console.log('afterValidate');

      },
      beforeCreate: function(){
        console.log('beforeCreate');
      },
      afterCreate: function(res){
        console.log('afterCreate:Creado articulo con slug', res.dataValues.slug);

      }
    }
  },
{
    timestamps:true
}


);

connection
.sync({
  force:true,
  logging:console.log
})
.then(function(){
  //LLENAR DATOS
  Article.create({
    title:'Some title',
    slug: 'some-slusg',
    body:'Someos la furi'
  });

  //BUSCAR DATOS SEGUN ID
  // Article.findById(1).then(function(article){
  //   console.log(article.dataValues);
  // })

  //BUSCAR TODOS
  // Article.findAll().then(function(articles){
    // console.log(articles.length);
  // });


}).catch(function(error){
  console.log('err',err);
});
