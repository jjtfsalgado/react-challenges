import * as React from 'react';
import css from "./board.less";
import {IRouteParams, m, p} from "./game";
import {RouteComponentProps} from "react-router-dom";
import {cls} from "../../utils";

interface IContainerProps extends RouteComponentProps<IRouteParams>{
    player: p;
    onPlay: (x:number,y:number) => void;
    x:number;
    y:number;
}


export const Board = (props: IContainerProps) => {
    const {x, y} = props;
    return (
        <div className={css.board}>
            <div className={css.row}>
                <PlayBox {...props} x={0} y={0} selected={x===0 && y===0}/>
                <PlayBox {...props} className={css.vertical} x={1} y={0} selected={x===1 && y===0}/>
                <PlayBox {...props} x={2} y={0} selected={x===2 && y===0}/>
            </div>
            <div className={css.row}>
                <PlayBox {...props} className={css.horizontal} x={0} y={1} selected={x===0 && y===1}/>
                <PlayBox {...props} className={cls(css.vertical, css.horizontal)} x={1} y={1} selected={x===1 && y===1}/>
                <PlayBox {...props} className={css.horizontal} x={2} y={1} selected={x===2 && y===1}/>
            </div>
            <div className={css.row}>
                <PlayBox {...props} x={0} y={2} selected={x===0 && y===2}/>
                <PlayBox {...props} className={css.vertical} x={1} y={2} selected={x===1 && y===2}/>
                <PlayBox {...props} x={2} y={2} selected={x===2 && y===2}/>
            </div>
        </div>
    )
}


interface IPlayBoxProps extends RouteComponentProps<IRouteParams> {
    player: p;
    selected: boolean;
    onPlay: (x:number,y:number) => void;
    className?: string;
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
        const {player, selected, className} = this.props;

        if(selected){
            this.selected = true;
        }

        return <div className={cls(css.box, className)} onClick={this.onSelect}>
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