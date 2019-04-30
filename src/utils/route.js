import Taro from '@tarojs/taro'
import {gotoPage} from "./commonFnc";


function routeToNotesDetail(params={}, options={}) {
  gotoPage('/pages/notes/detail/index',params, options)
}


function routeToAccountAdd(params={}, options={}) {
  gotoPage('/pages/account/add/index', params, options)
}


export {
  routeToNotesDetail,
  routeToAccountAdd
}

