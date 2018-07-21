import ExpressServer from './common/ExpressServer';
import Controllers from './controllers/';
import envConfig from './defaultConfiguration';
import DbContext from './database/DbContext';

(async function () {
	try {
		const server = new ExpressServer();

		server.configure();

		const { port, connectionStringUri } = envConfig;
		const dbContext = connectionStringUri ? new DbContext(connectionStringUri) : undefined;

		// const logger = managementClient.Logger();
		const logger = {
			info: (message, source) => console.log(`[${source}] ${message}`),
			debug: (message, source) => console.debug(`[${source}] ${message}`),
			error: (message, source) => console.error(`[${source}] ${message}`),
			warning: (message, source) => console.warn(`[${source}] ${message}`),
		};
		
		const AppServices = {
			logger,
			dbContext,
		};
		
		// Os serviços serão disponibilizados na controller conforme a ordem de inserção
		server.addService(AppServices);
		
		// Adicionando as controllers
		server.addController(Controllers.ConfigurationController);

		server.start(port);
	} catch(err) {
		console.error('Não foi possível iniciar a API.\r\n');
		console.error(err.stack);
	}
})();