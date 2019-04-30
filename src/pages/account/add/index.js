import Taro from '@tarojs/taro'
import { View,Text,Picker } from '@tarojs/components'
import { AtIcon, AtInput, AtButton,AtDivider } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import Tips from "../../../utils/tips";
import accountApi from "../../../service/api/account";

@inject('auth')
@observer
class AccountAdd extends Taro.Component {

  config = {
    navigationBarTitleText: '记得进账'
  };

  constructor () {
    super(...arguments);
    this.state = {
      account:{
        date:''
      }
    }
  }

  //输入框的change事件
  inputChange = (obj,prop,value) => {
    let _obj = this.state[obj];
    _obj[prop] = value;
    this.setState({
      [obj]:_obj
    })
  };

  //选择框change事件
  onSelChange = (obj,prop,e)=> {
    let _obj = this.state[obj];
    _obj[prop] = e.detail.value;
    this.setState({
      [obj]:_obj
    })
  };

  //保存账本
  saveAccount = async () => {
    await Tips.confirm('一旦保存将无法修改,确定保存吗?')
    console.log(this.state.account);
    let param = this.state.account;
    let res = await accountApi.add(param);
    console.log(res);
    if(res.errMsg === 'collection.add:ok'){
      Tips.success('保存成功！')
      Taro.navigateBack({
        delta:1
      })
    }
  };
  render () {
    const Line = (<AtDivider height={6} lineColor='#EDEDED' />);
    return (
      <View className='edit'>
        <View className='pd20'>
          <View className='bgWhite card'>
            {/*日期*/}
            <View className='pd10'>
              <Picker mode='date' onChange={this.onSelChange.bind(this,'account','date')}>
                <View className='picker'>
                  <View className='at-row'>
                    <View className='at-col-6'>
                      <Text className='lg'>日期：</Text>
                    </View>
                    <View className='at-col-6 text-right'>
                      <Text className='sm muted'>{this.state.account.date}</Text>
                      <AtIcon  value='chevron-right' size='18' color='#735134'></AtIcon>
                    </View>
                  </View>
                </View>
              </Picker>
            </View>
            {/*分割线*/}
            <View className='pd10'>
              {Line}
            </View>
            {/*进账*/}
            <View className='pd10'>
              <AtInput
                name='name'
                title='进账:'
                type='digit'
                placeholder='单位（元）'
                value={this.state.form.title}
                onChange={this.inputChange.bind(this,'account','money')}
              />
            </View>
            {/*分割线*/}
            <View className='pd10'>
              {Line}
            </View>
            {/*备注*/}
            <View className='pd10'>
              <AtInput
                name='name'
                title='备注:'
                type='text'
                placeholder='添加备注'
                value={this.state.form.title}
                onChange={this.inputChange.bind(this,'account','remark')}
              />
            </View>
          </View>
        </View>
        <View className='pd20'>
          <AtButton type='primary' onClick={this.saveAccount.bind(this)}>保存</AtButton>
        </View>
      </View>
    )
  }
}

export default AccountAdd
