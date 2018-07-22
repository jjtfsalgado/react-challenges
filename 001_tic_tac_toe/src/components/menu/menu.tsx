import * as React from 'react';
import {Link} from "react-router-dom";
import css from "./menu.less";
import {ROUTES} from "../../globals";
import {p} from "../game/game";

export class Menu extends React.Component<{},{}>{
    componentDidMount(){
        localStorage.setItem(p.p1.toString(), "0");
        localStorage.setItem(p.p2.toString(), "0");
    }

    render(){
        return <div className={css.menu}>
            <div className={css.title}>
                <span>Tic Tac Toe</span>
            </div>
            <div className={css.playermodes}>
                <div className={css.button}>
                    <span>
                        <Link to={ROUTES.gameOne}>One player</Link>
                    </span>
                </div>
                <div className={css.button}>
                    <span>
                        <Link to={ROUTES.gameTwo}>Two player</Link>
                    </span>
                </div>
            </div>
        </div>
    }
}