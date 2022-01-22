export const getLikesList = (state) => {
    return state.entities.likes.allIds.map(id => state.entities.likes.byId[id]);
}
