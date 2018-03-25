import * as React from 'react'
import styled from 'styled-components'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import media from '../utils/mediaquery'

export interface CardProps {
    style?: React.CSSProperties
    cover?: string
    title?: string
    subtitle?: string
    description?: string
    like?: boolean
    hover?: boolean
    onClick?: React.MouseEventHandler<any>
    onLike?: Function
    onDislike?: Function
    imgStyle?: Object
}

export interface CardWrapperProps {
    hover?: boolean
}

const CardWrapper = styled.div`
    width: 23%;
    margin: 1%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    transition: all 0.3s ease;
    img {
        width: 100%;
    }
    &:hover {
        box-shadow: ${(props: CardWrapperProps) =>
            props.hover && '0 26px 40px -24px rgba(0, 36, 100, 0.3)'};
        transform: ${(props: CardWrapperProps) =>
            props.hover && 'translateY(-3px)'};
        cursor: pointer;
    }
    ${media.tablet`
        width: 48%;
        &:hover {
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
            transform: translateY(0);
        }
    `};
    ${media.phone`
        width: 100%;
        margin: 10px 0;
    `};
`

const CardCover = styled.div``

const CardText = styled.div`
    padding: 20px;
    p {
        font-size: 14px;
        line-height: 24px;
    }
    ${media.tablet`
        p{
            text-align: center;
        }
    `};

    .card-footer {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        color: rgba(0, 0, 0, 0.45);
        p {
            font-size: 12px;
        }
        line-height: 20px;
        ${media.tablet`
            display: block;
            p {
                line-height: 30px;
            }
        `};
    }
`

class Card extends React.Component<CardProps, {}> {
    static defaultProps = {
        description: '这个人很懒，什么都没留下。',
        hover: true,
        like: true,
        cover: 'http://www.360live.com.cn/images/detailpic_no.png',
    }

    constructor(props) {
        super(props)
        this.handleCheck = this.handleCheck.bind(this)
    }

    handleCheck(e, isChecked) {
        const { onLike, onDislike } = this.props
        e.stopPropagation()
        if (isChecked) {
            onLike && onLike()
        } else {
            onDislike && onDislike()
        }
    }

    render() {
        const {
            style,
            cover,
            title,
            subtitle,
            description,
            like,
            hover,
            onClick,
            imgStyle,
        } = this.props
        const mStyles = {
            block: {
                maxWidth: 100,
            },
            icon: {
                fill: '#FF5252',
                margin: '0 auto',
            },
            checkbox: {
                marginBottom: 16,
            },
        }

        return (
            <CardWrapper style={style} onClick={onClick} hover={hover}>
                <CardCover>
                    <img src={cover} style={imgStyle} />
                </CardCover>
                <CardText>
                    <p>{description}</p>
                    <div className="card-footer">
                        {title && <p>{title}</p>}
                        <p>{subtitle}</p>
                        {like && (
                            <span>
                                <Checkbox
                                    style={mStyles.checkbox}
                                    iconStyle={mStyles.icon}
                                    checkedIcon={<ActionFavorite />}
                                    uncheckedIcon={<ActionFavoriteBorder />}
                                    onCheck={this.handleCheck}
                                />
                            </span>
                        )}
                    </div>
                </CardText>
            </CardWrapper>
        )
    }
}

export default Card
