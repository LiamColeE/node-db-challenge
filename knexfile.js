// Update with your config settings.

module.exports = {

    development: {
      client: 'sqlite3',
      useNullAsDefault: true, // needed for sqlite
      connection: {
        filename: './Data/Projects.db3',
      },
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      },
      // add the following
      pool: {
        afterCreate: (conn, done) => {
          // runs after a connection is made to the sqlite engine
          conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
        },
      },
      typeCast: function(field, next) {
        if (field.type == 'TINY' && field.length == 1) {
            return (field.string() == '1'); // 1 = true, 0 = false
        } 
        return next();
      }
    }, 
  };
  