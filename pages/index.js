import { Component } from 'react';
import io from 'socket.io-client';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hello: null
        }
    }

    static getInitialProps(context) {
        console.log(context);

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const props = {
                    appName: 'Zp React'
                };

                resolve(props);
            }, 0);
        });

        return promise;
    }


    componentDidMount() {
        this.socket = io();

        this.socket.on('now', (data) => {
            this.setState({
                hello: data.message
            })
        });
    }

    render() {
        const hello = this.state.hello ? this.state.hello : "LOADING FROM WEBSOCKET";

        return (
            <div>
                Welcome to { this.props.appName }
                <h2> { hello } </h2>
            </div>
        );
    }
}

export default Index;