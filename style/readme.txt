import scheme:

1) All
@import '<COMPONENT-PATH>/style/all.scss'



2) Redefine
... redefine common vars in vars.scss
@import '<COMPONENT-PATH>/style/vars.scss'
... redefine style and vars for components 
@import '<COMPONENT-PATH>/style/ctrls.scss'



3) import simple component
...redefine vars
@import '<COMPONENT-PATH>/style/vars.scss';
@import '<COMPONENT-PATH>/style/Btn.scss';

