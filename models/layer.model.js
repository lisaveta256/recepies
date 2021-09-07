module.exports = (sequelize, Sequelize)=>{
    const Layer = sequelize.define('layers', {
        name: {type:Sequelize.TEXT},
        power: {type:Sequelize.INTEGER},
        time: {type:Sequelize.INTEGER}
    });
    return Layer;
}