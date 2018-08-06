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

export const Header = (props: IHeaderProps) => {
    const {isScores} = props;
    return (
        <div className={css.header}>
            {!isScores && <ScoreScreen {...props} type={p.p1} className={css.left}/>}
            <Controls/>
            {!isScores && <ScoreScreen {...props} type={p.p2} className={css.right}/>}
        </div>)
};

const ScoreScreen = (props: Partial<IHeaderProps> & { type: p }) => {
    return <div className={cls(css.score, props.className)}>
        <div className={css.name}>
            {props.player == props.type && (props.type == 0 ? "Player 1" : "Player 2")}
        </div>
        <div className={css.number}>
            0
        </div>
    </div>
};

const Controls = () => (
    <div className={css.controls}>
        <Link to={ROUTES.menu}>Menu</Link>
    </div>
);