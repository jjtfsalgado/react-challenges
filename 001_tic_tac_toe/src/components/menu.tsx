import * as React from 'react';
import {Link} from "react-router-dom";

export class Menu extends React.Component<{},{}>{
    render(){
        return <div>
            Menu
            <Link to="/game">About</Link>
        </div>
    }
}