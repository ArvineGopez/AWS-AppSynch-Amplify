const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    


} = graphql

// Types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })

});
