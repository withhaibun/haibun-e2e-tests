
import { actionOK, getFromRuntime, sleep, } from '@haibun/core/build/lib/util';

import { IRequest, IResponse, IWebServer, TRequestHandler, WEBSERVER } from '@haibun/web-server-express/build/defs';
import { AStepper, TNamed } from '@haibun/core/build/lib/defs';

const TALLY = 'tally';

const TestRoute = class TestRoute extends AStepper {
    route: TRequestHandler = async (req: IRequest, res: IResponse) => {
        this.getWorld().shared.set(TALLY, `${(parseInt(this.getWorld().shared.get(TALLY), 10) || 0) + 1}`);
        this.getWorld().logger.log(`tally ${this.getWorld().shared.get(TALLY)}`);
        const { username } = req.query;
        await sleep(Math.random() * 2000);
        res.status(200).cookie('userid', username).send(`tally ${this.getWorld().shared.get(TALLY)}<br />username ${username} `);
    }

    steps = {
        addRoute: {
            gwta: 'start test route at {loc}',
            action: async ({ loc }: TNamed) => {
                let webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);

                await webserver.addRoute('get', loc, this.route);
                return actionOK();
            },
        },
    };
};

export default TestRoute;