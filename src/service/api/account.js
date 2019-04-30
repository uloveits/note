import Taro from '@tarojs/taro'

export default class accountApi {

  /**
   * 添加账单
   * @param param
   * @returns {Promise<Taro.cloud.DB.IAddResult> | void}
   */
  static add(param) {
    const db = Taro.cloud.database();
    return db.collection('account').add({
      data: param
    })
  }

  /**
   * 编辑笔记
   * @param param
   * @returns {Promise<Taro.cloud.DB.IAddResult> | void}
   */
  static edit(id,param) {
    const db = Taro.cloud.database();
    return db.collection('notes').doc(id).update({
      data: param
    })
  }

  /**
   * 删除笔记
   * @param id
   * @returns {*}
   */
  static delete(id) {
    const db = Taro.cloud.database();
    return db.collection('notes').doc(id).remove();
  }

  /**
   * 账单详情
   * @param date
   * @returns {*}
   */
  static info(date) {
    const db = Taro.cloud.database();
    return db.collection('account').where({date:date}).get();
  }

  /**
   * 某个月账单记录
   */
  static async moneyList(date) {
    const db = Taro.cloud.database();
    const count = await db.collection('account').where({
      date: db.RegExp({
        regexp: date,
        options: 'i',
      })
    }).count();
    const total = count.total;
    console.log('某个月账单记录');
    console.log(total);
    let res = await db.collection('account').where({
      date: db.RegExp({
        regexp: date,
        options: 'i',
      })
    }).skip(0).limit(20).get();
    if(total < 20){
      return res
    }else {
      let _res =  await db.collection('account').where({
        date: db.RegExp({
          regexp: date,
          options: 'i',
        })
      }).skip(20).limit(40).get();
       res.data = res.data.concat(_res.data);
      return res;
    }
  }




}
