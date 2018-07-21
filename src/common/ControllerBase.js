import routerConfig from './routerConfig';

class ControllerBase {
	initializeRouter(controller, routeName) {
		this.routerConfig = routerConfig(controller, routeName);
	}

	/// Adiciona uma rota customizada
	addAction(method, path, handler) {
		this.routerConfig.actions.push({ path, handler, method });
	}

	OkResult(content) {
		return { status: 200, content };
	}
	
	CreatedResult(content) {
		return { status: 201, content };
	}
	
	InternalServerErrorResult(content) {
		return { status: 500, content };
	}
	
	async applyResult(handler, res, next) {
		let result;

		try {
			result = await handler();
		} catch (err) {
			console.error(err.stack);
			result = this.InternalServerErrorResult('Ocorreu um erro interno.')
		}

		res.status(result.status).send(result.content);
	};
}

export default ControllerBase;