import ControllerBase from '../common/ControllerBase';
import ConfigurationRepository from '../repositories/ConfigurationRepository';

class ConfigurationController extends ControllerBase {
	constructor(appServices) {
		super();
		
		this.logger = appServices.logger;
		this.repository = new ConfigurationRepository(appServices);

		this.initializeRouter(this, 'configuration');
	}

	async get(filter) {
		let result = {};

		try {
			this.logger.info('Buscando configuraçÕes cadastradas.', 'ConfigurationController/get');

			const content = await this.repository.findAll(filter);
			result = this.OkResult(content);

			this.logger.info('Busca realizada.', 'ConfigurationController/getById');
		} catch (err) {
			this.logger.error(err.message, 'ConfigurationController/get');
			result = this.InternalServerErrorResult(err.message);
		}

		return result;
	}

	async getById(id) {
		let result = {};

		try {
			this.logger.info('Buscando configuração por id.', 'ConfigurationController/getById');

			const content = await this.repository.findOne(id);
			result = this.OkResult(content);

			this.logger.info('Busca realizada.', 'ConfigurationController/getById');
		} catch (err) {
			this.logger.error(err.message, 'ConfigurationController/getById');
			result = this.InternalServerErrorResult(err.message);
		}

		return result;
	}

	async post(configuration) {
		let result = {};

		try {
			this.logger.info('Cadastrando nova configuração.', 'ConfigurationController/post');

			const content = await this.repository.create(configuration);
			result = this.CreatedResult(content);

			this.logger.info('Cadastro realizado.', 'ConfigurationController/post');
		} catch (err) {
			this.logger.error(err.message, 'ConfigurationController/post');
			result = this.InternalServerErrorResult(err.message);
		}

		return result;
	}

	async put(id, configuration) {
		let result = {};

		try {
			this.logger.info('Alterando configuração.', 'ConfigurationController/put');

			const content = await this.repository.update(id, configuration);
			result = this.OkResult(content);

			this.logger.info('Dados alterados.', 'ConfigurationController/put');
		} catch (err) {
			this.logger.error(err.message, 'ConfigurationController/put');
			result = this.InternalServerErrorResult(err.message);
		}

		return result;
	}

	async delete(id) {
		let result = {};

		try {
			this.logger.info('Excluindo configuração.', 'ConfigurationController/delete');

			const content = await this.repository.delete(id);
			result = this.OkResult(content);

			this.logger.info('Configuração excluído.', 'ConfigurationController/delete');
		} catch (err) {
			this.logger.error(err.message, 'ConfigurationController/put');
			result = this.InternalServerErrorResult(err.message);
		}

		return result;
	}
}

export default ConfigurationController;