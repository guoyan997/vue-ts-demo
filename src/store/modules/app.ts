import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IAppState {
  appName: string
  appVersion: string
}

@Module({ dynamic: true, store, name: 'user', namespaced: true, stateFactory: true })
class App extends VuexModule implements IAppState {

  public appName = ''
  public appVersion = ''

  @Mutation
  public updateName (name: string) {
    this.appName = name
  }

  @Mutation
  public updateVersion (version: string) {
    this.appVersion = version
  }
}

export const AppModule = getModule(App)
