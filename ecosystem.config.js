module.exports = {
  apps: [{
    name: 'postax',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    kill_timeout: 3000,
    wait_ready: false,  // Definido como false para evitar travamentos durante a inicialização
    listen_timeout: 10000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: 'localhost'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    max_restarts: 10,
    restart_delay: 4000,
    exp_backoff_restart_delay: 100
  }]
};
