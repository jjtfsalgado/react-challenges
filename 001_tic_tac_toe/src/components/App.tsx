import * as React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Game} from "./game";
import {Menu} from "./menu";

export const App = () => <Router>
    <div>
    <Route exact path="/" component={Menu}/>
    <Route path="/game" component={Game}/>
    </div>
</Router>;
