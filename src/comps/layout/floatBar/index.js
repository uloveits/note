import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

class KtFloatBar extends Taro.Component {

  open = () => {
    this.setState({
      isOpen : !this.state.isOpen
    })
  }

  onChoose = (type) => {
    this.props.onCallback(type)
  }

  render() {
    const { isOpen } = this.state;
    return (
     <View className='floatBar'>
       <View className='bg-gradual-orange more shadow-warp text-center' onClick={this.open.bind(this)}>
         <View className='iconfont icon-more'></View>
       </View>

       {
         isOpen &&
         <View className='bg-gradual-red account shadow-warp animation-open-top text-center' onClick={this.onChoose.bind(this,'account')}>
           <View className='iconfont icon-account'></View>
         </View>
       }

       {
         isOpen &&
         <View className='bg-gradual-blue notes shadow-warp animation-open-left text-center' onClick={this.onChoose.bind(this,'notes')}>
           <View className='iconfont icon-notes'></View>
         </View>
       }


     </View>
    )
  }
}
export default KtFloatBar

