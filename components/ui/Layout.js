import Head from 'next/head';

const Layout = (props) => (
  <div style={layoutStyle.layout}>
    <Head>
      <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <main style={layoutStyle.main}>
        {props.children}
    </main>
  </div>
)

const layoutStyle = {
  layout: {
    margin: 0,
    padding: 0,
  //   border: '1px solid #DDD'
  },
  main: {
    position: "fixed",
    height: "100%",
    width: "100%"
  }
}

export default Layout
