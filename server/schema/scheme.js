const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    



} = graphql

// Types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User...',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

// Root Query 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
            
                // Resolve with Data
                // Get and Return data from
                // Data Source
              

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})