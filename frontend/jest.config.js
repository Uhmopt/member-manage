// import { defaults } from "jest-config";

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	verbose: true,
	// moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
	reporters: ["default", ["jest-junit", { suiteName: "Unit Tests", outputDirectory: "unit-tests", outputName: "results.xml" }]],
};

// eslint-disable-next-line no-undef
module.exports = config;
