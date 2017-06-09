import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql'


import joinMonster from 'join-monster'
import knex from './database'
import dbCall from '../data/fetch'
import Restaurantes from './restaurantes'

const { MINIFY, DB } = process.env
const options = {
  minify: MINIFY == 1
}
options.dialect = 'mysql'

export default new GraphQLObjectType({
  description: 'global query object',
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => joinMonster.version
    },
    database: {
      type: GraphQLString,
      resolve: () => knex.client.config.client + ' ' + JSON.stringify(knex.client.config.connection).replace(/"/g, '  ')
    },
    restaurantes: {
      type: new GraphQLList(Restaurantes),
      resolve: (parent, args, context, resolveInfo) => {
        
        return joinMonster(resolveInfo, context, sql => dbCall(sql, knex, context), options)
      }
    },
    restaurante: {
      type: Restaurantes,
      args: {
        id: {
          description: 'The restaurante ID number',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      // WHERE condition
      where: (restaurantesTable, args, context) => {
        return `${restaurantesTable}.id = ${args.id}`
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context, sql => dbCall(sql, knex, context), options)
      }
    }
  })
})
