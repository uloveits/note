import Taro from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtActionSheet,AtActionSheetItem,AtTimeline,AtCalendar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'
import KtSearchBar from "../../comps/layout/searchBar";
import KtNotesItem from "../../comps/notes/item";
import notesApi from "../../service/api/notes";
import Tips from "../../utils/tips";
import * as commonFnc from '../../utils/commonFnc'
import KtLoadMore from "../../comps/layout/load/more";
import KtFloatBar from "../../comps/layout/floatBar";
import accountApi from "../../service/api/account";


@inject('auth')
@observer
class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  };

  constructor () {
    super(...arguments);
    this.state = {
      notesList:[],
      isAction:false,
      selectId:'',
      //分页
      start:0,
      limit:10,
      reachButton:false,
      first:true,

      pageType:'account',
      chooseDate:commonFnc.dateFormat('yyyy-MM-dd',new Date()),
      accountInfo:[]
    }
  }

  componentWillMount () {
    Taro.cloud.init()
  }

  componentDidMount () {
    const {auth} = this.props;
    if(!auth.check({block: true}))return;
  }

  componentDidShow () {
    this.setState({
      start:0,
      limit:10,
      reachButton:false,
      first:true,
      isAction:false,
    },()=> {
      this.getNotesList();
      this.getAccountInfo(this.state.chooseDate);
      this.getMonthAccount(this.state.chooseDate.substring(0,7));
    })
  }

  onPullDownRefresh() {
    this.setState({
      start:0,
      limit:10,
      reachButton:false,
      first:true,
      isAction:false,
    },()=> {
      this.getNotesList();
      this.getAccountInfo();
      Taro.stopPullDownRefresh();
    })
  }
  onReachBottom () {
    this.getNotesList();
  }

  search = async (content) => {
    console.log(content);
    let res = await notesApi.search(content);
    console.log(res);
    this.setState({
      notesList:res.data
    })
  };

  getNotesList = async () => {
    const {start,limit,first} = this.state;
    if(this.state.reachButton)return;
    if(!first){
      Tips.loading();
    }
    let res = await notesApi.list(start,limit);
    let _notesList = this.state.notesList;
    if(!first){
      _notesList = _notesList.concat(res.data);
    }else {
      _notesList = res.data
    }
    this.setState({
      notesList:_notesList,
      start: start + limit,
      reachButton:this.state.start > res.total ? true : false,
      first:false
    },()=>{
       Tips.loaded();
    })
  };

  openAction = (id)=> {
    this.setState({
      isAction:true,
      selectId:id
    })
  };

  deleteNotes = async () => {
    let _selectId = this.state.selectId;
    console.log(_selectId);
    await Tips.confirm('确认删除该笔记吗');
    let res = await notesApi.delete(_selectId);
    console.log(res);
    if(res.errMsg === 'document.remove:ok') {
      Tips.success('删除成功！');
      this.setState({
        isAction:false,
        start:0,
        limit:10,
        reachButton:false,
        first:true,
      },()=>{
        this.getNotesList();
      })
    }
  };

  pageType = (type)=> {
    console.log(type)
    this.setState({
      pageType: type
    })
  }

  //账单详情
  getAccountInfo = async (date) => {
    let res = await accountApi.info(date);
    console.log('账单详情');
    console.log(res);
    if(res.data.length > 0 ) {
      let _date = res.data[0].date;
      let _money = `￥${res.data[0].money}`;
      let _remark = res.data[0].remark;
      let _accountInfo = [
        {title:_date,icon: 'calendar'},
        {title:_money,icon: 'money'},
        {title:_remark,icon: 'tag'},
      ];
      this.setState({
        accountInfo:_accountInfo
      })
    }else {
      this.setState({
        accountInfo:[]
      })
    }
  };
  //日期切换
  onDateChange = (e)=> {
    console.log(e);
    this.getAccountInfo(e.value.start);
  };
  //月份切换
  onMonthChange = (e) => {
    console.log(e.substring(0,7));
    this.getMonthAccount(e.substring(0,7));
  }

  getMonthAccount = async (month) => {
    let res = await accountApi.moneyList(month);
    let sumMoney = 0;
    if(res.data.length > 0){
      for(let i= 0; i< res.data.length;i++){
        sumMoney += parseFloat(res.data[i].money )
      }
      console.log(sumMoney.toFixed(2));
    }
    let _monthAccountInfo = {
      sumMoney:sumMoney.toFixed(2),
      count:res.data.length
    }
    this.setState({
      monthAccountInfo:_monthAccountInfo
    })
  };



  render () {
    const { notesList,isAction ,reachButton ,pageType,chooseDate,accountInfo,monthAccountInfo} = this.state;

    return (
      <View className='index'>
        {
          pageType === 'notes' &&
            <View>
              {/*搜索*/}
              <KtSearchBar onCallback={this.search.bind(this)} />

              <KtNotesItem comp={notesList} onCallback={this.openAction.bind(this)} />

              { reachButton && notesList.length > 0 &&  <KtLoadMore bottomText='已经到底了~' /> }

              { notesList.length === 0 &&  <KtLoadMore text='暂无笔记~' /> }
            </View>
        }
        {
          pageType === 'account' &&
            <View>
              <View className='pd20'>
                <View className='bgWhite card pd20'>
                  <AtCalendar
                    currentDate={chooseDate}
                    onSelectDate={this.onDateChange.bind(this)}
                    onMonthChange={this.onMonthChange.bind(this)}
                  />
                </View>
                <View className='bgWhite card pd20 mt20'>
                  {
                    accountInfo.length > 0
                      ? <View>
                          <AtTimeline items={accountInfo} />
                          <View>
                            <Text className='sm weak'>本月记账</Text>
                            <Text className='sm major'>{monthAccountInfo.count}</Text>
                            <Text className='sm weak'>天，</Text>
                            <Text className='sm weak'>共进账</Text>
                            <Text className='sm major'>{monthAccountInfo.sumMoney}</Text>
                            <Text className='sm weak'>元。</Text>
                          </View>
                        </View>
                      : <View><Text className='lg weak'>该天没有记账噢~</Text></View>
                  }
                </View>
              </View>
            </View>
        }


        <KtFloatBar onCallback={this.pageType.bind(this)} />

        <AtActionSheet isOpened={isAction} cancelText='取消' >
          <AtActionSheetItem onClick={this.deleteNotes.bind(this)}>
            删除
          </AtActionSheetItem>
        </AtActionSheet>

      </View>
    )
  }
}

export default Index
