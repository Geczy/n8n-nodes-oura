import type {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from "n8n-workflow";
import { httpVerbFields, httpVerbOperations } from "./OuraVerbDescription";

export class Oura implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Oura",
		name: "oura",
		icon: "file:oura.svg",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: "Interact with Oura API",
		defaults: {
			name: "Oura",
		},
		// @ts-expect-error
		inputs: ["main"],
		// @ts-expect-error
		outputs: ["main"],
		credentials: [
			{
				name: "ouraBearerApi",
				required: true,
			},
		],
		requestDefaults: {
			baseURL: "https://oura.org",
			url: "",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (OuraVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				noDataExpression: true,
				options: [
					{
						name: "HTTP Verb",
						value: "httpVerb",
					},
				],
				default: "httpVerb",
			},

			...httpVerbOperations,
			...httpVerbFields,
		],
	};
}
