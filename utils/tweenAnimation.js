//TWEEN required
/*
*@params from: <Obj>
*@params to: <Obj>
*@params interval: <Number> default 1000ms
*@params group: <Boolean> default false
*@params delay: <Number> default 0ms
**/
export function createTweenIns(from, to, delay=0, interval=1000, group=false) {
    let tweenIns, tweenGroup
    if (group) {
        tweenGroup = new TWEEN.Group()
        tweenIns = new TWEEN.Tween(from, tweenGroup)
    } else {
        tweenIns = new TWEEN.Tween(from)
    }
    tweenIns.to(to, interval).onUpdate((x)=>{console.log(x)}).start(delay)
    return tweenGroup
}

export function createAnimation(tween) {
    return function ab() {
        window.requestAnimationFrame(ab)
        tween.update()
    }
}


export default {}