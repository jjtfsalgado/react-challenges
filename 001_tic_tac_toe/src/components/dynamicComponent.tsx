import * as React from "react";


//this was just a test to try dynamic imports
class DynamicComponent extends React.Component<{
    route: string;
    props: any;
},{
    loading: boolean;
    component: any;
}>{
    constructor(props: any){
        super(props);

        this.state = {
            loading: true,
            component: null
        }
    }

    componentDidMount(){
        const {route} = this.props;

        import(`${route}`).then((mod) => {
            this.setState({
                loading: false,
                component: mod.Game
            })
        })
    }

    render(){
        const {loading, component: Component} = this.state;

        return <div>{loading ? "Loading..." : <Component {...this.props.props}/>}</div>
    }
}