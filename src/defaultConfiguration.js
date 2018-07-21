import { hostname } from 'os';

export default {
	port: process.env.PORT || 3000,
	connectionStringUri: process.env.CONNECTION_STRING_URI,
	hostname: hostname(),
	applicationName: process.env.APPLICATION_NAME || 'management-api',
};