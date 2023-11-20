const favoriteUtils = {
    check :(listFavorites, mediaId) => {
        let mediaIsInFavorites = listFavorites.find(f => f.mediaId.toString() === mediaId.toString()) !== undefined;
        // return tre if there is a list of favorites and the selected media is a part of favorites; 
        return listFavorites && mediaIsInFavorites; 
    }
}

export default favoriteUtils;