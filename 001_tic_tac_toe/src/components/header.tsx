import * as React from 'react';
import css from "./header.less";
import {mode, player} from "./game";

interface IHeaderProps {
    player: player;
    mode:mode;
}

export class Header extends React.Component<IHeaderProps,{}>{
    render(){
        return <div className={css.header}>
            <ScoreScreen {...this.props} type={player.p1}/>
            <Controls/>
            <ScoreScreen {...this.props} type={player.p2}/>
        </div>
    }
}

const ScoreScreen = (props: Partial<IHeaderProps> & { type: player }) => {
    return <div>
        {props.player == props.type && (props.type == 0 ? "Player 1" : "Player 2")}
        <div>
            0
        </div>
    </div>
};

class Controls extends React.Component<{}, {}> {
    render() {
        return <div>
            <button onClick={this.navToMenu}>
                Menu
            </button>
        </div>
    }

    navToMenu = () => {

    }
}