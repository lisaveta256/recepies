module.exports = (sequelize, Sequelize)=>{
    const Gas = sequelize.define('gases',{
       name: {type:Sequelize.TEXT},
       flow:{type:Sequelize.FLOAT},
       mode:{type:Sequelize.INTEGER} 
    });
    return Gas;
}