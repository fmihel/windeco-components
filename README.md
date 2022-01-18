# windeco-components
react components for windeco

[1. Btn - кнопка](#Btn)<br/>
[2. Edit - поле ввода](#Edit)<br/>
[3. Label - метка](#Label)<br/>
[4. CheckBox - флажок](#CheckBox)<br/>
[5. ComboBox - раскрываемый список стандартный ](#ComboBox)<br/>
[6. ComboBoxEx - раскрываемый список расширенный](#ComboBoxEx)<br/>
[7. Table - стандартная таблица](#Table)<br/>
[8. TableFixed - расширенная таблица ( с фиксируемым заголовком)](#TableFixed)<br/>
[9. ModalDialog - Модальный диалог](#ModalDialog)<br/>
[10. Modal - обертка для модальных диалогов](#Modal)<br/>
[11. Waiter - блокиратор экрана на ввод](#Waiter)<br/>






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
|value|string|undefined|надпись на кнопке, можно задать через props.children|
|onClick|function|undefined|onclick событие|
|addClass|string||добавить класс к кнопке для стилизации,верхний класс wd-btn|
|hint|string||подсказка title|
---
## Edit
---
## Label
---
## CheckBox
---
## ComboBox
---
## ComboBoxEx
---
## Table
---
## TableFixed
```js
const prop = {
    id:'ID_ROW',
    fields:[
        {name:'ID_ROW',caption:'id',width:50},
        {name:'TEXT',caption:'notes'},
        {name:'DATA',caption:'data'}
    ],
    data:[
        {ID_ROW:1,TEXT:'some',DATA:'12/12/20',COST:234},
        {ID_ROW:2,TEXT:'any',DATA:'10/09/20',COST:443},
        {ID_ROW:3,TEXT:'more',DATA:'04/11/20',COST:394.3},
    ],

}; 
```
```html
<TableFixed {...prop}/>

```
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|string|ID|имя поля которое используется как уникальный идентификатор строки|
|fields|array|undefined|описание столбцов|
|data|array|[ ]|строки данных|
|onClick|function|undefined||
|onDblClick|function|undefined||
|onMount|function|undefined||
|stretch|bool|true|включает мехаизм растягивания по высоте таблицы до размеров родителя( с помощью js) <br> `ВНИМАНИЕ! у родительского фрейма, в случае stretch=true добавить overflow:hidden`|
|headerType|string|fields|тип заголовка - fields,caption,none|
|caption|string|Caption| загодловок если `headerType === 'caption'`|
|bottomShow|bool|true|отображать или нет подвал в конце таблицы|
|bottomText|string|конец|подпись в подвале|
|nodataShow|bool|true| отображать текст когда нет данных|
|nodataText|bool|нет данных||

### methods
|method|notes|
|----|----|
|select(o)||
---
## ModalDialog
```html
<ModalDialog
    footer:['ok','cancel']
    onClickHeaderClose:{this.onClose}
    onClickShadow:{this.onClose}
    onClickFooterBtn:{this.onClose}

>
</ModalDialog>
```
|prop|type|default|notes|
|----|----|-----|-----|
|visible|bool|true|сурывает (`НЕ УДАЛЯЕТ`) объект|
|onClickHeaderClose|function|undefined||
|onClickShadow|function|undefined||
|onClickFooterBtn|function|undefined||
|header|any|false|заголовок|
|footer|object|undefined|кнопки внизу панели Ex:<br> ['ok','cancel']<br>{ok:{}} |
---
## Modal
---
## Waiter









