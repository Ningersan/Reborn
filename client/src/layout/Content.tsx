import * as React from 'react'
import styled from 'styled-components'
import media from '../utils/mediaquery'

export interface ContentProps {
    style?: React.CSSProperties
    children?: React.ReactNode
}

const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    ${media.tablet`
        width: 95%;
    `};
`

const Content: React.StatelessComponent<ContentProps> = ({
    style,
    children,
}) => <ContentWrapper style={style}>{children}</ContentWrapper>

export default Content
