import * as React from 'react';
import css from "./board.less";
import {IRouteParams, m, p} from "./game";
import {RouteComponentProps} from "react-router-dom";

interface IContainerProps extends RouteComponentProps<IRouteParams>{
    player: p;
    onPlay: (x:number,y:number) => void;
    x:number;
    y:number;
}

interface IContainerState {

}

export class Board extends React.PureComponent<IContainerProps,IContainerState>{

    render() {
        const {x, y} = this.props;

        return <div className={css.board}>
            <div className={css.row}>
                <PlayBox {...this.props} x={0} y={0} selected={x===0 && y===0}/>
                <PlayBox {...this.props} x={1} y={0} selected={x===1 && y===0}/>
                <PlayBox {...this.props} x={2} y={0} selected={x===2 && y===0}/>
            </div>
            <div className={css.row}>
                <PlayBox {...this.props} x={0} y={1} selected={x===0 && y===1}/>
                <PlayBox {...this.props} x={1} y={1} selected={x===1 && y===1}/>
                <PlayBox {...this.props} x={2} y={1} selected={x===2 && y===1}/>
            </div>
            <div className={css.row}>
                <PlayBox {...this.props} x={0} y={2} selected={x===0 && y===2}/>
                <PlayBox {...this.props} x={1} y={2} selected={x===1 && y===2}/>
                <PlayBox {...this.props} x={2} y={2} selected={x===2 && y===2}/>
            </div>
        </div>
    }
}

interface IPlayBoxProps extends RouteComponentProps<IRouteParams> {
    player: p;
    selected: boolean;
    onPlay: (x:number,y:number) => void;
    x: number;
    y: number;
}

interface IPlayBoxState {

}

class PlayBox extends React.Component<IPlayBoxProps,IPlayBoxState>{

    selected: boolean;

    shouldComponentUpdate(nextProps: IPlayBoxProps, nextState: IPlayBoxState){
        if (nextProps.selected) {
            return true;
        }
        return false;
    }

    render(){
        const {player, selected} = this.props;

        if(selected){
            this.selected = true;
        }

        return <div className={css.box} onClick={this.onSelect}>
            {this.selected && (player == p.p2 ? "X" : "O")}
        </div>
    }

    onSelect = () => {
        const {onPlay, x, y, match, player} = this.props;

        if(this.selected || match.params.mode === m.one && player === p.p2){
            return false;
        }
        onPlay(x,y)
    };
}