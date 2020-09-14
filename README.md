# js-tracking-report

> 一个属性声明式Javascript埋点库。

## 特点

- 支持点击、页面浏览、元素曝光事件的上报
- 支持异步页面加载的埋点
- 支持自定义设置元素曝光条件
- 支持自定义组装上报数据和自定义数据上报时机
- 页面无埋点逻辑，逻辑被统一处理
- 纯Javascript编写，支持在任意框架中运行，如React、Vue等

## 入门指南

1、安装js-tracking-report

```
npm i js-tracking-report --save
```

2、引入js-tracking-report

```
import JsTracking from 'js-tracking-report'
```

3、js-tracking-report 使用示例

```html
<div>
  <button data-tracking-element-click='{"message": "Hi miss..."}'>点击</button>
</div>

<script>
  JsTracking({
    processData: async (data, { eventType, element, ...arg }) => {
      return {
        title: data.page.title,
        ...data.attrData,
      }
    },
    elementViewConditions: element => {
      const innerHeight = window.innerHeight
      const y = element.getBoundingClientRect().y
      const height = element.getBoundingClientRect().height / 3 * 2

      return innerHeight - y >= height
    },
    submitConditions: dataList => {
      return dataList.length >= 3
    },
    submitData: dataList => {
      return ajax.post('url', {
        dataList
      })
    }
  })
</script>
```

在元素上添加添加属性后，会自动进行上报，如需传递数据，可以在属性中填写属性值，属性值为JSON格式。

## 参数说明

- ### dataName [Object] 属性名称

以下为默认属性名称配置，如需自定义可以自行修改属性名称参数值。

```js
{
  // 页面浏览
  pageLoad: 'data-tracking-page-load',
  // 元素点击
  elementClick: 'data-tracking-element-click',
  // 元素曝光
  elementView: 'data-tracking-element-view',
}
```

- ### processData [Function] 组装数据

每当上报事件触发时，会执行此方法，我们可以在这个方法里面拿到上报的数据、事件类型、页面路径、浏览器环境等信息，然后根据业务需求对数据进行组装处理并返回，此方法支持返回一个Promise。

- ### elementViewConditions [Function] 校验元素曝光条件

元素出现在可视区域会执行此方法，我们可以在这个方法里面做一些条件判断，只有符合我们预期的才进行上报。

比如这个元素不仅要出现在可视区域，并且需要元素露出在可视区域的2/3才进行上报，那么就可以在这个方法里面进行判断，并返回一个Boolean。

- ### submitConditions [Function] 校验数据上报条件

在执行processData方法后，会执行此方法，用于校验是否符合上报数据条件，比如我希望上报数据达到3条以上才进行上报，否则先进行暂存，那么就可以在这个方法里面添加上传条件，返回一个Boolean。

- ### submitData [Function] 上报数据

上报数据，在此方法中写上报数据逻辑，此方法可以拿到上报的数据列表，必须返回一个Promise，用于告知数据上报成功，并且只支持成功的Promise。

## 属性声明

1、 页面浏览

```jsx
<div data-tracking-page-load>首页</div>
```

可以在页面任意位置加页面浏览属性，页面加载后执行。

2、 元素点击

```jsx
<div data-tracking-element-click>点击</div>
```

3、 元素曝光

```jsx
<div data-tracking-element-view='{"name": "js-tracking"}'>曝光</div>
```

4、 异步数据

某些时候，需要动态插入数据到属性中，js-tracking为此提供了一个解决方案。

- React版

```jsx
const name = this.state.name

<div data-tracking-element-click={name ? JSON.stringify({ name }) : 'async'}>点击</div>
```

- Javascript版

```html
<div id="btn" data-tracking-element-click="async">点击</div>

<script>
  document.querySelector('#btn').setAttribute('data-tracking-element-click', JSON.stringify({
    name: 'js-tracking'
  }))
</script>
```

## 其他

```js
const jsTracking = JsTracking({
  ...
})
```

- 手动调用上传数据

```js
jsTracking.submitData()
```

- 获取当前所有上报数据

```js
jsTracking.getDataList()
```

- 手动添加上报数据

```js
jsTracking.pushData()
```

- 清空当前所有上报数据

```js
jsTracking.emptyData()
```
