import Taro from '@tarojs/taro';
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.scss';

class KtSwipeBar extends Taro.Component {

  render() {
    const { comp } = this.props;
    if(!comp)return;
    console.log('轮播图组件');
    console.log(comp);

    return (
      <Swiper
        className={comp.cls ? comp.cls : 'swipeBar'}
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
        autoplay
      >
        { comp.items.map((item, index) => (
          <SwiperItem key={index}>
            <Image className='swipe-img' src={item.url} />
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}
export default KtSwipeBar

