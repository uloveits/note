import Taro from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import store from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Taro.Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/index/auth/index',
      'pages/edit/index',
      'pages/notes/detail/index',
      'pages/user/index',
      'pages/account/add/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1cbbb4',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#2c2c2c',
      selectedColor: '#d81e06',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'public/imgs/tab/home.png',
          selectedIconPath: 'public/imgs/tab/home-active.png',
          text: '记得'
        },
        {
          pagePath: 'pages/edit/index',
          iconPath: 'public/imgs/tab/add.png',
          selectedIconPath: 'public/imgs/tab/add-active.png',
          text: '添加'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'public/imgs/tab/user.png',
          selectedIconPath: 'public/imgs/tab/user-active.png',
          text: '我的'
        }
      ]
    },
    cloud: true
  };

  componentDidMount () {}



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
