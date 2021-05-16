const express = require('express');
import {graphqlHTTP} from 'express-graphql';
import schema from './schema';
const app = express();

app.get('/', (req, res) => {
    res.json({
        server : 'initiated'
    });
});

app.use('/graphql', graphqlHTTP({
    graphiql : true,
    schema
}));

app.listen(3000, () => console.log('server on port 3000'));