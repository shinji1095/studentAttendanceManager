module.exports = {
  "development": {
    "username": "postgres",
    "password": "p",
    "database": "wadadb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "student",
    "password": "p",
    "database": "wadaken",
    "host": "10.0.2.10",
    "dialect": "postgres",
    "dialectOptions": {
      "useUTC": false,
      "dateStrings": true,
      "typeCast": function (field, next) {
        console.log(field.type)
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }   
    } 
  }
}
