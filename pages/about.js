import { Component } from 'react';
import Markdown from 'react-markdown'
import {
    Divider
  } from 'semantic-ui-react'

import Layout from '../components/ui/Layout.js';
import Responsive from '../hoc/ui/Responsive.js';




class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutData: null
        };
    }

    // Next lifecycle

    static getInitialProps(context) {
        const url = 'http://localhost:3000/api/files/README';
        // const url = 'http://NOT-HERE-TO-TRIGGER-FETCH-IN-COMPONENT-DID-UPDATE';

        const dataFromServer = context.query && context.query.data;

        if (!dataFromServer) {
            return About.fetchAboutData(url)
                .then((response) => {
                    const aboutData = response.data ? { 
                        aboutData: response.data, 
                        from: '== LOADED FROM Next getInitialProps (API call) =='
                    } : {
                        error: true
                    };

                    return aboutData;
                })
                .catch(err => {
                    console.error(err);
                    return Promise.reject({
                        error: err,
                        from: '== CATCH FROM About.fetchAboutData =='
                    });
                });
        }

        return Promise.resolve({
            aboutData: dataFromServer, 
            from: '== LOADED FROM SERVER (SSR - server routing) =='
        });
    }

    // React lifecycle

    shouldComponentUpdate(props) {
        return true;
    }

    componentDidMount() {
        if (!this.props.aboutData) {
            About.fetchAboutData('http://localhost:3000/api/files/README')
                .then((response) => {
                    this.setState({
                        aboutData: response.data,
                        from: '== LOADED FROM React componentDidMount (API CALL) =='
                    });
                })
                .catch(err => {
                    console.error(err);
                    return {err, from: '== ERROR =='};
                });
        }
    }

    // Functions

    static fetchAboutData(AboutUrl) {
        const url = AboutUrl ? AboutUrl : 'http://localhost:3000/api/files/README';

        return fetch(url)
            .then((response) => response.json())
            .then((json) => json.data)
            .catch((err) => err);
    }

    // Render

    render() {
        const sourceMD = this.props.aboutData ? 
                            this.props.aboutData :
                            (this.state.aboutData ? this.state.aboutData : "NOT FOUND")

        const hello = this.props.from ? 
            this.props.from :
            this.state.from ? this.state.from : '== NOT LOADED ==';
        return (
            <Layout> 
                <Responsive>
                    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' />

                    <div className="markdown zp">
                        <p className="zp"> {hello} </p>

                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
                            <a href="https://github.com/ariel-zplinux/zp-boilerplate/"> Github </a> Readme
                        </Divider>

                        <Markdown source={sourceMD} />
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

                        .markdown h3, h2, h1 {
                            margin: 15px 0;
                            padding: 0;
                        }

                        p.zp {
                            text-align: center;
                            padding-top: 5px;
                        }

                        div.zp {
                            max-width: 80%;
                            margin: 0 auto;
                        }
                    `}</style>

                </Responsive>
            </Layout>
        );
    }
}

export default About;
