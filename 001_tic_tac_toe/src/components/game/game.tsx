import * as React from 'react';
import {Board} from "./board";
import {Header} from "./header";
import css from "./game.less";
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
    winner: p | 'draw';
    mode: m;
}


interface IAppProps extends RouteComponentProps<IRouteParams>{

}

interface IAppState{
    player: p;
    x:number;
    y:number;
}

const winningComb = [['00','01','02'],['10', '11','12'],['20','21','22'], ['00','10','20'], ['01', '11','21'], ['02','12','22'], ['00','11','22'], ['20','11','02']];

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
        const isScores = location.pathname.includes("scores");

        return <div className={css.game}>
            <Header player={player} isScores={isScores}/>
            <Route exact path={ROUTES.game} render={(props) => <Board {...props} x={x} y={y} player={player} onPlay={this.onPlay}/>}/>
            <Route exact path={ROUTES.scores} render={(props) => <Scores {...props} player={player} />}/>
        </div>
    }

    onPlay = (xx:number,yy:number) => {
        const {player} = this.state;
        const {match} = this.props;
        const mode = match.params.mode;
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;
        let x = xx;
        let y = yy;

        combPlayer.push(x.toString() + y.toString());

        if(this.analyzePlay(mode, player)){
            return
        }

        this.setState({
            x,
            y,
            player: player == p.p1 ? p.p2 : p.p1
        }, () => {
            if(mode === m.one && player == p.p1){
                this.onComputerPlay()
            }
        });
    };

    analyzePlay = (mode, player) => {
        const {history, match} = this.props;
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;
        let stop;

        if((this.combinationsP2.length + this.combinationsP1.length) === 9){
            this.combinationsP1 = [];
            this.combinationsP2 = [];
            history.push(`/game/${match.params.mode}/scores/draw`)
            stop = true;
        }else{
            //check if there was any winner play
            for(const comb of winningComb){
                if(comb.every(elem => combPlayer.includes(elem))){
                    const score = localStorage.getItem(player.toString());
                    this.combinationsP1 = [];
                    this.combinationsP2 = [];
                    localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                    history.push(`/game/${mode}/scores/${player}`);
                    stop = true;
                    break;
                };
            };
        }

        if(stop){
            this.setState({
                player: player == p.p1 ? p.p2 : p.p1,
                x: null,
                y: null
            }, () => {
                if(mode === m.one && player == p.p1){
                    this.onComputerPlay()
                }
            });
        }

        return stop;
    };

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onComputerPlay = () => {
        let x: number = null;
        let y: number = null;
        const {player} = this.state;
        const {match} = this.props;
        const mode = match.params.mode;


        if(this.combinationsP1.length !== 0 && this.combinationsP2.length !== 0){
            for(const comb of winningComb) {
                const combFilter = comb.filter(i => this.combinationsP1.includes(i));
                const combWin = comb.filter(i => this.combinationsP2.includes(i));
                const remaining = comb.find(i => !this.combinationsP1.includes(i) && !this.combinationsP2.includes(i));

                if(combWin.length == 2 && remaining) {
                    x = +remaining[0];
                    y = +remaining[1];
                    break;
                } else if(combFilter.length == 2 && remaining){
                    x = +remaining[0];
                    y = +remaining[1];
                }else if(combWin.length == 1 && combFilter.length === 0 && remaining && !x && !y){
                    x = +remaining[0];
                    y = +remaining[1];
                }else if(remaining && !x && !y){
                    x = +remaining[0];
                    y = +remaining[1];
                }
            };
        }else{
            const randN = this.getRandomInt(0, 7);
            const randPlay = winningComb[randN][this.getRandomInt(0,2)];
            x = +randPlay[0];
            y = +randPlay[1];
        }

        this.combinationsP2.push(x.toString() + y.toString());
        
        if(this.analyzePlay(mode, player)){
            return

        };
        setTimeout(() => this.setState({x, y, player: p.p1}), 500);
    };
};