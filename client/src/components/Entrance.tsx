import * as React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import autobind from 'autobind-decorator'
import { Button } from '../styles/default'
import media from '../utils/mediaquery'

const EntranceWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 390px;
    height: 630px;
    padding: 77px 55px 33px 55px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
    ${media.tablet`
        box-shadow: 0 0 0 0 transparent;
    `};
`

const EntranceForm = styled.form`
    position: relative;
    width: 100%;
    height: 100%;
    & span:nth-child(1),
    & span:nth-child(2) {
        display: block;
        margin-bottom: 26px;
        text-align: center;
        font-size: 28px;
        font-weight: 900;
        line-height: 1.2em;
        color: ${props => props.theme.primary1Color};
        font-family: Poppins-Bold;
    }
    & span:nth-child(2) {
        padding: 8px 0;
        margin-bottom: 26px;
    }
    & span:nth-child(2) i {
        display: inline-block;
        text-align: center;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        font-size: 36px;
        font-style: initial;
        line-height: 50px;
        color: #fff;
        background: ${props => props.theme.primary1Color};
    }
`

const StyledTextField = styled(TextField)`
    margin-bottom: 10px;
`

const EntranceBtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 33px;
`

const EntranceBtnWrapper = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
    &:hover div:nth-child(1) {
        left: 0;
    }
`

const EntranceBtnBackground = styled.div`
    position: absolute;
    top: 0;
    left: -100%;
    z-index: -1;
    width: 300%;
    height: 100%;
    background: ${props => `-webkit-linear-gradient(
        right,
        ${props.theme.primary2Color},
        ${props.theme.primary3Color},
        ${props.theme.primary2Color},
        ${props.theme.primary3Color}
    )`};
    transition: all 0.4s;
`

const EntranceBtn = Button.extend`
    display: flex;
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    color: #fff;
    text-transform: uppercase;
    line-height: 1.2;
    font-size: 15px;
    font-family: Poppins-Medium;
`

const EntranceSign = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 300px;
    color: #666;
    transform: translatex(-50%);
    text-align: center;
    font-size: 13px;
`

export interface EntranceProps {
    style?: React.CSSProperties
    title?: string
    logo?: boolean
    logoLetter?: string
    usernameText?: string
    passwordText?: string
    btnText?: string
    underlineDefaultColor?: string
    underlineFocusColor?: string
    sign?: string
    signHignlight?: string
    primary1Color?: string
    primary2Color?: string
    primary3Color?: string
    onSubmit?: (e: React.MouseEvent<any>) => void
    validities?: object
}

export interface EntranceState {
    isUsernameValid?: boolean
    isPasswordValid?: boolean
}

class Entrance extends React.Component<EntranceProps, EntranceState> {
    static defaultProps = {
        title: 'Paper crane',
        logo: true,
        logoLetter: 'x',
        btnText: 'login',
        usernameText: 'Username',
        passwordText: 'Password',
        sign: 'Welcome to Paper crane',
        primary1Color: '#333',
        primary2Color: '#21d4fd',
        primary3Color: '#b721ff',
        validities: {
            username: {
                pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
                msg: '输入5-20个字母开头带数字、“_”、“.”的字符串',
            },
            password: {
                pattern: /^(\w){6,20}$/,
                msg: '只能输入6-20个字母、数字、下划线',
            },
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            isUsernameValid: null,
            isPasswordValid: null,
        }
        // this.handleFocus = this.handleFocus.bind(this)
        // this.handleBlur = this.handleBlur.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    @autobind
    handleFocus(e) {
        const { validities } = this.props
        const { target } = e
        const { name, value } = target
        const statusType = {
            username: 'isUsernameValid',
            password: 'isPasswordValid',
        }[name]
        this.setState({
            [statusType]: null,
        })
    }

    @autobind
    handleBlur(e) {
        const { validities } = this.props
        const { target } = e
        const { name, value } = target
        const statusType = {
            username: 'isUsernameValid',
            password: 'isPasswordValid',
        }[name]
        const validity = validities[name]
        if (!validity.pattern.test(value)) {
            this.setState({
                [statusType]: false,
            })
        } else {
            this.setState({
                [statusType]: true,
            })
        }
    }

    @autobind
    handleSubmit(e) {
        e.preventDefault()
        const { onSubmit } = this.props
        const { isUsernameValid, isPasswordValid } = this.state
        isUsernameValid && isPasswordValid && onSubmit && onSubmit(e)
    }

    render() {
        const {
            style,
            title,
            logo,
            logoLetter,
            usernameText,
            passwordText,
            btnText,
            underlineDefaultColor,
            underlineFocusColor,
            sign,
            primary1Color,
            primary2Color,
            primary3Color,
            onSubmit,
            validities,
        } = this.props
        const { isUsernameValid, isPasswordValid } = this.state
        return (
            <EntranceWrapper style={style}>
                <EntranceForm
                    theme={{ primary1Color }}
                    onSubmit={this.handleSubmit}>
                    <span>{title.toUpperCase()}</span>
                    {logo && (
                        <span>
                            <i>{logoLetter.toUpperCase()}</i>
                        </span>
                    )}
                    <StyledTextField
                        fullWidth
                        type="text"
                        name="username"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        errorText={
                            isUsernameValid === false &&
                            validities['username']['msg']
                        }
                        floatingLabelText={usernameText}
                        floatingLabelStyle={{ top: '30px' }}
                        floatingLabelFocusStyle={{
                            fontSize: '20px',
                            color: 'rgba(0, 0, 0, 0.3)',
                            transition: 'all .4s',
                        }}
                        underlineFocusStyle={
                            primary1Color
                                ? { borderColor: primary1Color }
                                : null
                        }
                    />
                    <br />
                    <StyledTextField
                        fullWidth
                        type="password"
                        name="password"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        errorText={
                            isPasswordValid === false &&
                            validities['password']['msg']
                        }
                        floatingLabelText={passwordText}
                        floatingLabelStyle={{ top: '30px' }}
                        floatingLabelFocusStyle={{
                            fontSize: '20px',
                            color: 'rgba(0, 0, 0, 0.3)',
                            transition: 'all .4s',
                        }}
                        underlineFocusStyle={
                            primary1Color
                                ? { borderColor: primary1Color }
                                : null
                        }
                    />
                    <br />
                    <EntranceBtnContainer>
                        <EntranceBtnWrapper>
                            <EntranceBtnBackground
                                theme={{ primary2Color, primary3Color }}
                            />
                            <EntranceBtn>{btnText.toUpperCase()}</EntranceBtn>
                        </EntranceBtnWrapper>
                    </EntranceBtnContainer>
                    <EntranceSign>{sign}</EntranceSign>
                </EntranceForm>
            </EntranceWrapper>
        )
    }
}

export default Entrance
