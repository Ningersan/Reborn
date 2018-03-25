import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import autobind from 'autobind-decorator'
import CheckboxGroup from './CheckboxGroup'

export interface CheckboxProps {
    index?: number
    style?: React.CSSProperties
    height?: string
    text?: string
    textColor?: string
    backgroundDefaultColor?: string
    backgroundActiveColor?: string
    onCheck?: (e: any, index: number, value: string, isActive: boolean) => void
    onChange?: () => void
    checked?: boolean
}

export interface CheckboxState {
    active?: boolean
}

const CheckboxWrapper = styled.div`
    height: ${props => props.theme.height};
    padding: 0 12px;
    color: ${props => props.theme.textColor};
    line-height: ${props => props.theme.height};
    border-radius: 16px;
    background: ${props => props.theme.backgroundColor};
    cursor: pointer;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(0, 0, 0, 0.08);
    }
`

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    static Group: typeof CheckboxGroup
    static defaultProps = {
        height: '30px',
        text: 'Paper crane',
        textColor: '#fff',
        backgroundDefaultColor: '#ccc',
        backgroundActiveColor:
            'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    }
    static contextTypes = {
        checkboxGroup: PropTypes.any,
    }

    constructor(props) {
        super(props)
        this.state = {
            active: props.checked || false,
        }
        // this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps: CheckboxProps) {
        if ('checked' in nextProps) {
            if (nextProps.checked !== this.state.active) {
                this.setState({
                    active: nextProps.checked || false,
                })
            }
        }
    }

    @autobind
    handleClick(e) {
        const { onChange, onCheck, index, text } = this.props
        // console.log(text)

        onChange && onChange()
        this.setState(prevState => {
            onCheck && onCheck(e, index, text, !prevState.active)
            return { active: !prevState.active }
        })
    }

    render() {
        const {
            style,
            height,
            textColor,
            backgroundDefaultColor,
            backgroundActiveColor,
            text,
        } = this.props
        const backgroundColor = this.state.active
            ? backgroundActiveColor
            : backgroundDefaultColor
        return (
            <CheckboxWrapper
                style={style}
                theme={{
                    height,
                    textColor,
                    backgroundColor,
                }}
                onClick={this.handleClick}>
                {text}
            </CheckboxWrapper>
        )
    }
}

export default Checkbox
