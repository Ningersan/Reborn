import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'
import {
    cyan500,
    cyan700,
    pinkA200,
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { Home, Login, Register } from './pages'

import getRandomColor from './utils/getRandomColor'

import { Center } from './layout'

import { SelectAll } from './demos'
import { UploadImage, Slider, Card } from './components'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    },
})

const baseStyles = () => injectGlobal`
    ${reset}
    margin: 0;
    padding: 0;
    font-family: Monospace Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif
    html, body, #root, .container {
        height: 100%;
    }
    div {
        word-wrap:break-word;
    }
    input:-webkit-autofill, 
    textarea:-webkit-autofill, 
    select:-webkit-autofill { 
        box-shadow: 0 0 0 1000px white inset; 
    }
`

const styles = {
    img: {
        height: '118px',
    },
}

const App = () => {
    baseStyles()
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div className="container">
                <Home />
            </div>
        </MuiThemeProvider>
    )
}

export default App
