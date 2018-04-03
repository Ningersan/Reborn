# Reborn

## Back End

### API

| Url          | Method |
| ------------ | ------ |
| api/register | post   |
| api/login    | post   |

### Status

| code | description                                                   |
| ---- | ------------------------------------------------------------- |
| 200  | ok                                                            |
| 401  | 权限错误，访问除了 register/login 以外的 api 都需要携带 token |
| 500  | 服务器错误，请耐心等待我来修 qwq                              |

### Response

## Front End

| 参数          | 说明                               | 类型        | 默认值            |
| ------------- | ---------------------------------- | ----------- | ----------------- |
| style         | 根节点样式                         | object      |                   |
| title         | 标题                               | string      | Paper crane(大写) |
| logo          | 是否需要 logo                      | boolean     | true              |
| logoLetter    | logo 显示的字母                    | string      | X(大写)           |
| usernameText  | 用户名提示语                       | string      | Username          |
| passwordText  | 密码提示语                         | string      | Password          |
| btnText       | 按钮文字                           | string      | Login(大写)       |
| sign          | 底部提示语                         | string      |                   |
| primary1Color | title、logo、下划线颜色            | string      | #333              |
| primary2Color | btn 渐变色 1                       | string      | #21d4fd           |
| primary3Color | btn 渐变色 2                       | string      | #b721ff           |
| onSubmit      | 提交的处理函数                     | function(e) | 无                |
| validities    | 判断密码和用户名的正则以及错误信息 | object      | 见下方            |

```javascript
const validities = {
    username: {
        pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
        msg: '输入5-20个字母开头带数字、“_”、“.”的字符串',
    },
    password: {
        pattern: /^(\w){6,20}$/,
        msg: '只能输入6-20个字母、数字、下划线',
    },
}
```

### Card

| 参数        | 说明                | 类型     | 默认值 |
| ----------- | ------------------- | -------- | ------ |
| style       | 根节点样式          | object   |        |
| cover       | 封面图地址          | string   |        |
| description | 卡片描述            | string   |        |
| like        | 是否需要点赞功能    | boolean  | true   |
| hover       | 是否需要 hover 效果 | boolean  |        |
| onClick     | 点击事件处理函数    | function |        |
| onLike      | 点赞处理函数        | function |        |
| onDislike   | 取消点赞处理函数    | function |        |

### UploadImage

图片上传组件

| 参数          | 说明               | 类型    | 默认值                                            |
| ------------- | ------------------ | ------- | ------------------------------------------------- |
| style         | 根节点样式         | object  |                                                   |
| circle        | 预览图片是否为圆形 | boolean | false                                             |
| previewWidth  | 预览图片宽度       | string  | 150px                                             |
| previewHeight | 预览图片高度       | string  | 200px                                             |
| btnWidth      | 按钮宽度           | string  | 105px                                             |
| btnHeight     | 按钮高度           | string  | 36px                                              |
| btnBackground | 按钮背景色         | string  | linear-gradient(120deg, #a6c0fe 0%, #f68084 100%) |
| updateURL     | 上传至服务器的 URL | string  |                                                   |
| defaultImgURL | 默认占位图片       | string  |                                                   |

### Checkbox

复选框，该项目中用作技能选择
| 参数 | 说明 | 类型 | 默认值 |
| ----- | ---------- | ------ | ------ |
| index | 元素下标，用于定位元素 | number | |
| style | 根节点样式 | object | |
| height | 单选框高度 | string | |
| text | 单选框文本 | string | |
| textColor | 文本颜色 | string | |
| backgroundDefaultColor | 默认背景颜色 | string | |
| backgroundActiveColor | 选中背景颜色 | string | |
| onCheck | 点击事件处理函数 | function | |
| checked | 是否选中 | boolean | |

### CheckboxGroup

| 参数         | 说明                 | 类型                   | 默认值 |
| ------------ | -------------------- | ---------------------- | ------ |
| style        | 根节点样式           | object                 |        |
| options      | 所有选项             | array                  |        |
| defaultValue | 默认选中选项         | array                  |        |
| value        | 选中选项             | array                  |        |
| onChange     | 选项改变时的处理函数 | function(checkedValue) |        |

### Slider

| 参数        | 说明                   | 类型      | 默认值 |
| ----------- | ---------------------- | --------- | ------ |
| style       | 根节点样式             | object    |        |
| children    | item 节点              | ReactNode |        |
| itemWidth   | item 宽度              | number    | 210    |
| itemSpacing | item 间隔              | number    | 5      |
| onItemClick | 点击 item 时的处理函数 | function  |        |

### SliderController

| 参数        | 说明                   | 类型     | 默认值 |
| ----------- | ---------------------- | -------- | ------ |
| style       | 根节点样式             | object   |        |
| showLeft    | 显示左边区域           | boolean  |        |
| showRight   | 显示右边区域           | boolean  |        |
| onItemClick | 点击 item 时的处理函数 | function |        |

```html
<!--slider-->
<Slider>
    <Card />
    <Card />
    <Card />
</Slider>
```
