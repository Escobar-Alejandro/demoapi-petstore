import * as environments from './environmentUrls.json';

export function selectEnvironment() {
    const environmentInput = process.env.ENVIRONMENT?.trim().toLowerCase();
    const environment = (environmentInput || 'prod') as keyof (typeof environments)['baseUrls'];

    try {
        const baseUrl = environments.baseUrls[environment];

        if (!baseUrl) {
            return environments.baseUrls.prod;
        }

        return baseUrl;
    } catch (error) {
        console.error('Error loading environment variables;', error);
        process.exit(1);
    }
}