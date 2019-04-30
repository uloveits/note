import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { inject, observer } from "@tarojs/mobx"

import './index.scss';
import DividerVertical from '../../../comps/wxDivider/vertical'
import {routeToMyComment, routeToMyNews} from "../../../utils/route";


@inject('auth')
@observer
class SignBar extends Taro.Component {

  action = (type) => {
    const { auth } = this.props;
    let res = auth.check({block: true, redirect: false});
    if(!res) return;
    switch (type) {
      case 'news':
        routeToMyNews();
        break;
      case 'comment':
        routeToMyComment();
        break;
    }
  };

  render() {
    return (
      <View className='signBar pd20'>
        <View className='at-row bgWhite card'>
          <View className='at-col-5'>
            <View className='text-center pd20' onClick={this.action.bind(this,'news')}>
              <View>
                <AtIcon value='bell' size='26' color='#FF6200' />
              </View>
              <View>
                <Text className='sm weak'>消息</Text>
              </View>
            </View>
          </View>
          <View className='at-col-2'>
              <DividerVertical color='#ECECEC' height='100px' />
          </View>
          <View className='at-col-5'>
            <View className='text-center pd20' onClick={this.action.bind(this,'comment')}>
              <View>
                <AtIcon value='edit' size='26' color='#FF6200' />
              </View>
              <View>
                <Text className='sm weak'>评价</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default SignBar

