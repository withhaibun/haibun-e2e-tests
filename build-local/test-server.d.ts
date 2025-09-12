import { TNamed, TFeatureStep, IStepperCycles } from '@haibun/core/lib/defs.js';
import { TRequestHandler } from '@haibun/web-server-express/defs.js';
import { AStepper } from '@haibun/core/lib/astepper.js';
declare class TestServer extends AStepper {
    cycles: IStepperCycles;
    toDelete: {
        [name: string]: string;
    };
    authScheme: any;
    authToken: string | undefined;
    basicAuthCreds: undefined | {
        username: string;
        password: string;
    };
    resources: {
        id: number;
        name: string;
    }[];
    endedFeatures(): Promise<void>;
    addRoute: (route: TRequestHandler, method?: "get" | "post" | "delete") => ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
    tally: TRequestHandler;
    download: TRequestHandler;
    upload: TRequestHandler;
    steps: {
        addTallyRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addUploadRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addDownloadRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addCreateAuthTokenRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        changeServerAuthToken: {
            gwta: string;
            action: ({ token }: TNamed) => Promise<import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addCheckAuthTokenRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addLogin: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addLogoutRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addResources: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addResourceGet: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        addResourceDelete: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/lib/defs.js").TNotOKActionResult | import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
        setAuthScheme: {
            gwta: string;
            action: ({ scheme }: TNamed) => Promise<import("@haibun/core/lib/defs.js").TOKActionResult>;
        };
    };
}
export default TestServer;
