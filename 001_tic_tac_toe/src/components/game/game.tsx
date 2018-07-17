import * as React from 'react';
import {BoardTwo} from "./board_two";
import {Header} from "./header";
import css from "../app.less";
import {Route, RouteComponentProps} from "react-router-dom";
import {Scores} from "../scores/scores";
import {ROUTES} from "../../globals";
import {BoardOne} from "./board_one";

export enum mode {
    one,
    two
}

export enum p {
    p1,
    p2
}

interface RouteParams {
}


interface IAppProps extends RouteComponentProps<RouteParams>{

}

interface IAppState{
    mode: mode;
    player: p;
}

const winningCombinations = [['00','01','02'],['10', '11','12'],['20','21','22'], ['00','10','20'], ['01', '11','21'], ['02','12','22'], ['00','11','22'], ['20','11','02']];

export class Game extends React.PureComponent<IAppProps,IAppState>{
    constructor(props: IAppProps){
        super(props);

        this.state = {
            player: p.p1,
            mode: mode.one
        };

        this.combinationsP1 = [];
        this.combinationsP2 = [];
    }

    combinationsP1:Array<string>;
    combinationsP2:Array<string>;

    render(){
        const {player} = this.state;
        const {location} = this.props;
        const isScores = location.pathname.startsWith("/game/scores/");

        return <div className={css.app}>
            <Header player={player} mode={this.state.mode} isScores={isScores}/>
            <Route path={ROUTES.modeOne} render={(props) => <BoardOne {...props} player={player} onPlay={this.onPlay}/>}/>
            <Route path={ROUTES.modeTwo} render={(props) => <BoardTwo {...props} player={player} onPlay={this.onPlayTwo}/>}/>
            <Route path={ROUTES.scores} render={(props) => <Scores {...props} player={player} mode={this.state.mode} />}/>
        </div>
    }

    onPlay = (xx:number,yy:number) => {
        const {player} = this.state;
        const x = xx.toString();
        const y = yy.toString();
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;

        combPlayer.push(x + y);

        for(const comb of winningCombinations){
            if(comb.every(elem => combPlayer.includes(elem))){
                const score = localStorage.getItem(player.toString());
                this.combinationsP1 = [];
                this.combinationsP2 = [];

                localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                this.props.history.push(`/game/scores/${player}`);
            };
        };
        this.setState({player: player == p.p1 ? p.p2 : p.p1})
    };

    onPlayTwo = (xx:number,yy:number) => {
        const {player} = this.state;
        const x = xx.toString();
        const y = yy.toString();
        const combPlayer = player == p.p1 ? this.combinationsP1 : this.combinationsP2;

        combPlayer.push(x + y);

        for(const comb of winningCombinations){
            if(comb.every(elem => combPlayer.includes(elem))){
                const score = localStorage.getItem(player.toString());
                this.combinationsP1 = [];
                this.combinationsP2 = [];

                localStorage.setItem(player.toString(), score ? (+score + 1).toString() : "1");
                this.props.history.push(`/game/scores/${player}`);
            };
        };
        this.setState({player: player == p.p1 ? p.p2 : p.p1}, () => player == p.p1 && this.onComputerPlay())
    };

    onComputerPlay = () => {
        alert("computer should play now")
    };
};