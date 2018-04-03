import * as React from 'react'
import autobind from 'autobind-decorator'
import SliderController from './SliderController'
import { grey50, grey900 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import styled from 'styled-components'
import { Card } from './index'

export interface SliderProps {
    style?: React.CSSProperties
    children?: React.ReactNode
    itemWidth?: number
    itemSpacing?: number
    onItemClick?: Function
}

export interface SliderState {
    offset: number
    isDockingLeft: boolean
    isDockingRight: boolean
    activeIndex: number
}

export interface ControlArea {
    left?: boolean
    right?: boolean
}

const SliderWrapper = styled.div`
    width: 80%;
    height: 230px;
    display: flex;
    justify-content: center;
    margin: -1% 1% 1% 1%;
`

const SliderInner = styled.div`
    position: relative;
    overflow: hidden;
    padding: 5px 0;
    width: 100%;
    height: 100%;
`

const List = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    transition: all 0.4s;
`

class Slider extends React.Component<SliderProps, SliderState> {
    private innerContainer: HTMLDivElement

    static defaultProps = {
        itemWidth: 210,
        itemSpacing: 5,
    }

    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            isDockingLeft: true,
            isDockingRight: false,
            activeIndex: -1,
        }
        // this.handleBtnClick = this.handleBtnClick.bind(this)
    }

    @autobind
    handleBtnClick(direction) {
        const distance = this.innerContainer.offsetWidth
        const offset = { toLeft: distance, toRight: -distance }[direction]
        this.moveTo(offset)
    }

    moveTo(next) {
        const { offset } = this.state
        const { itemWidth, itemSpacing, children } = this.props
        let current = offset + next
        const itemLength = React.Children.count(children)

        // calculate width and limit
        const totalWidth = itemLength * (itemWidth + itemSpacing)
        const limit = totalWidth - this.innerContainer.offsetWidth

        // 左右按钮状态控制
        const controller = {
            isDockingLeft: false,
            isDockingRight: false,
        }

        if (current > 0) {
            current = 0
            controller.isDockingLeft = true
        }

        if (current < -limit) {
            current = -limit
            controller.isDockingRight = true
        }

        this.setState({ offset: current, ...controller })
    }

    render() {
        const { offset, isDockingLeft, isDockingRight } = this.state
        const {
            style,
            itemWidth,
            itemSpacing,
            onItemClick,
            children,
        } = this.props
        const styles = {
            innerContainer: {
                transform: `translateX(${offset}px)`,
            },
            item: {
                margin: `0 ${itemSpacing}px 0 0`,
                flex: `0 0 ${itemWidth}px`,
            },
        }
        const childrenWithProps = React.Children.map(children, (child: any) =>
            React.cloneElement(child, {
                style: styles.item,
                onClick: onItemClick,
            })
        )

        return (
            <SliderWrapper style={style}>
                <SliderInner
                    innerRef={el => {
                        this.innerContainer = el
                    }}>
                    <List style={styles.innerContainer}>
                        {childrenWithProps}
                    </List>
                    <SliderController
                        onClick={this.handleBtnClick}
                        showLeft={!isDockingLeft}
                        showRight={!isDockingRight}
                    />
                </SliderInner>
            </SliderWrapper>
        )
    }
}

export default Slider
