import { rmSync } from 'fs';
import fileUpload from 'express-fileupload';

import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/build/lib/util/index.js';

import { AStepper, TNamed, TFeatureStep, OK } from '@haibun/core/build/lib/defs.js';
import { TRequestHandler, IRequest, IResponse, IWebServer, WEBSERVER } from '@haibun/web-server-express/build/defs.js';
import { restRoutes } from './rest.js';
import { authSchemes, TSchemeType } from './authSchemes.js';

const TALLY = 'tally';

class TestServer extends AStepper {
	toDelete: { [name: string]: string } = {};
	authScheme: any;

	authToken: string | undefined;

	basicAuthCreds: undefined | { username: string; password: string } = {
		username: 'foo',
		password: 'bar',
	};

	resources = [
		{
			id: 1,
			name: 'Ignore 1',
		},
		{
			id: 2,
			name: 'Include 2',
		},
		{
			id: 3,
			name: 'Include 3',
		},
	];

	async endedFeatures() {
		if (Object.keys(this.toDelete).length > 0) {
			this.getWorld().logger.log(`removing ${JSON.stringify(this.toDelete)}`);
			for (const td of Object.values(this.toDelete)) {
				rmSync(td);
			}
		}
	}
	addRoute = (route: TRequestHandler, method: 'get' | 'post' | 'delete' = 'get') => {
		return async ({ loc }: TNamed, vstep: /*  */ TFeatureStep) => {
			let webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);

			try {
				webserver.addRoute(method, loc!, route);
			} catch (error) {
				console.error(error);
				return actionNotOK(vstep.in, { error: asError(error) });
			}
			return actionOK();
		};
	};

	tally: TRequestHandler = async (req: IRequest, res: IResponse) => {
		this.getWorld().shared.set(TALLY, `${(parseInt(this.getWorld().shared.get(TALLY), 10) || 0) + 1}`);
		this.getWorld().logger.log(`tally ${this.getWorld().shared.get(TALLY)}`);
		const { username } = req.query;
		await sleep(Math.random() * 2000);
		res
			.status(200)
			.cookie('userid', username)
			.send(`tally ${this.getWorld().shared.get(TALLY)}<br />username ${username} `);
	};

	download: TRequestHandler = async (req: IRequest, res: IResponse) => {
		if (!this.toDelete.uploaded) {
			res.sendStatus(404);
			res.end('no file to download');
			return;
		}

		this.toDelete.downloaded = '/tmp/test-downloaded.jpg';
		res.download(this.toDelete.uploaded);
	};
	upload: TRequestHandler = async (req: IRequest, res: IResponse) => {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.');
		}

		const uploaded = req.files.upload;
		if (uploaded !== undefined) {
			const file = <fileUpload.UploadedFile>uploaded;
			const uploadPath = `/tmp/upload-${Date.now()}.${file.name}.uploaded`;
			file.mv(uploadPath, (err) => {
				if (err) {
					return res.status(500).send(err);
				}
				this.toDelete.uploaded = uploadPath;

				res.send('<a id="to-download" href="/download">Uploaded file</a>');
			});
		}
	};
	steps = {
		addTallyRoute: {
			gwta: 'start tally route at {loc}',
			action: this.addRoute(this.tally),
		},
		addUploadRoute: {
			gwta: 'start upload route at {loc}',
			action: this.addRoute(this.upload, 'post'),
		},
		addDownloadRoute: {
			gwta: 'start download route at {loc}',
			action: this.addRoute(this.download),
		},
		addCreateAuthTokenRoute: {
			gwta: 'start create auth token route at {loc}',
			action: this.addRoute(restRoutes(this).createAuthToken),
		},
		changeServerAuthToken: {
			gwta: 'change server auth token to {token}',
			action: async ({ token }: TNamed) => {
				this.authToken = token;
				return actionOK();
			},
		},
		addCheckAuthTokenRoute: {
			gwta: 'start check auth route at {loc}',
			action: this.addRoute(restRoutes(this).checkAuth),
		},
		addLogoutRoute: {
			gwta: 'start logout auth route at {loc}',
			action: this.addRoute(restRoutes(this).logOut),
		},
		addResources: {
			gwta: 'start auth resources get route at {loc}',
			action: this.addRoute(restRoutes(this).resources),
		},
		addResourceGet: {
			gwta: 'start auth resource get route at {loc}',
			action: this.addRoute(restRoutes(this).resourceGet),
		},
		addResourceDelete: {
			gwta: 'start auth resource delete route at {loc}',
			action: this.addRoute(restRoutes(this).resourceDelete, 'delete'),
		},
		setAuthScheme: {
			gwta: 'make auth scheme {scheme}',
			action: async ({ scheme }: TNamed) => {
				this.authScheme = authSchemes[<TSchemeType>scheme](this);
				return OK;
			},
		},
	};
}

export default TestServer;
