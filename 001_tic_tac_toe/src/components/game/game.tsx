import * as React from 'react';
import {Board} from "./board";
import {Header} from "./header";
import css from "../app.less";
import {Route, RouteComponentProps} from "react-router-dom";
import {Scores} from "../scores/scores";
import {ROUTES} from "../../globals";

export enum m {
    one = "one",
    two = "two"
}

export enum p {
    p1,
    p2
}

export interface IRouteParams {
    winner: p;
    mode: m;
}


interface IAppProps extends RouteComponentProps<IRouteParams>{

}

interface IAppState{
    player: p;
    x:number;
    y:number;
}

const winningCombinations = [['00','01','02'],['10', '11','12'],['20','21','22'], ['00','10','20'], ['01', '11','21'], ['02','12','22'], ['00','11','22'], ['20','11','02']];

export class Game extends React.PureComponent<IAppProps,IAppState>{
    constructor(props: IAppProps){
        super(props);

        this.state = {
            player: p.p1,
            y:null,
            x: null
        };

        this.combinationsP1 = [];
        this.combinationsP2 = [];
    }

    combinationsP1:Array<string>;
    combinationsP2:Array<string>;

    render(){
        const {player, x, y} = this.state;
        const {location} = this.props;
        const isScores = location.pathname.startsWith("/game/scores/");

        return <div className={css.app}>
            <Header player={player} isScores={isScores}/>
            <Route exact path={ROUTES.game} render={(props) => <Board {...props} x={x} y={y} player={player} onPlay={this.onPlay}/>}/>
            <Route exact path={ROUTES.scores} render={(props) => <Scores {...props} player={player}/>}/>
        </div>
    }

    onPlay = (xx:number,yy:number) => {
        const {player} = this.state;
        const {match, history} = this.props;
        const x = xx.toString();
        const y = yy.toString();
        const mode = match.params.mode;
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;

        combPlayer.push(x + y);

        //check if there was any winner play
        for(const comb of winningCombinations){
            if(comb.every(elem => combPlayer.includes(elem))){
                const score = localStorage.getItem(player.toString());
                this.combinationsP1 = [];
                this.combinationsP2 = [];

                localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                history.push(`/game/scores/${player}`);
                return this.setState({
                    player: player == p.p1 ? p.p2 : p.p1,
                    x:null,
                    y:null
                });
            };
        };

        this.setState({
            player: player == p.p1 ? p.p2 : p.p1,
            x: xx,
            y: yy
        }, () => {
            if(mode === m.one && player == p.p1){
                this.onComputerPlay()
            }
        });
    };

    onComputerPlay = () => {
        setTimeout(() =>{
            this.setState({
                player: p.p1,
                x:2,
                y:1
            })
        }, 1000)
    };
};