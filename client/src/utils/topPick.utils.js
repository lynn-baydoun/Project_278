const topPickUtils = {
    check :({listTopPicks, mediaId}) => {
        let mediaIsInTopPicks = listTopPicks.find( (f) => f.mediaId.toString() === mediaId.toString()) !== undefined;
        // return tre if there is a list of top Picks and the selected media is a part of top Picks ; 
        return listTopPicks && mediaIsInTopPicks; 
    }
}

export default topPickUtils;