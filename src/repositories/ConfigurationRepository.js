import Sequelize from 'sequelize';

export default class ConfigurationRepository {
	constructor(appServices) {
		this.db = appServices.dbContext;
		this.logger = appServices.logger;
	}

	async findAll(filter) {
		this.logger.debug(`Buscando configurações ${filter}`);
		
		const configurations = await this.db.Configurations.findAll({ where: { ...filter }});
		
		this.logger.debug(`Configurações encontradas ${configurations.length}`);

		return configurations;
	}
	
	async findOne(id) {
		this.logger.debug(`Buscando configuração ${id}`);

		const configuration = await this.db.Configurations.findOne({ where: { id }});

		this.logger.debug('Configuração encontrada: ', configuration.name);

		return configuration;
	}

	async create(configuration) {
		this.logger.debug(`Criando configuração ${JSON.stringify(configuration)}`);

		const result = await this.db.Configurations.create(configuration);
		const configurationId = result && result.length > 0 && result[0];

		this.logger.debug(`Configuração criada. Id: ${configurationId}`);

		return configurationId;
	}

	async update(id, configuration) {
		this.logger.debug(`Alterando configuração ${id}. Dados: ${configuration}`);

		const result = await this.db.Configurations.update(configuration, { where: { id }});
		const affectedRows = result && result.length > 0 && result[1];

		this.logger.debug(affectedRows === 1 ? `Configuração alterada.` : `Nada para alterar.`);

		return configurationId;
	}

	async delete(id) {
		this.db.Configurations.destroy({ where: { id }})
	}
}