import { rmSync } from 'fs';
import fileUpload from 'express-fileupload';

import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/build/lib/util/index.js';

import { IRequest, IResponse, IWebServer, TRequestHandler, WEBSERVER } from '@haibun/web-server-express/build/defs.js';
import { AStepper, TNamed, TVStep } from '@haibun/core/build/lib/defs.js';

const TALLY = 'tally';

const TestRoute = class TestRoute extends AStepper {
    toDelete: { [name: string]: string } = {};

    async close() {
        if (Object.keys(this.toDelete).length > 0) {
            this.getWorld().logger.log(`removing ${JSON.stringify(this.toDelete)}`);
            for (const td of Object.values(this.toDelete)) {
                rmSync(td);
            }
        }
    }

    tally: TRequestHandler = async (req: IRequest, res: IResponse) => {
        this.getWorld().shared.set(TALLY, `${(parseInt(this.getWorld().shared.get(TALLY), 10) || 0) + 1}`);
        this.getWorld().logger.log(`tally ${this.getWorld().shared.get(TALLY)}`);
        const { username } = req.query;
        await sleep(Math.random() * 2000);
        res.status(200).cookie('userid', username).send(`tally ${this.getWorld().shared.get(TALLY)}<br />username ${username} `);
    }
    download: TRequestHandler = async (req: IRequest, res: IResponse) => {
        if (!this.toDelete.uploaded) {
            res.sendStatus(404);
            res.end('no file to download');
            return;
        }

        this.toDelete.downloaded = '/tmp/test-downloaded.jpg';
        res.download(this.toDelete.uploaded);
    }
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
    }

    steps = {
        addTallyRoute: {
            gwta: 'start tally route at {loc}',
            action: async ({ loc }: TNamed, vstep: TVStep) => {
                let webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);

                try {
                    webserver.addRoute('get', loc!, this.tally);
                } catch (error) {
                    return actionNotOK(vstep.in, { error: asError(error) });
                }
                return actionOK();
            },
        },
        addUploadRoute: {
            gwta: 'start upload route at {loc}',
            action: async ({ loc }: TNamed, vstep: TVStep) => {
                const webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);
                webserver.use(fileUpload());

                try {
                    webserver.addRoute('post', loc!, this.upload);
                } catch (error) {
                    return actionNotOK(vstep.in, { error: asError(error) });
                }
                return actionOK();
            },
        },
        addDownloadRoute: {
            gwta: 'start download route at {loc}',
            action: async ({ loc }: TNamed, vstep: TVStep) => {
                const webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);

                try {
                    webserver.addRoute('get', loc!, this.download);
                } catch (error) {
                    return actionNotOK(vstep.in, { error: asError(error) });
                }
                return actionOK();
            },
        },
    };
};

export default TestRoute;
