import * as React from 'react';
import css from "./board.less";
import {m, p} from "./game";

interface IContainerProps {
    player: p;
    onPlay: (x:number,y:number) => void;
    x:number;
    y:number;
}

interface IContainerState {

}

export class BoardTwo extends React.PureComponent<IContainerProps,IContainerState>{

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

class PlayBox extends React.Component<{
    player: p;
    selected: boolean;
    onPlay: (x:number,y:number) => void;
    x: number;
    y: number;
},{}>{

    shouldComponentUpdate(nextProps: any){
        if(!nextProps.selected){
            return false;
        }
        return true;
    }

    render(){
        const {player, selected} = this.props;
        return <div className={css.box} onClick={player == p.p1 ? this.onSelect : null}>
            {selected && (player == p.p2 ? "X" : "O")}
        </div>
    }

    onSelect = () => {
        const {onPlay, x, y} = this.props;
        onPlay(x,y)
    };
}