import { actionNotOK, actionOK, getFromRuntime, sleep, asError } from '@haibun/core/lib/util/index.js';
import { DOMAIN_STRING } from "@haibun/core/lib/domain-types.js";
import { Origin, } from '@haibun/core/lib/defs.js';
import { WEBSERVER } from '@haibun/web-server-express/defs.js';
import { EExecutionMessageType } from '@haibun/core/lib/interfaces/logger.js';
import { AStepper } from '@haibun/core/lib/astepper.js';
const TALLY = 'tally';
const setTally = (value) => ({ term: TALLY, value: String(value), domain: DOMAIN_STRING, origin: Origin.var });
class TestServer extends AStepper {
    steps = {
        addTallyRoute: {
            gwta: 'start tally route at {loc}',
            action: async (args, vstep) => {
                const { loc } = args;
                let webserver = getFromRuntime(this.getWorld().runtime, WEBSERVER);
                const handler = async (req, res) => {
                    const cur = (parseInt(this.getWorld().shared.get(TALLY), 10) || 0) + 1;
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
                    webserver.addRoute('get', loc, handler);
                }
                catch (error) {
                    console.error(error);
                    const messageContext = { incident: EExecutionMessageType.ACTION, incidentDetails: asError(error) };
                    return actionNotOK(vstep.in, { messageContext });
                }
                return actionOK();
            },
        },
    };
}
export default TestServer;
//# sourceMappingURL=test-server.js.map