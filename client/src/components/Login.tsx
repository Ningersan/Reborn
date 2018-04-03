import * as React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Entrance } from '../components'

class Login extends React.Component {
    render() {
        const props = {
            btnText: 'Sign in',
            primary1Color: '#a18cd1',
            primary2Color: '#a18cd1',
            primary3Color: '#fbc2eb',
            onSubmit: function(e) {
                e.preventDefault()
                const { target } = e
                const username = target.username.value
                const password = target.password.value
                var instance = axios.create({
                    baseURL: 'http://wsmis126:9000/',
                    headers: {
                        Authorization:
                            'bearer eyJhbGciOiJIUzI1NiJ9.enp6.QS7AJNszjHl79f8Yrmq-mXwkMjWcJtbeNiASl-4PX4g',
                    },
                })
                instance
                    .get('http://wsmis126:9000/api/users', {
                        params: {
                            pageSize: 8,
                            page: 0,
                        },
                    })
                    .then(res => {
                        console.log(res)
                    })
            },
        }
        return <Entrance {...props} />
    }
}

export default Login
