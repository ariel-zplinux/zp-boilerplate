import { Component } from 'react';
import Markdown from 'react-markdown'

import Layout from '../components/Layout.js';

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
                <div className="markdown zp"> 
                    <p className="zp"> { hello } </p>
    
                    <hr className="zp" />
                
                    <Markdown source={ sourceMD } />
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
                `}</style>
            </Layout>
        );
    }
}

export default About;
