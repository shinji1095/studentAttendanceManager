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
    "username": "qcgphfpftpotkz",
    "password": "0f5ff613a9839f4dd10ced4a9aa9f1ba67ce6ec2592421471e05857c9c8f42cd",
    "database": "d4r94ijhbm6gbq",
    "host": "ec2-3-233-43-103.compute-1.amazonaws.com",
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