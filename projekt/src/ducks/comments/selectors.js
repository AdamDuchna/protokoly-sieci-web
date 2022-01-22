export const getCommentList = (state) => {
    return state.entities.comments.allIds.map(id => state.entities.comments.byId[id]);
}
