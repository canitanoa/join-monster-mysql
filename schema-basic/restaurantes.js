import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'

import knex from './database'

const Restaurantes = new GraphQLObjectType({
  description: 'a stem contract account',
  name: 'Restaurantes',
  // tell join monster the expression for the table
  sqlTable: 'restaurantes',
  // one of the columns must be unique for deduplication purposes
  uniqueKey: 'id',
  fields: () => ({
    id: {
      // no `sqlColumn` and no `resolve`. assumed that the column name is the same as the field name: id
      type: GraphQLInt
    },
    nombre: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'nombre'
    },
    direccion: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'direccion'
    },
    descripcion: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'descripcion'
    },
    imagen: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'imagen'
    },
    precio: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'precio'
    },
    cbu: {
      type: GraphQLString,
      // specify the SQL column
      sqlColumn: 'cbu'
    }	
  })
})

export default Restaurantes

