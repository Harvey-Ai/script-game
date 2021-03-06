import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import CBlock from '../cblock/index'

import './index.less'

/** MainButton
 * @des 双重机制防止按钮重复点击
 *  1. 防抖与节流保证`TIME_OUT`时间内只出发一次请求
 *  2. 全局的锁机制
 */
const TIME_OUT = 300

export default class MainButtonComponent extends Component {

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    label: '确认',
    layout: [],
    config: {},
    styles: {},
    clickBasicTick: null,
    status: '',
    hoverClass: '',
    disabled: false
  }

  state = {
    // id: '',
  }

  handleClick () {
    const { disabled } = this.props
    const roll = () => {
      this.props.onClick && this.props.onClick()
      this.setState({
        clickBasicTick: setTimeout(() => {
          this.setState({
            clickBasicTick: '',
          })
        }, TIME_OUT)
      })
    }
    !this.state.clickBasicTick && !disabled && roll()
  }

  render () {
    // eslint-disable-next-line
    const { label, layout, styles, config, disabled } = this.props

    return (
      <View
        className='fcc main-button-area fixed-button'
        style={{
          ...styles,
          ...(
            config.hidden
            ? { display: 'none' }
            : {}
          )
        }}
      >
        <CBlock>
          <Button
            plain
            className={'main-button ' + (disabled ? 'disabled' : '')}
            hoverClass={this.props.hoverClass || 'main-button-hover-class'}
            onClick={this.handleClick.bind(this)}
          >
            <Text>{label}</Text>
          </Button>
        </CBlock>
      </View>
    )
  }
}
