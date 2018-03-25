import * as React from 'react'
import styled from 'styled-components'
import { grey50, grey900 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const ControllerWrapper = styled.div``

const ControlArea = styled.div`
    position: absolute;
    flex-direction: ${props => props.right && 'row-reverse'};
    top: 8px;
    left: ${props => props.left && '0'};
    right: ${props => props.right && '0'};
    display: flex;
    align-items: center;
    width: 60px;
    height: 100%;
    opacity: 1;
    visibility: visible;
    transition: opacity 300ms ease-in-out, visibility 2s;
    background: ${props =>
        props.left &&
        'linear-gradient(to right, #f1f1f1, rgba(255, 255, 255, 0)'});
    background: ${props =>
        props.right &&
        'linear-gradient(to left, #f1f1f1, rgba(255, 255, 255, 0)'});
`

export interface ControllerProps {
    style?: React.CSSProperties
    onClick?: Function
    showLeft?: boolean
    showRight?: boolean
}

const Controller: React.StatelessComponent<ControllerProps> = ({
    showLeft,
    showRight,
    onClick,
}) => (
    <ControllerWrapper>
        {showLeft && (
            <ControlArea left>
                <FloatingActionButton
                    mini
                    backgroundColor={grey50}
                    iconStyle={{ fill: grey900 }}
                    onClick={() => onClick('toLeft')}>
                    <HardwareKeyboardArrowLeft />
                </FloatingActionButton>
            </ControlArea>
        )}
        {showRight && (
            <ControlArea right>
                <FloatingActionButton
                    mini
                    backgroundColor={grey50}
                    iconStyle={{ fill: grey900 }}
                    onClick={() => onClick('toRight')}>
                    <HardwareKeyboardArrowRight />
                </FloatingActionButton>
            </ControlArea>
        )}
    </ControllerWrapper>
)

export default Controller
