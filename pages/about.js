import { Component } from 'react';
import Markdown from 'react-markdown'

import Layout from '../components/Layout.js';

class About extends Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps(context) {
        return Promise.resolve(context.query);
    }

    render() {
        return (
            <Layout> 
                <p> About page (README.md) </p>
                <div className="markdown"> 
                    <Markdown source={this.props.data} />
                </div>
                <style jsx global>{`
                    .markdown {
                    font-family: 'Arial';
                    }

                    .markdown a {
                    text-decoration: none;
                    color: green;
                    }

                    .markdown a:hover {
                    opacity: 0.6;
                    }

                    .markdown h3 {
                    margin: 0;
                    padding: 0;
                    text-transform: uppercase;
                    }
                `}</style>
            </Layout>
        );
    }
}

export default About;