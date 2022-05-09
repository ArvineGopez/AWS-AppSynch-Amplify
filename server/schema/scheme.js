const graphql = require('graphql');
var _ = require ('lodash');

// Dummy Data
var userData = [
    {id: '111', name: "Vayne" , role: "Marskman", age: 20, profession: 'Programmer'},
    {id: '112', name: "Fizz", role: "Assassin", age: 22,profession: 'Programmer'},
    {id: '113', name: "Leblanc", role: "Mage", age: 23, profession: 'Programmer'},
    {id: '114', name: "Jinx", role: "Marskman", age: 21, profession: 'Programmer'},
    {id: '115', name: "Riven", role: "Fighter", age: 19,profession: 'Programmer'},
];

var hobbyData = [
    {id: '1', title: 'Programming', description: 'Make a world a better place', userId: '111'},
    {id: '2', title: 'Basketball', description: 'Lebron James is the Goat', userId: '111'},
    {id: '3', title: 'Gaming', description: 'I am a gamer!', userId: '112'},
    {id: '4', title: 'League', description: 'MMO League of Legends ', userId: '113'},
    {id: '5', title: 'Valo', description: 'First Person Shooter', userId: '114'},
]

var postData = [
    { id: '1', comment: 'Valo is a FPS Game', userId: '111'},
    { id: '2', comment: 'League is MMO Game', userId: '111'}, 
    { id: '3', comment: 'WWE is Wrestling Game', userId: '112'}, 
    { id: '4', comment: 'NBA is Awesome', userId: '113'}, 
    { id: '5', comment: 'Woah That is so cool!', userId: '114'}, 
]

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,


} = graphql

// Types
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for User...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        role: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type : GraphQLString},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args ){
                return _.filter(postData, {userId: parent.id});
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args){
                return _.filter(hobbyData,{userId: parent.id});
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: { type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},

        // Get the user relationship
        user: {
            type: UserType, 
            resolve(parent, args){
                return _.find(userData, {id:parent.userId })
            }
        }
    })
});

//Post Type id comment 
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType, 
            resolve(parent, args){
                return _.find(userData, {id:parent.userId })
            }
        
        }
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
                return _.find(userData, {id: args.id})
            }
        },
        
        // Hobby
        hobby: {
            type: HobbyType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args ){
                // Return Data for Hobby
                return _.find(hobbyData, {id: args.id})
                
            }
        },

        post: {
            type: PostType,
            args: { id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(postData, {id: args.id })
            }
        }
    }
});


// Mutations
const Mutation = new GraphQLObjectType({

    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: { type: GraphQLID}
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString},

            },

            resolve(parent, args){
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,

                }
                return user; 

            }
        },
        
        //todo: CreatePost mutation
        
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})