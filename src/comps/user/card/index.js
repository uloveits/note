import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import { inject, observer } from "@tarojs/mobx"
import './index.scss';
import avatar from '../../../public/imgs/user/user.png'
import wave from '../../../public/imgs/user/wave.gif'
import {goView} from "../../../utils/commonFnc";


@inject('auth')
@observer
class KtUserCard extends Taro.Component {

  getTitle = (u) => {
    if (u) {
      return u.nickName
    }
    return '登陆/注册'
  };

  routerToNext = (user) => {
    if (!user) {
      // 前往登陆页
      goView('/pages/index/auth/index', {}, false)
    }
  };

  render() {
    const { auth } = this.props;
    const { user } = auth;
    console.log(user);
    return (
      <View className='userCard'>
        <View className='card rel' onClick={this.routerToNext.bind(this, user)}>
          <View className='pd20'>
            <View className='at-row at-row--wrap at-row__justify--center'>
              <View className='at-col-3'>
                <AtAvatar size='large' circle image={user.avatarUrl || avatar} />
              </View>
              <View className='at-col-9'>
                <View className='mt10'>
                  <Text className='xl white'>{this.getTitle(user)}</Text>
                </View>
              </View>
            </View>
          </View>
          <Image className='gif-wave' src={wave} mode='scaleToFill' />
        </View>
        <View className='order bgWhite' />
      </View>
    )
  }
}
export default KtUserCard


