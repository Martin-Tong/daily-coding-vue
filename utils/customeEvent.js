// @flow
let handle: {
    events: ?{[key: string]: Array<Object>},
    create(type: string, options: CustomEvent$Init): Object,
    trigerEvent(target: Object, eventType: string): Object
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
            return this
        },
        trigerEvent(target, eventType) {
            if ('dispatchEvent' in target && eventType in this.events) {
                let events: Array<Object> = this.events[eventType],
                    length: number = events.length - 1
                do {
                    target.dispatchEvent(events[length])
                } while (length-- > 0)
            } else if ('dispatchEvent' in target && true) {
                throw new Error(`Make sure ${eventType} has been register correctly.`)
            } else if (eventType in this.events && true) {
                throw new Error(`Make sure ${Object.prototype.toString.call(target)} has "dispatchEvent" method.`)
            } else {
                throw new Error(
                    `Make sure ${target} has "dispatchEvent" method.\nMake sure ${eventType} has been register correctly.`
                )
            }
            return this
        }
    }

export default handle