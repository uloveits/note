import Taro from '@tarojs/taro'

export default class notesApi {

  /**
   * 添加笔记
   * @param param
   * @returns {Promise<Taro.cloud.DB.IAddResult> | void}
   */
  static add(param) {
    const db = Taro.cloud.database();
    return db.collection('notes').add({
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
   * 笔记详情
   * @param id
   * @returns {*}
   */
  static info(id) {
    const db = Taro.cloud.database();
    return db.collection('notes').doc(id).get();
  }

  /**
   * 笔记列表
   * @param id
   * @returns {*}
   */
  static async list(start,limit) {
    const db = Taro.cloud.database();
    const count = await db.collection('notes').count();
    const total = count.total;
    console.log(total);
    return db.collection('notes').skip(start).limit(limit).get().then(res=>{
      res.total = total;
      return res;
    });
  }

  /**
   * 笔记搜索
   * @param id
   * @returns {*}
   */
  static search(content) {
    const db = Taro.cloud.database();
    return db.collection('notes').where({
      //使用正则查询，实现对搜索的模糊查询
      content: db.RegExp({
        regexp: content,//从搜索栏中获取的value作为规则进行匹配。
        options: 'i', //大小写不区分
      })
    }).get()

  }



}
