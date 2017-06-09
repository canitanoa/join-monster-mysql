import path from 'path'

// Knex: libreria para conectar varios tipod de BBDD:
export default require('knex')({
  client: 'mysql',
  //dialect: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'webapp'
  },
  useNullAsDefault: true
})	

/*
var knex = require('knex')({
  client: 'mysql',
  //dialect: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'webapp'
  },
  useNullAsDefault: true
})	


// Create a table
knex.schema.createTable('users', function(table) {
  table.increments('id');
  table.string('user_name');
})

knex.select().table('restaurantes')

export default knex
*/