import * as React from 'react';
import css from "./board.less";
import {mode, p} from "./game";

interface IContainerProps {
    player: p;
    onPlay: (x:number,y:number) => void;
}

interface IContainerState {

}

export class BoardTwo extends React.PureComponent<IContainerProps,IContainerState>{

    render() {
        const {player, onPlay} = this.props;

        return <div className={css.board}>
            <div className={css.row}>
                <PlayBox player={player} onPlay={onPlay} x={0} y={0}/>
                <PlayBox player={player} onPlay={onPlay} x={1} y={0}/>
                <PlayBox player={player} onPlay={onPlay} x={2} y={0}/>
            </div>
            <div className={css.row}>
                <PlayBox player={player} onPlay={onPlay} x={0} y={1}/>
                <PlayBox player={player} onPlay={onPlay} x={1} y={1}/>
                <PlayBox player={player} onPlay={onPlay} x={2} y={1}/>
            </div>
            <div className={css.row}>
                <PlayBox player={player} onPlay={onPlay} x={0} y={2}/>
                <PlayBox player={player} onPlay={onPlay} x={1} y={2}/>
                <PlayBox player={player} onPlay={onPlay} x={2} y={2}/>
            </div>
        </div>
    }
}

class PlayBox extends React.PureComponent<{
    player: p
    onPlay: (x:number,y:number) => void;
    x: number;
    y: number;
},{
    value: p;
}>{
    render(){
        const {player} = this.props;
        return <div className={css.box} onClick={player == p.p1 ? this.onSelect : null}>
            {this.state && (this.state.value == p.p1? "X" : "O")}
        </div>
    }

    onSelect = () => {
        const {player, onPlay, x, y} = this.props;

        if(this.state){return};

        this.setState({
            value: player
        }, () => onPlay(x,y))
    };
}