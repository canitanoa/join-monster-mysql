import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

import Post from './Post'
import User from './User'
import Authored from './Authored'

export default new GraphQLObjectType({
  description: 'Comments on posts',
  name: 'Comment',
  // another SQL table to map to
  sqlTable: 'comments',
  uniqueKey: 'id',
  interfaces: () => [ Authored ],
  fields: () => ({
    id: {
      // assumed SQL column to be "id"
      type: GraphQLInt
    },
    body: {
      description: 'The content of the comment',
      // assumed to be "body"
      type: GraphQLString
    },
    likers: {
      description: 'Users who liked this comment',
      type: new GraphQLList(User),
      junctionTable: 'likes',
      sqlJoins: [
        (commentTable, likeTable) => `${commentTable}.id = ${likeTable}.comment_id`,
        (likeTable, accountTable) => `${likeTable}.account_id = ${accountTable}.id`
      ]
    },
    post: {
      description: 'The post that the comment belongs to',
      // a back reference to its Post
      type: Post,
      // how to join these tables
      sqlJoin: (commentTable, postTable) => `${commentTable}.post_id = ${postTable}.id`
    },
    author: {
      description: 'The user who wrote the comment',
      // and one to its User
      type: User,
      sqlJoin: (commentTable, userTable) => `${commentTable}.author_id = ${userTable}.id`
    },
    authorId: {
      type: GraphQLInt,
      sqlcolumn: 'author_id'
    },
    archived: {
      type: GraphQLBoolean
    },
    postId: {
      type: GraphQLInt,
      sqlColumn: 'post_id'
    },
    createdAt: {
      type: GraphQLString,
      sqlColumn: 'created_at'
    }
  })
})
