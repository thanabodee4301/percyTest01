import Head from 'next/head'
import style from './layout.less';

const Layout = props => (
    <>
    <Head>
        <title>Firebase Authen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      
    </Head>
    <div className={style.layoutStyle}>
        {props.children}
    </div>
    </>
);

export default Layout;