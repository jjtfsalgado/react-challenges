import * as React from 'react';
import css from "./container.less";

enum mode {
    one,
    two
}

enum player {
    p1,
    p2
}

interface IContainerProps {
    playerStarting: player;
    mode: mode;
}

interface IContainerState {
    play: player;
}

export class Container extends React.PureComponent<IContainerProps,IContainerState>{
    constructor(props: IContainerProps){
        super(props);

        this.state = {
            play: player.p1
        } as IContainerState;
    }

    render() {
        const {play} = this.state;

        return <div className={css.container}>
            <div className={css.row}>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
            </div>
            <div className={css.row}>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
            </div>
            <div className={css.row}>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
                <PlayBox play={play} onPlay={this.onPlay}/>
            </div>
        </div>
    }

    onPlay = () => this.setState({play: this.state.play == player.p1 ? player.p2 : player.p1});
}

class PlayBox extends React.PureComponent<{
    play: player
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
        const {play, onPlay} = this.props;

        if(this.state){return};

        this.setState({
            value: play
        }, () => onPlay())
    };
}