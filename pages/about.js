import { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown'
import { Divider } from 'semantic-ui-react'

import Layout from '../components/ui/Layout.js';
import Responsive from '../hoc/ui/Responsive.js';
import Status from '../components/ui/Status.js';

import StateManager from '../hoc/state/StateManager.js'

import * as actions from '../store/actions/pages/index.js';

import config from '../config/pages/about.js'


class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aboutData: null
        };
    }

    // Next lifecycle

    static getInitialProps(context) {
        const url = config.GITHUB_README_URL;

        // TODO handle case with github not accessible ==> call to API endpoint /about ==> returns JSON
        // const url = 'http://localhost:3000/api/files/README';
        
        const dataFromServer = context.query && context.query.data;

        if (!dataFromServer) {
            // return About.fetchAboutData(url)
            //     .then((data) => {
            //         return { 
            //             aboutData: data, 
            //             from: 'LOADED FROM Next getInitialProps (fetch github)'
            //         };
            //     })
            //     .catch(err => {
            //         console.error(err);
            //         return Promise.reject({
            //             error: err,
            //             from: 'CATCH FROM About.fetchAboutData in  getInitialProps'
            //         });
            //     });

            // Will fetch after in componentDidMount
            return true;
        }

        return Promise.resolve({
            aboutData: dataFromServer, 
            from: 'LOADED FROM SERVER (SSR - server routing)'
        });
    }

    // React lifecycle

    shouldComponentUpdate(props) {
        return true;
    }

    componentDidMount() {
        const redux = true;

        if (!this.props.aboutData && !this.state.loading && !redux) {
            const url = config.GITHUB_README_URL;

            setTimeout(() => {
                this.setState({loading: true})
                }, 0);

            About.fetchAboutData(url)
                .then((data) => {
                    setTimeout(() => {
                        this.setState({
                            aboutData: data,
                            from: 'LOADED FROM React componentDidMount (fetch github)'
                        });
                    }, 2000);
                })
                .catch(err => {
                    console.error(err);
                    return Promise.reject({
                        error: err,
                        from: 'CATCH FROM About.fetchAboutData in componentDidMount'
                    });
                });
        }

        if (redux) {
            this.props.onDataLoading('SHALOM');
        }
    }

    // Functions

    static fetchAboutData(AboutUrl) {
        const url = AboutUrl ? AboutUrl : config.GITHUB_README_URL;

        return fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((data) => {
                return data
            })
            .catch((err) => err);
    }

    static prepareStatus(state, props) {
        if (props.from) {
            return {
                loading: false,
                statusTitle: props.from,
                statusContent: 'Received from Props'
            };
        }
        else if (state.from) {
            return {
                loading: false,
                statusTitle: state.from,
                statusContent: 'Received from State'
                
            };
        }
        else if (state.loading) {
            return {
                loading: true,
                statusTitle: 'FETCHING FROM GITHUB',
                statusContent: 'We are fetching that content for you.'
            };
            
        }
        else {
            return {
                loading: false,
                statusTitle: 'NOT LOADED',
                statusContent: 'Neither from Props nor from State'
            };
        }
    }

    // Render

    render() {
        const sourceMD = this.props.aboutData ? 
                            this.props.aboutData :
                            (this.state.aboutData ? this.state.aboutData : '')

        const {loading, statusTitle, statusContent} = About.prepareStatus(this.state, this.props);
            
        return (
            <Layout> 
                <Responsive>
                    <div className="markdown zp">
                        <Status loading={loading} title={statusTitle} content={statusContent} />

                        <Divider
                            as='h4'
                            className='header'
                            horizontal
                            style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
                            About - <a href="https://github.com/ariel-zplinux/zp-boilerplate/"> Github </a> Readme
                        </Divider>

                        <h1> DATA received from store: {this.props.data}</h1>
                        <Markdown source={sourceMD} />
                    </div>
                    <style jsx global>{`
                        .markdown {
                            font-family: 'Arial';
                            padding: 15px
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

                        div.zp {
                            margin: 0 auto;
                        }
                    `}</style>

                </Responsive>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.page.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDataLoading: (data) => dispatch(actions.loadingAboutPageData(data))
    };
};

export default StateManager(connect(mapStateToProps, mapDispatchToProps)(About));