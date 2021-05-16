import {data} from './persistence/mock/data.json';

export const resolver = {
    Query:{
        getHistoryData(root, {userID}){
            return data.filter(d => d.userId === userID);
        }
    }
};