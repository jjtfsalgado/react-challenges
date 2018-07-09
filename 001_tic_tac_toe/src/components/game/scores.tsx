import * as React from 'react';
import {mode, p} from "./game";
import {Link} from "react-router-dom";
import css from "./scores.less";

interface IScoresProps {
    player: p;
    mode: mode;
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

        return <div className={css.menu}>
            <div className={css.title}>
                <span>Tic Tac Toe</span>
            </div>
            <div className={css.playermodes}>
                <div>
                    Player 1: {scoreP1}
                </div>
                <div>
                    Player 2: {scoreP2}
                </div>
            </div>
            <div>
                <Link to="/game">Play again</Link>
            </div>
        </div>
    }
}