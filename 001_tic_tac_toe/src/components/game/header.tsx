import * as React from 'react';
import css from "./header.less";
import {m, p} from "./game";
import {Link} from "react-router-dom";
import {cls} from "../../utils";
import {ROUTES} from "../../globals";

interface IHeaderProps {
    player: p;
    className?: string;
    isScores: boolean;
}

export class Header extends React.Component<IHeaderProps,{}>{
    render(){
        const {isScores} = this.props;

        return <div className={css.header}>
            {!isScores && <ScoreScreen {...this.props} type={p.p1} className={css.left}/>}
            <Controls/>
            {!isScores && <ScoreScreen {...this.props} type={p.p2} className={css.right}/>}
        </div>
    }
}

const ScoreScreen = (props: Partial<IHeaderProps> & { type: p }) => {
    return <div className={cls(css.score, props.className)}>
        <div className={css.name}>
            {props.player== props.type && (props.type == 0 ? "Player 1" : "Player 2")}
        </div>
        <div className={css.number}>
            0
        </div>
    </div>
};

class Controls extends React.Component<{}, {}> {
    render() {
        return <div className={css.controls}>
            <Link to={ROUTES.menu}>Menu</Link>
        </div>
    }
}