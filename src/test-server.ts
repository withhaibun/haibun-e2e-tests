import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/lib/util/index.js';

import { DOMAIN_STRING } from "@haibun/core/lib/domain-types.js";
import { TFeatureStep, Origin, TStepArgs, } from '@haibun/core/lib/defs.js';
import { TRequestHandler, IRequest, IResponse, IWebServer, WEBSERVER } from '@haibun/web-server-express/defs.js';
import { EExecutionMessageType, TMessageContext } from '@haibun/core/lib/interfaces/logger.js';
import { AStepper, TStepperSteps } from '@haibun/core/lib/astepper.js';

const TALLY = 'tally';

const setTally = (value: number) => ({ term: TALLY, value: String(value), domain: DOMAIN_STRING, origin: Origin.var });

class TestServer extends AStepper {
	steps: TStepperSteps = {
		addTallyRoute: {
			gwta: 'start tally route at {loc}',
			action: async (args: TStepArgs, vstep: TFeatureStep) => {
				const { loc } = args as { loc: string };
				let webserver: IWebServer = getFromRuntime(this.getWorld().runtime, WEBSERVER);

				const handler: TRequestHandler = async (req: IRequest, res: IResponse) => {
					const cur = (parseInt(this.getWorld().shared.get(TALLY) as string, 10) || 0) + 1;
					this.getWorld().shared.set(setTally(cur), { when: 'tally', seq: [cur] });
					this.getWorld().logger.log(`tally ${cur}`);
					const { username } = req.query;
					await sleep(Math.random() * 2000);
					res
						.status(200)
						.cookie('userid', username)
						.send(`<h1>Counter test</h1>tally: ${cur}<br />username ${username} `);
				};

				try {
					webserver.addRoute('get', loc!, handler);
				} catch (error) {
					console.error(error);
					const messageContext: TMessageContext = { incident: EExecutionMessageType.ACTION, incidentDetails: asError(error) }
					return actionNotOK(vstep.in, { messageContext });
				}
				return actionOK();
			},
		},
	};
}

export default TestServer;


