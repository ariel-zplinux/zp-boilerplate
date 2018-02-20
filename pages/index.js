import { Component } from 'react';
import io from 'socket.io-client';

import Layout from '../components/Layout.js';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hello: null
        }
    }

    // Next lifecycle

    static getInitialProps(context) {
        return Promise.resolve({appName: 'Zp Boilerplate'});
    }

    // React lifecycle

    componentDidMount() {
        this.socket = io();

        this.socket.on('now', (data) => {
            this.setState({
                hello: data.message
            })
        });
    }

    // Render
    
    render() {
        const hello = this.state.hello ? this.state.hello : "== LOADING FROM WEBSOCKET ==";

        return (
            <Layout>
                <div className="zp">
                    <p className="zp"> { hello } </p>
                    <hr className="zp" />
                    <p className="zp"> Welcome to { this.props.appName } </p>
                </div>
                <style jsx global>{`
                    hr.zp {
                        border-top: 1px solid #8c8b8b;
                        padding-top: 2px;
                        padding-bottom: 2px;
                        border-bottom: 1px solid #8c8b8b;
                    }

                    p.zp {
                        text-align: center;
                    }

                    div.zp {
                        max-width: 400px;
                        margin: 0 auto;
                    }
                `}
                </style>
            </Layout>
        );
    }
}

export default Index;
