import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:3001",
	},

	reporter: "junit",

	reporterOptions: {
		mochaFile: "cypress/results/results.xml",
		toConsole: true,
	},

	component: {
		devServer: {
			framework: "create-react-app",
			bundler: "webpack",
		},
	},
});
