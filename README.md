# windeco-components 
react components for windeco\
`v2.0`


[1. Btn - кнопка](#Btn)<br/>
[2. Edit - поле ввода](#Edit)<br/>
[3. *Label - метка](#Label)<br/>

```* - неотредактированные главы```

---
## Btn
```html
<Btn>name</Btn>
<Btn value="name"/>
``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|value|string|undefined|надпись на кнопке, можно задать через children|
|onClick|function|undefined|onclick событие|
|className|string|Btn.global.className|класс css|
|addClass|string|Btn.global.addClass|добавочный класс, результирующий будет к "`${className} ${addClass}`"|
|title|string||подсказка title|
### global
```js
Btn.global = {
    className: 'wd-btn',
    addClass: '',
};
```
`Глобальные параметры можно переопределить, для изменения значений, используемых по умолчанию.`\
Example:
```js
Btn.global = {
    ...Btn.global,
    className:'my-btn'
}

```
---

## Edit
```html
<Edit>name</Edit>
<Edit value="name" />

``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|type|string|text|тип поля text,password |
|value|string|undefined|значение отображаемое в поле|
|min|number|undefined|миниамальное значение для type=number or range|
|max|number|undefined|максимальное значение для type=number or range|
|step|number|undefined|шаг для type=number or range|
|onChange|function({id,value})|undefined|событие на изменение |
|onKeyPress|function({key,id,value,args})|undefined|событие после нажатия клавиши,args - оригинальные аргументы  |
|onKeyUp|function({key,id,value,args})|undefined|событие после прижатия клавиши,args - оригинальные аргументы  |
|onKeyDown|function({key,id,value,args})|undefined|событие после отжатия клавиши,args - оригинальные аргументы  |
|className|string|Edit.global.className|класс css|
|addClass|string|Edit.global.addClass|добавочный класс, результирующий будет к "`${className} ${addClass}`"|
|style|{}|{}|стиль css|
|disabled|bool|false|отключить возможность редактировния и фокуса|
|readonly|bool|false|только для чтения|
|required|bool|false|включает подсветку для незаполненных полей |
|placeholder|string||текст в незаполненном поле|
|visible|bool|true|признак display|
|title|string||подсказка title|
|minLength|number|0|максимальное кол-во вводимых символов, если 0 то без ограничений|

### global
```js
Edit.global = {
    className: 'wd-edit',
    addClass: '',
    style: {},
};
```

---
## Label
```html
<Label style={{color:'red'}}>
    <Edit>name</Edit>
</Label>
``` 

### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|caption|string|| отображаемый текст |
|addClass|string|undefined|класс добавляемый в label|
|style|object|{}|стиль css в label|

### global
```js
Label.global = {
    className: 'wd-label',
    classNameFrame: 'wd-label-frame',
    classAdd: '',
    style: {},
    styleFrame: {},
};
```

