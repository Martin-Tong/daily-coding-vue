// @flow
let handle: {
    events: ?{[key: string]: Array<Object>},
    create(type: string, options: CustomEvent$Init): Object
    } = {
        events: {},
        create(type, options) {
            let events = this.events, ins;
            ins = new CustomEvent(type, options);
            if (events[type]) {
                events[type].push(ins)
            } else {
                events[type] = [ins]
            }
            return ins
        }

    }

export default handle