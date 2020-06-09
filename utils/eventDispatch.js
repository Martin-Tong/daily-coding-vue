export default {
    addEventListener: function(type, call) {
        if (!this.__events) {
            this.__events = {}
        }
        var events = this.__events
        if (events[type] === undefined) events[type] = []
        if (events[type].indexOf(call) === -1) events[type].push(call)
    },
    hasEventListener: function(type, call) {       
        if (this.__events === undefined) {
            return false
        } 
        var events = this.__events
        return events[type] !== undefined && events[type].indexOf(call) !== -1
    },
    removeEventListener: function(type, call) {
        if (this.__events === undefined) return
        var events = this.__events,
            eventsCallback = events[type]
        if (eventsCallback !== undefined) {
            var index = eventsCallback.indexOf(call)
            if (index !== -1) {
                eventsCallback.splice(index, 1)
            }
        }
    },
    dispatchEvent: function(event) {
        if (this.__events === undefined) return
        let events = this.__events,
            eventsCallback = events[event.type]
        if (eventsCallback !== undefined) {
            event.target = this
            var array = eventsCallback.splice(0)
            for (var i=0, l=array.length; i < l; i++) {
                array[i].call(this, event)
            }
        }    
    }
}