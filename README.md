# windeco-components 
react components for windeco\
`v1.26.0`


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
[13. Text - многострочный текст](#Text)<br/>
[14. Icon - иконка](#Icon)<br/>



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
<Edit onInit={ ( o ) =>{ o.focus(); }} />
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
|onInit|function(component)|undefined|событие при создании, передает ссылку на компонент |
|addClass|string||добавить класс к input для стилизации,верхний класс wd-btn|
|dim|string||размерность|
|disable|{dim:bool}|{dim:false}|включить тот или иной признак|
|dim|string||размерность|
|placeholder|string||текст в незаполненном поле|
|visible|bool|true|признак display|
|readonly|bool|false|только для чтения|
|style|{}|{}|стиль css. Не все стили обрабатываются, на данный момент только 3 width,textAlign,fontSize|
|hint|string||подсказка title|
|required|bool|false|включает подсветку,для незаполненных полей и добавляет css класс ```wd-edit-require```|
|minLength|number|0|максимальное кол-во вводимых символов, если 0 то без ограничений|
|autoFocus|bool|false|установить фокус на компонент при создании|
### methods
|name|return|notes|
|----|----|-----|
|focus()||установить фокус на компонент, использовать component из onInit|

---
## Label
---
## CheckBox
```html
<Checkbox checked={true} onChange={this.onChange}/>
``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|checked|boolean|false|нажата или нет |
|value|string|undefined|значение отображаемое в поле|
|asRadio|boolean|false|если true то снятие галки возможно только через props и формироваться onChange при нажатии на галку не будет|
|onChange|function({id,checked})|undefined|событие на изменение |
|addClass|string||добавить класс к input для стилизации,верхний класс wd-btn|
|disable|num|0|блокировка на ввод|
|visible|bool|true|признак display|
|style|{}|{}|стиль css|
|hint|string||подсказка title|
---
## ComboBox
---
## ComboBoxEx
Ex:1
```html
 <ComboBoxEx
    style={{ height: 18 }}
    onChange={}
    list = {[
        { id: 1, caption: 'text1' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3' },
        { id: 4, caption: 'text4' },
    ]}
    required={true}
/>
``` 
Ex:2
```js
export const listClasses = {
    default: '',
    line: 'wd-cb32-line',
    double90: 'wd-cb32-90-double',
    none: 'wd-cb32-none',
};
```
```jsx

 <ComboBoxEx
    style={{ height: 18 }}
    onChange={}
    listClasses={listClasses}
    addClassItem = {'wd-cb32'}
    list = {[
        { id: 1, caption: 'text1', _indexClass_: 'default' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3', _indexClass_: 'line' },
        { id: 4, caption: 'text4', _indexClass_: 'double90' },
        { id: 5, caption: 'text5' },    
    ]}
    required={true}
/>
``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|idFieldName|string|id|имя ключевого поля|
|select|any|undefined|выбранный пункт (id)|
|hideBtnOnSelect|bool|false|скрывать кнопку раскрытия, если выбран элемент|
|onChange|function|undefined|событие на выбор пункта|
|placeholder|string||значение если пункт не выбран|
|maxListHeight|int|300|максимальная высота листа|
|maxListWidth|string|'auto'|'fixed' or 'auto'|
|list|array|[]|список строк|
|disabled|int|0|признак что компонент заблокирован|
|addClass|string||доп класс|
|addClassItem|string||доп класс к каждому элементу|
|required|bool|false|необходим для ввода|
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
|resizable|bool|false| форма может менять размеры|
|addClass|string|| добавляет css класс к форме|

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
|IconComponent|object||Компонент вывадящий иконку|
|icon|any||константа иконки|
|iconClass|string||дополнительный класс для иконки| 
|hint|string||подсказка title|
---
## Text
### Examle:
```javascript
<Text
    id={"text-1"}
    style={{ height: 100 }}
    maxLength={20}
    value={"init data"}
    hint="hint"
/>

``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|value|string|undefined|начальные данные, можно задать через props.children|
|onChange|function|undefined|onchange = function({id,value,sender}) |
|addClass|string||добавить класс к компоненту|
|placeholder|string||надпись в пустом компоненте|
|hint|string||подсказка title|
|readonly|bool|false|только для чтения| 
|disabled|num|0|неактивен|
|resize|bool|false|разрешить изменять размеры|
|maxLength|num|0|максимальная длина, если 0 то без ограничений|
|rows|num|0|максимально кол-во строк, задается вместе с cols|
|cols|num|0|максимальная длина строки, задается вместе с rows|
|required|bool|false|включает подсветку,для незаполненного поля и добавляет css класс ```wd-text-require```|
---
## Icon

### Examle:
```javascript
import {Icon} from 'fmihel-windeco-component';
// создание базы иконок
const iEdit='iEdit';
const iEdit16='iEdit16';

Icon.icons({
    [iEdit]:'./media/edit.png', // аналогично, что и {path:'./media/edit.png'}
    [iEdit16]:{path:'./media/edit16.png',addClass:'wd-icon'}
});

// использование иконки
<Icon icon={iEdit}/>
<BtnIcon  
    IconComponent={Icon}
    icon={iEdit16}
>ok
</BtnIcon>

``` 
### property
|prop|type|default|notes|
|----|----|-----|-----|
|icon|string|undefined|имя иконки в базе иконок, для создания базы используется глобальная ф-ция Icon.global или Icon.icons|
|addClass|string||добавляет класс к картинке|
|onClick|function|undefined|событие клик|
|style|object|{}|список свойств css|

---






