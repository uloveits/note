import BaseComponent from "./baseComp"

export default class Pagination extends BaseComponent {

  constructor(props) {
    super(props);

    this.pages = {};
    this.index = 0
  }


  componentDidMount () {
    return this.next()
  }

  /**
   * 多分页序号，默认不启用，返回非空值则表示启用，子类可重载
   */
  cacheIndex() { return -1 }


  /**
   * 分页参数，子类可重载
   */
  params() { return {} }

  /**
   * 分页方法，返回Pagination对象，子类需重载
   */
  method() {}

  execAsync = (func = null) => {
    let page = this.method();
    this.pages[page.id] = page;
    let ret = this.setStateAsync({page: page}).then(() => {
      return this.next();
    });
    if (func)  {
      return ret.then(() => {
        func(page)
      })
    }
    return ret
  };

  /**
   * 下一页
   */
  async next (_param, noLoading=false) {
    let page;
    const idx = this.cacheIndex();

    if (idx !== -1 && idx !== this.index) {
      // 发生多页面切换，优先从缓存中取
      this.index = idx;

      // 找到缓存，直接返回
      if (this.pages['p_'+idx]) {
        page = this.getPages(idx);
        this.setState({page: page});
        return
      }

      page = this.method();
      this.setState({page})
    } else {
      page = this.state.page?this.state.page:this.method()
    }

    if (!page || page.reachBottom) {
      return
    }

    const param = _param || this.params();

    !noLoading&&this.setState({loading: true});

    await page.next(param);

    this.pages['p_'+this.index] = {...page};

    this.setState({initialized: true, loading: false, page: page})
  }

  getPages (idx) {
    let p = this.pages['p_'+idx];
    return Object.assign(this.method(), p)
  }

  /**
   * 到达底部
   */
  onReachBottom () {
    return this.next(null, true);
  };

  /**
   * 重新加载
   */
  async reload () {
    return this.next()

    // todo
    // stopPullDownRefresh();
  }

  /**
   * 下拉刷新
   */
  async onPullDownRefresh () {
    await this.reload();
  }

  /**
   * 更新列表（外部事件）
   */
  async update() {
    this.state.page = null;
    await this.reload();
  };

  remove(id) {

    let page = this.state.page;
    if (page) {
      page.remove(id);
      this.setState({page: page})
    }
  }

}
