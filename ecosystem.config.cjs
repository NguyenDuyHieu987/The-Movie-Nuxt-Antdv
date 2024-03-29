module.exports = {
  apps: [
    {
      name: 'phimhay247-nuxt-app',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './server/index.mjs',
      watch: ['server'],
      watch_delay: 1000,
      ignore_watch: ['public'],
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      update_env: true,
    },
  ],
};
