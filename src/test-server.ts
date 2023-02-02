
import fileUpload from 'express-fileupload';

import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/build/lib/util/index.js';

import { IRequest, IResponse, IWebServer, TRequestHandler, WEBSERVER } from '@haibun/web-server-express/build/defs.js';
import { AStepper, TNamed, TVStep } from '@haibun/core/build/lib/defs.js';

const TALLY = 'tally';

const TestRoute = class TestRoute extends AStepper {
    tally: TRequestHandler = async (req: IRequest, res: IResponse) => {
        this.getWorld().shared.set(TALLY, `${(parseInt(this.getWorld().shared.get(TALLY), 10) || 0) + 1}`);
        this.getWorld().logger.log(`tally ${this.getWorld().shared.get(TALLY)}`);
        const { username } = req.query;
        await sleep(Math.random() * 2000);
        res.status(200).cookie('userid', username).send(`tally ${this.getWorld().shared.get(TALLY)}<br />username ${username} `);
    }
    upload: TRequestHandler = async (req: IRequest, res: IResponse) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploaded = req.files.upload;
        if (uploaded !== undefined) {
            const file = <fileUpload.UploadedFile>uploaded;
            const uploadPath = `/tmp/upload-${Date.now()}.${file.name}.uploaded`;
            file.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send('File uploaded');
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
    };
};

export default TestRoute;
