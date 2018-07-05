import * as React from 'react';
import * as cls from 'classnames';
import css from "./header.less";
import {mode, player} from "./game";
import {Link} from "react-router-dom";

interface IHeaderProps {
    player: player;
    mode:mode;
    className?: string;
}

export class Header extends React.Component<IHeaderProps,{}>{
    render(){
        return <div className={css.header}>
            <ScoreScreen {...this.props} type={player.p1} className={css.left}/>
            <Controls/>
            <ScoreScreen {...this.props} type={player.p2} className={css.right}/>
        </div>
    }
}

const ScoreScreen = (props: Partial<IHeaderProps> & { type: player }) => {
    return <div className={cls([css.score, props.className])}>
        <div className={css.name}>
            {props.player == props.type && (props.type == 0 ? "Player 1" : "Player 2")}
        </div>
        <div className={css.number}>
            0
        </div>
    </div>
};

class Controls extends React.Component<{}, {}> {
    render() {
        return <div className={css.controls}>
            <Link to="/">Menu</Link>
        </div>
    }
}