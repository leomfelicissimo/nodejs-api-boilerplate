import Sequelize from 'sequelize';

class SequelizeDbContext {
	constructor(connectionUri) {
		this.sequelize = new Sequelize(connectionUri, { dialect: 'postgres' });
	}
}

export default SequelizeDbContext;