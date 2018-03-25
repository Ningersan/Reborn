import * as React from 'react'
import styled from 'styled-components'
import autobind from 'autobind-decorator'
import ReactCoreImageUpload from 'react-core-image-upload'

import media from '../utils/mediaquery'

export interface UploadImageProps {
    style?: React.CSSProperties
    circle?: boolean
    previewWidth?: string
    previewHeight?: string
    btnWidth?: string
    btnHeight?: string
    btnBackground?: string
    updateURL?: string
    defaultImgURL?: string
}

export interface UploadImageState {
    imgURL?: string
}

const UploadImageWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: ${props => props.theme.previewWidth};
    ${media.phone`
        width: 100%;
    `};
`

const UploadImagePreviewWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${props =>
        props.theme.circle
            ? props.theme.previewWidth
            : props.theme.previewHeight}
    margin-bottom: 30px;
    border: 1px solid #ccc;
    border-radius:${props => (props.theme.circle ? '50%' : '5px')}
    overflow: hidden
    img {
        width: 100%;
    }
`

const StyledReactCoreImageUpload = styled(ReactCoreImageUpload)`
    width: ${props => props.theme.btnWidth};
    height: ${props => props.theme.btnHeight};
    color: #fff;
    line-height: ${props => props.theme.btnHeight};
    text-align: center;
    background: ${props => props.theme.btnBackground};
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    &:hover {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
    ${media.phone`
        width: 100%;
    `};
`

class UploadImage extends React.Component<UploadImageProps, UploadImageState> {
    static defaultProps = {
        circle: false,
        btnWidth: '105px',
        btnHeight: '36px',
        previewWidth: '150px',
        previewHeight: '200px',
        btnBackground: 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);',
        defaultImgURL:
            'https://avatars1.githubusercontent.com/u/35354219?s=200&v=4',
    }

    constructor(props) {
        super(props)
        this.state = {
            imgURL: props.defaultImgURL,
        }
        // this.handleImageUploaded = this.handleImageUploaded.bind(this)
    }

    @autobind
    handleImageUploaded(res) {
        this.setState({
            imgURL: res.imgeURL,
        })
    }

    render() {
        const {
            style,
            btnBackground,
            previewWidth,
            previewHeight,
            circle,
            btnWidth,
            btnHeight,
            updateURL,
        } = this.props

        const { imgURL } = this.state
        return (
            <UploadImageWrapper style={style} theme={{ previewWidth }}>
                <UploadImagePreviewWrapper
                    theme={{ circle, previewWidth, previewHeight }}>
                    <img src={imgURL} />
                </UploadImagePreviewWrapper>
                <StyledReactCoreImageUpload
                    theme={{
                        btnBackground,
                        btnWidth,
                        btnHeight,
                    }}
                    text="上传图片"
                    url={updateURL} // 服务器上传位置
                    imageUploaded={this.handleImageUploaded}
                    cropBtn={{ ok: '确认', cancel: '取消' }}
                />
            </UploadImageWrapper>
        )
    }
}

export default UploadImage
