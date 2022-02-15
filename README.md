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
[12. BtnIcon - кнопка c иконкой](#BtnIcon)<br/>






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
```html
<Edit>name</Edit>
<Edit value="name" />
``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|value|string|undefined|значение отображаемое в поле|
|onChange|function({id,value})|undefined|событие на изменение |
|addClass|string||добавить класс к input для стилизации,верхний класс wd-btn|
|dim|string||размерность|
|disable|{dim:bool}|{dim:false}|включить тот или иной признак|
|dim|string||размерность|
|placeholder|string||текст в незаполненном поле|
|visible|bool|true|признак display|
|readonly|bool|false|только для чтения|
|style|{}|{}|стиль css|
|hint|string||подсказка title|
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
|fields|array|undefined|описание столбцов<br>[{name:FieldName,caption:ColumnCaption,width?:int},<br>...]|
|data|array|[ ]|строки данных<br|
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
```javascript
<ModalDialog
    header='Dialog'
    footer={['ok','cancel']}
    onClickHeaderClose={this.onClose}
    onClickShadow={this.onClose}
    onClickFooterBtn={this.onClose}
>
content..
</ModalDialog>
```
|prop|type|default|notes|
|----|----|-----|-----|
|visible|bool|true|скрывает (`НЕ УДАЛЯЕТ`) объект|
|onClickHeaderClose|function|undefined||
|onClickShadow|function|undefined||
|onClickFooterBtn|function|undefined||
|header|string|false|заголовок|
|footer|object|undefined|кнопки внизу панели <br>Ex1: ['ok','cancel']<br>Ex2: {ok(o){ console.log(o);}}<br>Ex3: {ok:{ <br>id:'ok-id',<br>caption:'enter',<br>addClass:'wd-primary'}} |
|align|string|stretch|stretch,custom,stickTo|
|stickTo|DOM or string|undefined| ссылка на DOM объект или id <br>Ex: stickTo = "#btn-1"|
|margin|int|50| отступ для align = 'stretch'|
|left|int|50| отступ слева для align = 'custom'|
|top|int|50| отступ сверху для align = 'custom'|
|width|int|300| ширина для align = 'custom' or 'stickTo'|
|height|int|100| высота для align = 'custom' or 'stickTo'|
|addShadowClass|string||класс для модификации shadow|
|shadowOpacity|float or string|0.1|коеффициент прозрачности тени <br>num or 'css' if shadowOpacity === 'css'  opacity defined in wd-shadow class|
|shadowEnable|bool|true|включить модальность|
|draggable|bool|true| перемещаемая форма, только для align = custom or stickTo|

---
## Modal
---
## Waiter
---
## BtnIcon
### need install 
```
 npm i @fortawesome/fontawesome-free@5.15.4 @fortawesome/fontawesome-svg-core@1.2.28 @fortawesome/free-solid-svg-icons@5.13.0 @fortawesome/react-fontawesome@0.1.9
```
### Examle:
```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile} from '@fortawesome/free-solid-svg-icons';
...
<BtnIcon
    IconComponent={FontAwesomeIcon}
    icon={faFile}
    addClass="wd-danger"
    iconClass="demo-bi-color"
>ok</BtnIcon>

<BtnIcon addClass="wd-primary">cancel</BtnIcon>
``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|value|string|undefined|надпись на кнопке, можно задать через props.children|
|onClick|function|undefined|onclick событие|
|addClass|string||добавить класс к кнопке для стилизации,верхний класс wd-btn-icon|
|IconComponent|object|Компонент вывадящий иконку|
|icon|any|константа иконки|
|iconClass|string|дополнительный класс для иконки| 
|hint|string||подсказка title|
---






