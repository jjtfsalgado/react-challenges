import * as React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Menu} from "./menu/menu";
import css from "./app.less";
import {Game} from "./game/game";

export const App = () => <Router>
    <div className={css.app}>
        <Route exact path="/" component={Menu}/>
        <Route path="/game/:view?" component={Game}/>
    </div>
</Router>;
