export default {

  mn(context, data) {
    context.commit('mn', data.mn);
  },
  userId(context, data) {
    context.commit('userId', data.userId);
  },
  userName(context, data) {
    context.commit('userName', data.userName);
  },
  userAllowed(context, data) {
    context.commit('userAllowed', data.userAllowed);
  },
  userIsAdmin(context, data) {
    context.commit('userIsAdmin', data.userIsAdmin);
  },

};
