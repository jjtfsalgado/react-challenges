import * as React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Game} from "./game/game";
import {Menu} from "./menu/menu";
import css from "./app.less";

export const App = () => <Router>
    <div className={css.app}>
        <Route exact path="/" component={Menu}/>
        <Route path="/game" component={Game}/>
    </div>
</Router>;
