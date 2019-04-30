import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon, AtDivider } from 'taro-ui'
import {inject, observer} from "@tarojs/mobx/index";
import {routeToMyApply,routeToMyCollect,routeToMySign} from "../../../utils/route";

import './index.scss';

@inject('auth')
@observer
class ToolBar extends Taro.Component {

  constructor() {
    super(...arguments);
    this.state = {

    };
  }
  //工具点击事件
  action = (type) =>{
    const { auth } = this.props;
    let res = auth.check({block: true, redirect: false});
    if(!res) return;
    switch (type) {
      case 'sign':
        routeToMySign();
        break;
      case 'apply':
        routeToMyApply();
        break;
      case 'collect':
        routeToMyCollect();
        break;
    }
  };
  call = () => {
    Taro.makePhoneCall({
      phoneNumber: '18164462400'
    })
  };
  render() {
    {/*分隔符*/}
    const Line = <AtDivider height='6' lineColor='#EDEDED' />;
    return (
      <View className='toolBar pd20'>
        <View className='bgWhite tool'>
          {/*我的报名*/}
          <View className='pd20' onClick={this.action.bind(this,'sign')} >
            <View className='at-row'>
              <View className='at-col-8'>
                <AtIcon value='clock' size='20' color='#c18346' />
                <Text className='lg pl20'>我的报名</Text>
              </View>
              <View className='at-col-4 text-right'>
                <AtIcon className='chevron' value='chevron-right' size='22' color='#7E6452' />
              </View>
            </View>
          </View>
          <View className='plr20'>
            {Line}
          </View>
          {/*我的申请*/}
          <View className='pd20' onClick={this.action.bind(this,'apply')} >
            <View className='at-row'>
              <View className='at-col-8'>
                <AtIcon value='menu' size='20' color='#c18346' />
                <Text className='lg pl20'>我的申请</Text>
              </View>
              <View className='at-col-4 text-right'>
                <AtIcon className='chevron' value='chevron-right' size='22' color='#7E6452' />
              </View>
            </View>
          </View>
          <View className='plr20'>
            {Line}
          </View>
          {/*我的收藏*/}
          <View className='pd20' onClick={this.action.bind(this,'collect')} >
            <View className='at-row'>
              <View className='at-col-8'>
                <AtIcon value='heart' size='20' color='#c18346' />
                <Text className='lg pl20'>我的收藏</Text>
              </View>
              <View className='at-col-4 text-right'>
                <AtIcon className='chevron' value='chevron-right' size='22' color='#7E6452' />
              </View>
            </View>
          </View>
          <View className='plr20'>
            {Line}
          </View>
          {/*联系我们*/}
          <View className='pd20' onClick={this.call.bind(this)} >
            <View className='at-row'>
              <View className='at-col-8'>
                <AtIcon value='phone' size='20' color='#c18346' />
                <Text className='lg pl20'>联系我们</Text>
              </View>
              <View className='at-col-4 text-right'>
                <AtIcon className='chevron' value='chevron-right' size='22' color='#7E6452' />
              </View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}
export default ToolBar

