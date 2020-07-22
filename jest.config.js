import { createJestConfig } from "@craco/craco";

import cracoConfig from "./craco.config.js";

const jestConfig = createJestConfig(cracoConfig);

export default jestConfig;
