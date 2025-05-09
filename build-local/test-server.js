import { rmSync } from 'fs';
import fileUpload from 'express-fileupload';
import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/build/lib/util/index.js';
import { OK } from '@haibun/core/build/lib/defs.js';
import { WEBSERVER } from '@haibun/web-server-express/build/defs.js';
import { restRoutes } from './rest.js';
import { authSchemes } from './authSchemes.js';
import { EExecutionMessageType } from '@haibun/core/build/lib/interfaces/logger.js';
import { AStepper } from '@haibun/core/build/lib/astepper.js';
const TALLY = 'tally';
const cycles = (ts) => ({
    startFeature: async () => {
        ts.getWorld().shared.set(TALLY, '0');
        ts.resources = [
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
    }
});
class TestServer extends AStepper {
    cycles = cycles(this);
    toDelete = {};
    authScheme;
    authToken;
    basicAuthCreds = {
        username: 'foo',
        password: 'bar',
    };
    resources = [];
    async endedFeatures() {
        if (Object.keys(this.toDelete).length > 0) {
            this.getWorld().logger.log(`removing ${JSON.stringify(this.toDelete)}`);
            for (const td of Object.values(this.toDelete)) {
                rmSync(td);
            }
        }
    }
    addRoute = (route, method = 'get') => {
        return async ({ loc }, vstep) => {
            let webserver = getFromRuntime(this.getWorld().runtime, WEBSERVER);
            try {
                webserver.addRoute(method, loc, route);
            }
            catch (error) {
                console.error(error);
                const messageContext = { incident: EExecutionMessageType.ACTION, incidentDetails: asError(error) };
                return actionNotOK(vstep.in, { messageContext });
            }
            return actionOK();
        };
    };
    tally = async (req, res) => {
        this.getWorld().shared.set(TALLY, `${(parseInt(this.getWorld().shared.get(TALLY) || '', 10) || 0) + 1}`);
        this.getWorld().logger.log(`tally ${this.getWorld().shared.get(TALLY)}`);
        const { username } = req.query;
        await sleep(Math.random() * 2000);
        res
            .status(200)
            .cookie('userid', username)
            .send(`tally ${this.getWorld().shared.get(TALLY)}<br />username ${username} `);
    };
    download = async (req, res) => {
        if (!this.toDelete.uploaded) {
            res.sendStatus(404);
            res.end('no file to download');
            return;
        }
        this.toDelete.downloaded = '/tmp/test-downloaded.jpg';
        res.download(this.toDelete.uploaded);
    };
    upload = async (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const uploaded = req.files.upload;
        if (uploaded !== undefined) {
            const file = uploaded;
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
            // Define action directly to include middleware, bypassing addRoute helper
            action: async ({ loc }, vstep) => {
                try {
                    const webserver = getFromRuntime(this.getWorld().runtime, WEBSERVER);
                    // Register route directly with method, location, middleware (cast to any), and handler
                    webserver.addRoute('post', loc, fileUpload(), this.upload);
                    return actionOK();
                }
                catch (error) {
                    this.getWorld().logger.error(`Error adding upload route ${loc}: ${error}`);
                    const messageContext = { incident: EExecutionMessageType.ACTION, incidentDetails: asError(error) };
                    return actionNotOK(vstep.in, { messageContext });
                }
            },
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
            action: async ({ token }) => {
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
            action: async ({ scheme }) => {
                this.authScheme = authSchemes[scheme](this);
                return OK;
            },
        },
    };
}
export default TestServer;
//# sourceMappingURL=test-server.js.map