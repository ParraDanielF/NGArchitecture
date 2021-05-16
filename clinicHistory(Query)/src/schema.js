import { makeExecutableSchema } from 'graphql-tools'
import { resolver } from './resolver';

const typeDefs =`
    type Query {
        getHistoryData(userID : String!) : [Data]
    }

    type Result {
        _id : ID,
        description : String!
    }

    type Action{
        data : String!
    }

    type Data {
        _id : ID,
        userId : String!,
        date : String!,
        procedureId : Int!,
        medicalHeadquarterId : Int!,
        professionalId : Int!,
        result : Result!,
        actions : Action
    }
`;

export default makeExecutableSchema({
    typeDefs,
    resolvers : resolver
})