import privateClient from "../client/private.client";

const topPickEndpoints = {
    list : "/user/topPicks", 
    add  : "/user/topPicks",
    remove : topPickId => `/user/topPicks/${topPickId}`
}   

const topPickApi = {
    getList: async() =>{
        try{
            const response = await privateClient.get(topPickEndpoints.list);
            return {response};
        }catch(err) {return {err}};
    },
    add: async({
        mediaId, 
        mediaType, 
        mediaTitle, 
        mediaPoster, 
        mediaRate
    }) =>{
        try{
            const response = await privateClient.post(topPickEndpoints.add, {
                mediaId, 
                mediaType, 
                mediaTitle, 
                mediaPoster, 
                mediaRate
            });
            return {response};
        }catch(err) {return {err}};
    },
    remove: async({topPickId}) =>{
        try{
            const response = await privateClient.delete(topPickEndpoints.remove(topPickId));
            return {response};
        }catch(err) {return {err}};
    }
}

export default  topPickApi; 