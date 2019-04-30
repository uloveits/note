import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import KtUserCard from "../../comps/user/card";





class User extends Taro.Component {
  config = {
    navigationBarTitleText: '我的'
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }


  render () {

    return (
      <View className='user'>
        <KtUserCard />
      </View>
    )
  }
}
export default User

