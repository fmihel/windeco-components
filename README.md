# windeco-components 
react components for windeco\
`v2.0`


[1. Btn - кнопка](#Btn)<br/>
[2. Edit - поле ввода](#Edit)<br/>
[3. Label - метка](#Label)<br/>
[4. CheckBox - флажок](#CheckBox)<br/>
[5. ComboBox - раскрываемый список](#ComboBoxEx)<br/>
[6. *TableFixed - расширенная таблица ( с фиксируемым заголовком)](#TableFixed)<br/>
[7. *ModalDialog - Модальный диалог](#ModalDialog)<br/>
[8. *Modal - обертка для модальных диалогов](#Modal)<br/>
[9. *Waiter - блокиратор экрана на ввод](#Waiter)<br/>
[10. *BtnIcon - кнопка c иконкой](#BtnIcon)<br/>
[11. *Text - многострочный текст](#Text)<br/>
[12. *Icon - иконка](#Icon)<br/>

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
|style|{}|Edit.global.style|стиль css|
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
|labelName|string|undefined|идентификатор управляемого Edit|
|caption|string|| отображаемый текст |
|className|string|Label.global.className|класс css фрейма|
|addClass|string|Label.global.addClass|класс добавляемый в фрейм label|
|style|object|Label.global.style|стиль css добавляемый в label|

### global
```js
Label.global = {
    className: 'wd-label',
    classAdd: '',
    style: {},
};
```

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
|onChange|function({id,checked,value})|undefined|событие на изменение |
|className|string|CheckBox.global.className|класс css|
|addClass|string|CheckBox.global.addClass|добавочный класс, результирующий будет к "`${className} ${addClass}`"|
|style|{}|CheckBox.global.style|стиль css|
|disabled|num|0|блокировка на ввод|
|visible|bool|true|признак display|
|hint|string||подсказка title|

### global
```js
CheckBox.global = {
    className: 'wd-checkbox',
    addClass: '',
    style: {},
};
```

---
## ComboBox
### Ex:1
```html
 <ComboBox
    onChange={()={

    }}
    list = {[
        { id: 1, caption: 'text1' },
        { id: 2, caption: 'text2' },
        { id: 3, caption: 'text3',_disabled_:true },
        { id: 4, caption: 'text4' },
    ]}
    required={true}
/>
``` 

### property
|prop|type|default|notes|
|----|----|-----|-----|
|id|any|undefined|идентификатор|
|aliasId|string|ComboBoxEx.global.aliasId|имя ключевого поля|
|aliasCaption|string|ComboBoxEx.global.aliasCaption|имя поля к отображению|
|aliasDisabled|string|ComboBoxEx.global.aliasDisabled|имя поля для указания, что строка неактивна|
|onChange|function({id,data})|undefined|событие на изменение |
|className|string|ComboBox.global.className|класс css|
|addClass|string|ComboBox.global.addClass|добавочный класс, результирующий будет к "`${className} ${addClass}`"|
|style|{}|ComboBox.global.style|стиль css|
|styleOuter|{}|undefined|стиль css добавляемый к постоянно отображаемому компоненту ItemComponent|
|styleItem|{}|undefined|стиль css добавляемый  компоненту ItemComponent используемомум в раскрываемом списке|
|list|array|[]|массив отображаемых данных|
|disabled|bool|false|блокирует объект на ввод|
|required|bool|false|добавляет атрибут [required]|
|select|string|undefined|мдентификатор выбранной строки|
|hideBtnOnSelect|bool|false|скрывает кнопку разворота при деактивации|
|onGetItemClass|func|undefined|метод вызываемый при отрисовке элемента ItemComponent|
|placeholder|string|ComboBox.global.placeholder|текст в пустом поле|
|ItemComponent|React|ComboBox.global.ItemComponent|компонент используемый для отображение строк и поля выбора|

### global
```js
ComboBox.global = {
    className: 'wd-combo',
    addClass: '',
    style: {},
    classNameList: 'wd-combo-list',
    addClassList: 'wd-scrollbar',
    placeholder: '- выбрать -',
    ItemComponent: ComboItem,
    onGetItemClass: undefined,
    aliasId: 'id',
    aliasCaption: 'caption',
    aliasDisabled: '_disabled_',
};
```

---


