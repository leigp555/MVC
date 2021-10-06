import $ from "jquery"


class EventBus{
    constructor() {
        this._eventbus=$(window)
    }
    on(eventName,fn){
        return this._eventbus.on(eventName,fn)
    }
    trigger(eventName,data){
        return this._eventbus.trigger(eventName, data);
    }
    off(eventName,data){
        return this._eventbus.off(eventName,data)
    }
}
export default EventBus
const eventbus=new EventBus()
