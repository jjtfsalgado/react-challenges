import * as React from 'react';
import css from "./header.less";
import {mode, player} from "./app";

interface IHeaderProps {
    player: player;
    mode:mode;
}

export class Header extends React.Component<IHeaderProps,{}>{
    render(){
        return <div className={css.header}>
            <ScoreScreen {...this.props} position={"left"} />
            <Controls/>
            <ScoreScreen {...this.props} position={"right"} />
        </div>
    }
}

const ScoreScreen = (props: IHeaderProps & {position: 'left' | 'right'}) => <div>{props.player}</div>

class Controls extends React.Component<{},{}>{
    render(){
        return<div>
            Controls
        </div>
    }
}