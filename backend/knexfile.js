// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      database: 'manipulator_control',
      user: 'root',
      password: 'secret',
      charset: 'utf8mb4',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },
    useNullAsDefault: true,
  },

};
