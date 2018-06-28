import * as React from 'react';
import {Board} from "./board";
import {Header} from "./header";
import css from "../app.less";

export enum mode {
    one,
    two
}

export enum player {
    p1,
    p2
}

interface IAppProps {

}

interface IAppState{
    mode: mode;
    player: player;
}

export class Game extends React.PureComponent<IAppProps,IAppState>{
    constructor(props: IAppProps){
        super(props);

        this.state = {
            player: player.p1,
            mode: mode.one
        }
    }
    render(){
        const {player,mode} = this.state;

        return <div className={css.app}>
            <Header player={player} mode={mode}/>
            <Board player={player} mode={mode} onPlay={this.onPlay}/>
        </div>
    }

    onPlay = () => this.setState({player: this.state.player == player.p1 ? player.p2 : player.p1});
}