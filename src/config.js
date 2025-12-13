const requiredEnvVars = [
    'VITE_ENV'
];

const validateEnvVars = () => {
    requiredEnvVars.forEach((varName) => {
        if (!import.meta.env[varName]) {
            throw new Error(`Missing required environment variable: ${varName}`);
        }
    });
};

validateEnvVars();

const config = {
    env: import.meta.env.VITE_ENV
};

export default config;
