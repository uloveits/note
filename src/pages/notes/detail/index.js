import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActionSheet,AtActionSheetItem } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

import notesApi from "../../../service/api/notes";
import KtNotesDetail from "../../../comps/notes/detail";



@inject('auth')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '记得笔记',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  };

  constructor () {
    super(...arguments);
    this.state = {
      info:{},
    }
  }

  componentWillMount () {
    Taro.cloud.init()
  }

  componentDidMount () {
    this.getNotesInfo();
  }

  getNotesInfo = async () => {
    console.log(this.$router.params);
    if(this.$router.params.id){
      let res = await notesApi.info(this.$router.params.id);
      console.log(res);
      this.setState({
        info:res.data || {}
      })
    }else {
      this.setState({
        info:{}
      })
    }
  };


  render () {
    const { info } = this.state;
    return (
      <View className='index'>
        <KtNotesDetail comp={info} />
      </View>
    )
  }
}

export default Index
