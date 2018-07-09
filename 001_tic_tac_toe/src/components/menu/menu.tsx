import * as React from 'react';
import {Link} from "react-router-dom";
import css from "./menu.less";

export class Menu extends React.Component<{},{}>{
    render(){
        return <div className={css.menu}>
            <div className={css.title}>
                <span>Tic Tac Toe</span>
            </div>
            <div className={css.playermodes}>

                <div className={css.button}>
                    <span>
                        <Link to="/game/one">One player</Link>
                    </span>
                </div>
                <div className={css.button}>
                    <span>
                        <Link to="/game/two">Two player</Link>
                    </span>
                </div>
            </div>
        </div>
    }
}