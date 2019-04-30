import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import './index.scss'
import * as commonFnc from "../../../utils/commonFnc";
import notesApi from "../../../service/api/notes";


class KtNotesDetail extends Taro.Component {
  constructor () {
    super(...arguments);
    this.state = {
      height:commonFnc.getScreenSize().height * 2,
      id:null,
      notes:{
        content: ''
      }
    }
  }

  componentWillReceiveProps (nextProp) {
    this.setState({
      id:nextProp.comp._id || null,
      notes:{
        content: nextProp.comp.content
      }
    })
  }

  onTextAreaChange = (obj,prop,e) => {
    let _obj = this.state[obj];
    _obj[prop] = e.target.value;
    _obj.title = e.target.value.substring(0,5);
    this.setState({
      obj: _obj
    },()=>{
      this.saveNotes();
    })
  };

  saveNotes = async () => {
    let param = this.state.notes;
    param.createTime = commonFnc.dateFormat('yyyy-MM-dd hh:mm',new Date());
    console.log(this.state.id);
    if(!this.state.id) {
      //新增操作
      console.log('新增操作');
      let res = await notesApi.add(param);
      if(res.errMsg === 'collection.add:ok') {
        this.setState({
          id:res._id
        })
      }
    }else {
      //修改操作
      console.log('修改操作');
      await notesApi.edit(this.state.id,param)
    }
  };

  render () {
    const { height,notes } = this.state;

    return (
      <View className='nodesDetail'>
        <AtTextarea
          count={false}
          maxLength={50000}
          value={notes.content}
          onChange={this.onTextAreaChange.bind(this,'notes','content')}
          height={height}
          placeholder='点此输入内容~'
        />
      </View>
    )
  }
}
export default KtNotesDetail

