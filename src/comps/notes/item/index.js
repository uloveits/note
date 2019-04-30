import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { inject, observer } from "@tarojs/mobx"
import './index.scss';
import more from '../../../public/imgs/more.png'
import {routeToNotesDetail} from "../../../utils/route";


@inject('auth')
@observer
export default class KtNotesItem extends Taro.Component {

  action = (id) => {
    this.props.onCallback(id);
  };

  routeToDetail = (id) => {
    routeToNotesDetail({id:id})
  };

  render() {
    const { comp } = this.props;
    if (!comp) return;
    return (
      <View className='notesItem'>
        {
          comp.map((item,idx)=>(
            <View className='pd20 pb10' key={idx}>
              <View className='at-row at-row__align--center bgWhite card shadow-lg' >
                <View className='at-col-10'>
                  <View className='pd20' onClick={this.routeToDetail.bind(this,item._id)}>
                    <View>
                      <Text className='lg font-weight'>{item.title}</Text>
                    </View>
                    <View>
                      <Text className='sm weak'>{item.createTime}</Text>
                    </View>
                  </View>
                </View>
                <View className='at-col-2 text-center' onClick={this.action.bind(this,item._id)}>
                  <View className='iconfont icon-more' />
                </View>
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}
