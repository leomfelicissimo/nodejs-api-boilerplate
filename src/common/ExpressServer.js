import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';

class ExpressServer {
	constructor() {
		this.app = express();
		this.configuration = undefined;
		this.services = [];
	}

	addController(Controller) {
		console.log(`Adicionando controller: ${Controller.name}`);
		const controller = new Controller(...this.services);
		const { routerConfig } = controller;

		routerConfig.actions.forEach(action => {
			const path = `${routerConfig.routeName}${action.path}`;
			console.log(path);
			switch (action.method) {
				case 'get':
					this.app.get(path, action.handler);
					break;
				case 'post':
					this.app.post(path, action.handler);
					break;
				case 'put':
					this.app.put(path, action.handler);
					break;
				case 'delete':
					this.app.delete(path, action.handler);
					break;
				default:
					console.warn('Este método não é válido.');
					break;
			}
		});
		
		// this.app.use(`/${routerConfig.routeName}`, controllerRouter);
	}

	addService(service) {
		this.services.push(service);
	}

	configure(middleware) {
		console.log('Aplicando configurações a API');
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(compression());
		this.app.use(cors());

		(middleware && middleware(this.app));

		console.log('Express configurado');
	}

	start(port) {
		console.log('Iniciando API... ');
		
		this.app.listen(port, (err) => {
			if (err) {
				console.log("Ocorreu um erro ao iniciar a API. ");
				console.log(err);
				process.exit(-1);
			}
			
			console.log(`API Iniciada. Executando na porta: ${port}`);
		});
	}
}

export default ExpressServer;