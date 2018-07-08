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

const winningCombinations = [['00','01','02'],['10', '11','12'],['20','21','22'], ['00','10','20'], ['01', '11','21'], ['02','01','02'], ['00','11','22']];

export class Game extends React.PureComponent<IAppProps,IAppState>{
    constructor(props: IAppProps){
        super(props);

        this.state = {
            player: player.p1,
            mode: mode.one
        };

        this.combinationsP1 = [];
        this.combinationsP2 = [];
    }

    combinationsP1:Array<string>;
    combinationsP2:Array<string>;

    render(){
        const {player,mode} = this.state;

        return <div className={css.app}>
            <Header player={player} mode={mode}/>
            <Board player={player} mode={mode} onPlay={this.onPlay}/>
        </div>
    }

    onPlay = (xx:number,yy:number) => {
        const x = xx.toString();
        const y = yy.toString();
        const combPlayer = this.state.player == player.p1 ? this.combinationsP1 : this.combinationsP2;

        combPlayer.push(x + y);

        for(const comb of winningCombinations){
            if(comb.every(elem => combPlayer.indexOf(elem) > -1)){
                alert("winnnerr")
            };
        }
        console.log(this.combinationsP1,this.combinationsP2);

        this.setState({player: this.state.player == player.p1 ? player.p2 : player.p1})
    };
};