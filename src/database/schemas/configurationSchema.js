import Sequelize from 'sequelize';

const configurationSchema = {
	id: {
		type: Sequelize.INTEGER,
		field: 'configuration_id',
		primaryKey: true,
		autoIncrement: true,
	},
	serverAddress: { type: Sequelize.STRING, field: 'configuration_server_address' },
	applicationName: { type: Sequelize.STRING, field: 'configuration_application_name' },
	description: { type: Sequelize.STRING, field: 'configuration_description' },
	name: { type: Sequelize.INTEGER, field: 'configuration_name' },
	value: { type: Sequelize.STRING, field: 'configuration_value' },
	createdAt: { type: Sequelize.DATE, field: 'configuration_created_at' },
	updatedAt: { type: Sequelize.DATE, field: 'configuration_updated_at' },
};

export default configurationSchema;