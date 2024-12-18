import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from "n8n-workflow";

export class OuraBearerApi implements ICredentialType {
	name = "ouraBearerApi";
	displayName = "Oura Bearer API";
	documentationUrl =
		"https://docs.n8n.io/integrations/builtin/credentials/oura/";
	properties: INodeProperties[] = [
		{
			displayName: "Token",
			name: "token",
			type: "string",
			default: "",
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: "Domain",
			name: "domain",
			type: "string",
			default: "https://oura.org",
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: "={{$credentials?.domain}}",
			url: "/bearer",
		},
	};
}
