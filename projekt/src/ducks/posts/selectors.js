export const getPostsList = (state) => {
    return state.entities.posts.allIds.map(id => state.entities.posts.byId[id]);
}
