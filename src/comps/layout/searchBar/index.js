import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui'
import './index.scss';

class KtSearchBar extends Taro.Component {

  onChange (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  onActionClick () {
    this.props.onCallback(this.state.searchValue);
  }

  render() {
    const { comp } = this.props;
    const { searchValue } = this.state;

    return (
      <View className='searchBar'>
        <AtSearchBar
          value={searchValue}
          placeholder={comp.placeholder}
          onChange={this.onChange.bind(this, 'searchValue')}
          onActionClick={this.onActionClick.bind(this)}
        />
      </View>
    )
  }
}
export default KtSearchBar

