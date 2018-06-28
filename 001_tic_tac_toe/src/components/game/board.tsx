import * as React from 'react';
import css from "./board.less";
import {mode, player} from "./game";

interface IContainerProps {
    player: player;
    mode: mode;
    onPlay: () => void;
}

interface IContainerState {

}

export class Board extends React.PureComponent<IContainerProps,IContainerState>{

    render() {
        const {player} = this.props;

        return <div className={css.board}>
            <div className={css.row}>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
            </div>
            <div className={css.row}>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
            </div>
            <div className={css.row}>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
                <PlayBox player={player} onPlay={this.onPlay}/>
            </div>
        </div>
    }

    onPlay = () => this.props.onPlay();
}

class PlayBox extends React.PureComponent<{
    player: player
    onPlay: () => void;
},{
    value: player;
}>{
    render(){
        return <div className={css.box} onClick={this.onSelect}>
            {this.state && (this.state.value == player.p1? "X" : "O")}
        </div>
    }

    onSelect = () => {
        const {player, onPlay} = this.props;

        if(this.state){return};

        this.setState({
            value: player
        }, () => onPlay())
    };
}