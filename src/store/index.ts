import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IAppState } from '@/store/modules/app'
// import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
  app: IAppState
}


// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
// export default Store
