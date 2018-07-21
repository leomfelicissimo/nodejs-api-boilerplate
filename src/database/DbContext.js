import SequelizeDbContext from "../common/SequelizeDbContext";
import { configurationSchema } from './schemas';

class DbContext extends SequelizeDbContext {
	constructor(connectionUri) {
		super(connectionUri);
	}

	get Configurations() {
		return this.sequelize.define('configuration', configurationSchema, {
			schema: 'admin',
			tableName: 'configurations',
			timestamps: false,
		});
	}
}

export default DbContext;