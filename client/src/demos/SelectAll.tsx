import * as React from 'react'
import styled from 'styled-components'
import autobind from 'autobind-decorator'


import { Checkbox } from '../components'

const CheckboxGroup = Checkbox.Group

export interface SelectAllProps {
    style?: React.CSSProperties
}

const SelectAllWrapper = styled.div``
const options = ['apple', 'pear', 'banana']
const defaultCheckedList = ['pear']

class SelectAll extends React.Component<SelectAllProps, any> {
    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = {
            checkedList: defaultCheckedList,
            // indeterminate: true,
            checkAll: false,
        }
        // this.handleCheckAll = this.handleCheckAll.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    @autobind
    handleCheckAll() {
        this.setState((prevState, props) => {
            const checkedList = !prevState.checkAll ? options.slice() : []
            return {
                checkedList,
                checkAll: !prevState.checkAll,
            }
        })
    }

    @autobind
    handleChange(checkedValue) {
        if (checkedValue.length === options.length) {
            this.setState({
                checkedList: options.slice(),
                checkAll: true,
            })
        }
    }

    render() {
        const { style } = this.props
        const { checkedList, checkAll } = this.state
        return (
            <SelectAllWrapper style={style}>
                <Checkbox
                    text="全选"
                    onCheck={this.handleCheckAll}
                    checked={checkAll}
                />
                <CheckboxGroup
                    options={options.slice()}
                    value={checkedList}
                    onChange={this.handleChange}
                />
            </SelectAllWrapper>
        )
    }
}

export default SelectAll
