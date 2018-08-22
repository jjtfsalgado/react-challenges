import * as React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Menu} from "./menu/menu";
import css from "./app.less";
import {ROUTES} from "../globals";
import {Game} from "./game/game";

export const App = () => <Router>
    <div className={css.app}>
        <Route exact path={ROUTES.menu} component={Menu}/>
        <Route path={ROUTES.game} component={Game}/>
    </div>
</Router>;


