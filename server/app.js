const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true
}))


app.listen(2906, () => {
    console.log('Listening for request on my Port 2906');
})