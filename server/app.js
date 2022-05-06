const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/scheme')
const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))


app.listen(2906, () => {
    console.log('Listening for request on my Port 2906');
})