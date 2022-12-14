/** класс для реализации асинхронного результата React.setState
 *  Для того, что бы данные были переданы в асинхронный результат, нужно вызвать метод response
 * Реализовывался, для того, что бы упростить обработку после rendering
 * ex
 *
 * constructor(){
 *  ...
 *      this.setStateAsync = new AsyncState(this);
 * }
 *
 * componentDidUpdate(prevProps, prevState, prevContext) {
 *      // каждый раз после рендеринга (кроме первого раза !)
 *      this.asyncState.response();
 * }
 *
 * method(){
 *      this.asyncState.set({name:'mike'},outer_params)
 *          .then((outer_params)=>{
 *              // сюда попадем, только после того, как будет отрисовано изменение состояния name
 *          })
 * }
 *
*/
class AsyncState {
    constructor(ownerReactObject) {
        this.queue = [];
        this.owner = ownerReactObject;
    }

    set(state, params = undefined) {
        return new Promise((ok, err) => {
            this.queue.push({ ok, params });
            this.owner.setState(state);
        });
    }

    response() {
        const queue = [...this.queue];
        this.queue = [];
        queue.map(({ ok, params }) => ok(params));
    }
}

export default AsyncState;
