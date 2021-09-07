module.exports = (sequelize, Sequelize) => {
    const Process = sequelize.define('processes',{
        name: {type:Sequelize.TEXT},
        cleaning: {type:Sequelize.INTEGER},
        layer: {type:Sequelize.INTEGER},
        gas: {type:Sequelize.INTEGER},
        time: {type:Sequelize.INTEGER}
    })
    return Process;
}