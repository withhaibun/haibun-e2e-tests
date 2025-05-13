import { TNamed, TFeatureStep, IStepperCycles } from '@haibun/core/build/lib/defs.js';
import { TRequestHandler } from '@haibun/web-server-express/build/defs.js';
import { AStepper } from '@haibun/core/build/lib/astepper.js';
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
    addRoute: (route: TRequestHandler, method?: "get" | "post" | "delete") => ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
    tally: TRequestHandler;
    download: TRequestHandler;
    upload: TRequestHandler;
    steps: {
        addTallyRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addUploadRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addDownloadRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addCreateAuthTokenRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        changeServerAuthToken: {
            gwta: string;
            action: ({ token }: TNamed) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult>;
        };
        addCheckAuthTokenRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addLogoutRoute: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addResources: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addResourceGet: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        addResourceDelete: {
            gwta: string;
            action: ({ loc }: TNamed, vstep: TFeatureStep) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult | import("@haibun/core/build/lib/defs.js").TNotOKActionResult>;
        };
        setAuthScheme: {
            gwta: string;
            action: ({ scheme }: TNamed) => Promise<import("@haibun/core/build/lib/defs.js").TOKActionResult>;
        };
    };
}
export default TestServer;
