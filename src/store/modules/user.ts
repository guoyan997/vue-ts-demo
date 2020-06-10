import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import API from '@/assets/js/api'
import store from '@/store'

export interface IUserState {
  name: string
  email: string
}

interface IUserInfo {
  username: string,
  password: any
}

@Module({ dynamic: true, store, name: 'user', namespaced: true, stateFactory: true })
class User extends VuexModule implements IUserState {

  public name = '测试者'
  public email = ''

  @Mutation
  public updateName (name: string): void {
    this.name = name
  }

  @Mutation
  public updateEmail (email: string): void {
    this.email = email
  }

  @Action({ rawError: true })
  public async getUserInfo (userInfo: IUserInfo) {
    let { username, password } = userInfo
    const { __statusCode, data } = await API.getDataFromInterface(API.getBarData, { username, password })
    if (__statusCode === '1') {
      this.updateName(data)
      this.updateName(data)
    }
  }
}

export const UserModule = getModule(User)
