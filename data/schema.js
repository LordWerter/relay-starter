import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  Post,
  User,
  addPost,
  changePostStatus,
  getPost,
  getPosts,
  getUser,
  getViewer,
  removePost,
  renamePost,
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Post') {
      return getPost(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Post) {
      return GraphQLPost;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

const GraphQLPost = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: globalIdField('Post'),
    text: {
      type: GraphQLString,
      resolve: (obj) => obj.text,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: (obj) => obj.complete,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: PostsConnection,
  edgeType: GraphQLPostEdge,
} = connectionDefinitions({
  name: 'Post',
  nodeType: GraphQLPost,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    posts: {
      type: PostsConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (obj, {status, ...args}) =>
        connectionFromArray(getPosts(status), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getPosts().length,
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getPosts('completed').length,
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});

const GraphQLAddPostMutation = mutationWithClientMutationId({
  name: 'AddPost',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    postEdge: {
      type: GraphQLPostEdge,
      resolve: ({localPostId}) => {
        const post = getPost(localPostId);
        return {
          cursor: cursorForObjectInConnection(getPosts(), post),
          node: post,
        };
      },
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({text}) => {
    const localPostId = addPost(text);
    return {localPostId};
  },
});

const GraphQLChangePostStatusMutation = mutationWithClientMutationId({
  name: 'ChangePostStatus',
  inputFields: {
    complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    post: {
      type: GraphQLPost,
      resolve: ({localPostId}) => getPost(localPostId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id, complete}) => {
    const localPostId = fromGlobalId(id).id;
    changePostStatus(localPostId, complete);
    return {localPostId};
  },
});

const GraphQLRemovePostMutation = mutationWithClientMutationId({
  name: 'RemovePost',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedPostId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    const localPostId = fromGlobalId(id).id;
    removePost(localPostId);
    return {id};
  },
});

const GraphQLRenamePostMutation = mutationWithClientMutationId({
  name: 'RenamePost',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    post: {
      type: GraphQLPost,
      resolve: ({localPostId}) => getPost(localPostId),
    },
  },
  mutateAndGetPayload: ({id, text}) => {
    const localPostId = fromGlobalId(id).id;
    renamePost(localPostId, text);
    return {localPostId};
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: GraphQLAddPostMutation,
    changePostStatus: GraphQLChangePostStatusMutation,
    removePost: GraphQLRemovePostMutation,
    renamePost: GraphQLRenamePostMutation,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
