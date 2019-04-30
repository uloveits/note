import Taro from '@tarojs/taro';
import { observable } from 'mobx'
import {goView} from "../utils/commonFnc";
import common from './common'

const CACHE_USER = 'cacheUser';

const auth = observable({
  user: initUser()
});

/**
 * 获取用户信息
 */
auth.check = function(param = {block: false, redirect: false}) {
  console.log(param.block);
  console.log(param.redirect);
  // 检查
  if (this.user) {
    return true
  } else {
    // 从未登录
    if (param.block) {
      goView('/pages/index/auth/index', {}, param.redirect)
    }
    return false
  }
};



auth.saveUser = function(user, code) {
  user.validTime = getTimestamp();
  this.user = user;
  Taro.setStorageSync(CACHE_USER, user)
};

function initUser() {
  const user = Taro.getStorageSync(CACHE_USER)
  common.setToken(user.token);
  return user
}

function getTimestamp() {
  let timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  return timestamp
}

export default auth
