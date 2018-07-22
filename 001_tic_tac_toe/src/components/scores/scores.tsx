import * as React from 'react';
import {m, p} from "../game/game";
import {Link, RouteComponentProps} from "react-router-dom";
import css from "./scores.less";
import {ROUTES} from "../../globals";

interface IScoreRoute{
    winner: p
}

interface IScoresProps extends RouteComponentProps<IScoreRoute>{
    player: p;
    mode: m;
}

interface IScoresState {
    scoreP1: string;
    scoreP2: string;
}

export class Scores extends React.PureComponent<IScoresProps,IScoresState>{

    constructor(props: IScoresProps){
        super(props);

        this.state = {
            scoreP1: localStorage.getItem(p.p1.toString()),
            scoreP2: localStorage.getItem(p.p2.toString())
        }
    }

    render() {
        const {scoreP1, scoreP2} = this.state;
        const {player, match, mode} = this.props;

        return <div className={css.scores}>
            <div className={css.title}>
                <span>Player {match.params.winner == p.p1 ? "ONE" : "TWO"} won</span>
            </div>
            <div className={css.players}>
                <div className={css.score}>
                    Player 1: {scoreP1}
                </div>
                <div className={css.score}>
                    Player 2: {scoreP2}
                </div>
            </div>
            <div className={css.playagain}>
                <Link to={mode == m.one ? ROUTES.gameOne: ROUTES.gameTwo}>Play again</Link>
            </div>
        </div>
    }
}