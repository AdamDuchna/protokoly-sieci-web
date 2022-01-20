export const getUsersList = (state) => {
    return state.entities.users.allIds.map(id => state.entities.users.byId[id]);
}
