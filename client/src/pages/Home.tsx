import * as React from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'

import { Header, HeaderLeft, HeaderRight, Content } from '../layout'
import { Menu, MenuItem, Search, Logo, Card } from '../components'

export interface HomeProps {}

const HomeWrapper = styled.div``

class Home extends React.Component<HomeProps, {}> {
    static defaultProps = {}

    render() {
        return (
            <div className="container">
                <Header>
                    <HeaderLeft>
                        <Logo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiEbKPGmTMDZlwbkRuDLmOLS5a9tSjxQ2oMcIyxLim7avWvr221w" />
                        <Search />
                    </HeaderLeft>
                    <HeaderRight>
                        <Menu>
                            <MenuItem>STAR</MenuItem>
                            <MenuItem>USER</MenuItem>
                            <MenuItem>SIGN OUT</MenuItem>
                        </Menu>
                    </HeaderRight>
                </Header>
                <Content>
                    <div
                        style={{
                            width: '100%',
                        }}>
                        <Masonry>
                            <Card
                                title="Barry.S.Jiang"
                                subtitle="MIS EC"
                                cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT8G8O8l2MuhRuJSvZF2ZHh3ODRX3nbPnhWz5hZkrP43KaoBMP"
                                onClick={function(e) {
                                    alert(1)
                                }}
                                onLike={function() {
                                    alert('like')
                                }}
                                onDislike={function() {
                                    alert('dislike')
                                }}
                            />
                            <Card />
                            <Card />
                            <Card cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsYal9FUJPDKU7Nc1VGyQ1OBsgMEo9AN_Djx7Z4ThI5Ih5BDb" />
                            <Card />
                        </Masonry>
                    </div>
                </Content>
            </div>
        )
    }
}

export default Home
