export default (controller, routeName) => ({
	routeName: `/${routeName}`,
	actions: [
		{
			path: '/',
			handler: (req, res, next) =>
				controller.applyResult(() => controller.get(req.query), res, next),
			method: 'get',
		},
		{
			path: '/:id',
			handler: (req, res, next) =>
				controller.applyResult(() => controller.getById(req.params.id), res, next),
			method: 'get',
		},
		{
			path: '/',
			handler: (req, res, next) => {
				console.log(`POST: `, req.body);
				controller.applyResult(() => controller.post(req.body), res, next)
			},
			method: 'post',
		},
		{
			path: '/:id',
			handler: (req, res, next) =>
				controller.applyResult(() => controller.put(req.params.id, req.body), res, next),
			method: 'put',
		},
		{
			path: '/:id',
			handler: (req, res, next) =>
				controller.applyResult(() => controller.delete(req.params.id, req.body), res, next),
			method: 'delete',
		},
	]
});