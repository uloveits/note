import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import {routeToNotesDetail,routeToAccountAdd} from "../../utils/route";

@inject('auth')
@observer
class Edit extends Taro.Component {

  config = {
    navigationBarTitleText: '添加'
  };

  constructor () {
    super(...arguments);
    this.state = {

    }
  }

  goView = (type) => {
    switch (type){
      case 'notes':
        routeToNotesDetail();
        break;
      case 'account':
        routeToAccountAdd();
        break;
    }
  }



  render () {

    return (
      <View className='edit'>
        <View className='pd20'>
          <View className='at-row at-row-wrap'>
            <View className='at-col-6'>
              <View className='pd10' onClick={this.goView.bind(this,'notes')}>
                <View className='bg-gradual-red card shadow-lg animation-fade'>
                  <View className='at-row at-row__align-center'>
                    <View className='at-col-8'>
                      <View className='pd20'>
                        <View className='lg'>记得笔记</View>
                        <View className='sm pt10'>--Notes--</View>
                      </View>
                    </View>
                    <View className='at-col-4 text-center'>
                      <View className='pd20'>
                        <View className='iconfont icon-notes white'></View>
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </View>
            <View className='at-col-6'>
              <View className='pd10' onClick={this.goView.bind(this,'account')}>
                <View className='bg-gradual-green card shadow-lg animation-fade'>
                  <View className='at-row at-row__align-center'>
                    <View className='at-col-8'>
                      <View className='pd20'>
                        <View className='lg'>每天进账</View>
                        <View className='sm pt10'>--Account--</View>
                      </View>
                    </View>
                    <View className='at-col-4 text-center'>
                      <View className='pd20'>
                        <View className='iconfont icon-account white'></View>
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

export default Edit
