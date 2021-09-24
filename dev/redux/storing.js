/* eslint-disable import/no-extraneous-dependencies */
import { Storing } from 'fmihel-redux-wrapper';

export default class MyStoring extends Storing {
    /**
     * переключение режима ожидания/свободный
     * @param {boolean} enable
     */
    idle(enable) {
        return this.extend({
            // ui: { state: (enable ? 'idle' : 'wait') },
        });
    }

    error(o) {
        if (('res' in o) && ('msg' in o) && ('data' in o)) {
            return this.extend({
                error: { visible: true, msg: o.msg },
            });
        } return super.error(o);
    }
}
