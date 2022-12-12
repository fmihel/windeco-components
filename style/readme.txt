import scheme:

1) All
@import 'componentpath/style/all.scss'



2) Redefine

... redefine common vars in vars.scss
@import 'componentpath/style/vars.scss'
... redefine style and vars for components 
@import 'componentpath/style/ctrls.scss'


3) import simple component

...redefine vars
@import '.../vars.scss';
@import 'componentpath/style/ctrls/Btn.scss';

