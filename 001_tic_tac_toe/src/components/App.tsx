import * as React from 'react';
import style from "./App.less";
import {Test} from "./test";

interface AppProps {
    message: string,
};
export default function({ message }: AppProps ) {
    return <div className={style.header}>
        Hello {message}
        <Test/>
        </div>;
};