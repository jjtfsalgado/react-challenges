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

const strategyComb = [['00','20','22'],['00','02','22'],['00','11','20'],['00','11','20'],['00','11','02'],['20','11','22'],['02','11','22']];
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

        return <div className={css.app}>
            <Header player={player} isScores={isScores}/>
            <Route exact path={ROUTES.game} render={(props) => <Board {...props} x={x} y={y} player={player} onPlay={this.onPlay}/>}/>
            <Route exact path={ROUTES.scores} render={(props) => <Scores {...props} player={player} />}/>
        </div>
    }

    onPlay = (xx:number,yy:number) => {
        const {player} = this.state;
        const {match, history} = this.props;
        const mode = match.params.mode;
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;
        let x = xx;
        let y = yy;

        combPlayer.push(x.toString() + y.toString());

        //check if there was any winner play
        for(const comb of winningComb){
            if(comb.every(elem => combPlayer.includes(elem))){
                const score = localStorage.getItem(player.toString());
                this.combinationsP1 = [];
                this.combinationsP2 = [];
                x = null;
                y = null;
                localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                history.push(`/game/${mode}/scores/${player}`);
                break;
            };
        };

        this.setState({
            player: player == p.p1 ? p.p2 : p.p1,
            x,
            y
        }, () => {
            if(mode === m.one && player == p.p1){
                this.onComputerPlay()
            }
        });
    };

    onComputerPlay = () => {
        let x: number = null;
        let y: number = null;
        const {player} = this.state;
        const {match, history} = this.props;

        for(const comb of winningComb) {
            const combFilter = comb.filter(i => this.combinationsP1.includes(i));
            const combWin = comb.filter(i => this.combinationsP2.includes(i));

            if(combFilter.length == 2){
                const remaining = comb.find(i => !this.combinationsP1.includes(i) && !this.combinationsP2.includes(i));
                if (remaining){
                    x = +remaining[0];
                    y = +remaining[1];
                }
            } else if(combWin.length == 2) {
                const remaining = comb.find(i => !this.combinationsP1.includes(i) && !this.combinationsP2.includes(i));
                if (remaining) {
                    x = +remaining[0];
                    y = +remaining[1];

                    const score = localStorage.getItem(player.toString());
                    this.combinationsP1 = [];
                    this.combinationsP2 = [];
                    x = null;
                    y = null;
                    localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                    history.push(`/game/${match.params.mode}/scores/${player}`);
                    break;
                }
            }
        };

        if(!x && !y){
            for(const comb of strategyComb) {
                const combClear = comb.some(i => !this.combinationsP1.includes(i));

                if(combClear){
                    const remaining = comb.find(i => !this.combinationsP2.includes(i) && !this.combinationsP1.includes(i));
                    if (remaining){
                        x = +remaining[0];
                        y = +remaining[1];
                    }
                }
            };
        }

        if (!x && !y){
            const combs = winningComb.join(",").split(",").filter((item, pos, self) => self.indexOf(item) == pos);
            const remaining = combs.find(i => !this.combinationsP2.includes(i) && !this.combinationsP1.includes(i));
            if (remaining){
                x = +remaining[0];
                y = +remaining[1];
            }
        }

        this.combinationsP2.push(x.toString() + y.toString());

        if(this.combinationsP2.length + this.combinationsP1.length == 9){
            //go to tie
        }

        setTimeout(() => this.setState({player: p.p1,x,y}), 500);
    };
};