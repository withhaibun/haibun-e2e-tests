import { IRequest, IResponse } from '@haibun/web-server-express/build/defs.js';

import TestRoute from './test-server.js';

const newToken = 'newToken';

export const authRoutes = (testServer: TestRoute) => {
	return {
		async createAuthToken(req: IRequest, res: IResponse) {
			testServer.authToken = newToken;
			const token = `${newToken}`;

			res.json({
				token_type: 'Bearer',
				scope: 'openid profile User.Read email',
				expires_in: 5251,
				ext_expires_in: 5251,
				access_token: newToken,
				refresh_token: 'refreshToken',
				id_token: 'idToken',
				client_info: 'client_info',
			});
		},

		async checkAuthToken(req: IRequest, res: IResponse) {
			const token = req.headers.authorization?.replace('Bearer ', '');
			if (testServer.authToken === undefined || token !== testServer.authToken) {
				res.status(401).end('Unauthorized');
				return;
			}
			res.status(200).end('OK');
		},

		async logOut(req: IRequest, res: IResponse) {
			testServer.authToken = undefined;
			const redirectTo = req.query.redirect_uri;
			res.redirect(redirectTo!?.toString());
		},

		async resourceGet(req: IRequest, res: IResponse) {
			const id = parseInt(req.params.id ?? '', 10);
			const resource = testServer.resources.find((r) => r.id === id);
			if (resource) {
				res.json(resource);
			} else {
				res.status(404).end('Not Found');
			}
		},
		async resourceDelete(req: IRequest, res: IResponse) {
			const id = parseInt(req.params.id ?? '', 10);
			const resource = testServer.resources.find((r) => r.id === id);
			if (resource) {
				testServer.resources = testServer.resources.filter((r) => r.id !== id);
				res.status(204).end();
			} else {
				res.status(404).end('Not Found');
			}
		},
		async resources(req: IRequest, res: IResponse) {
			res.json(testServer.resources);
		},
	};
};
