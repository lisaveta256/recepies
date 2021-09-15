module.exports = (sequelize, Sequelize)=>{
    const Cleaning = sequelize.define('cleanings',{
       name: {type:Sequelize.TEXT},
       voltage:{type:Sequelize.INTEGER},
       time:{type:Sequelize.INTEGER},
       created:{type:Sequelize.DATE} 
    });
    return Cleaning;
}