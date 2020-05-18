// import { ActionContext } from "vuex";
// import { RootState } from "@/store";
// import { ACTION_TYPE } from "@/store/modules/moduleTemplayte/action-types";
// import { SET_MUTATION } from "@/store/modules/moduleTemplayte/mutation-types";
//
// export interface NameStateType {
//   name: undefined;
// }
//
// const state: NameStateType = {
//   name: undefined,
// };
//
// const getters = {
//   get: (state: NameStateType) => state.name,
// };
//
// const actions = {
//   [ACTION_TYPE](
//     context: ActionContext<NameStateType, RootState>,
//     payload: any
//   ) {
//     context.commit(SET_MUTATION, status);
//   },
// };
//
// const mutations = {
//   [SET_MUTATION](state: NameStateType, status: any) {
//     state.name = status;
//   },
// };
//
// export default {
//   mutations,
//   actions,
//   state,
//   getters,
// };
