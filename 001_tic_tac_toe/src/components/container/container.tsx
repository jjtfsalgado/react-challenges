import * as React from 'react';
import css from "./container.less";

export class Container extends React.PureComponent<{},{}>{
    render() {
        return <div className={css.container}>
            <div className={css.row}>
                <PlayBox/>
                <PlayBox/>
                <PlayBox/>
            </div>
            <div className={css.row}>
                <PlayBox/>
                <PlayBox/>
                <PlayBox/>
            </div>
            <div className={css.row}>
                <PlayBox/>
                <PlayBox/>
                <PlayBox/>
            </div>
        </div>
    }
}

class PlayBox extends React.PureComponent<{},{}>{
    render(){
        return <div className={css.box}>
            X
        </div>
    }
}