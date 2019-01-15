// Is rendered on the server side

// Is used to change the initial server side rendered document markup
// Commonly used to implement server side rendering for css-in-js libraries 
// like styled-components, glamorous or emotion. styled-jsx is included with 
// Next.js by default.

// Pages in Next.js skip the definition of the surrounding document's markup. 
// For example, you never include <html>, <body>, etc. To override that default 
// behavior, you must create a file at ./pages/_document.js, where you can extend 
// the Document class:

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

class MoeraeDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {

    const { pageContext } = this.props;

    return (
      <html lang="zh-cn" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={pageContext ? pageContext.theme.palette.primary.main : null} />
          <style>{
            `
            body { 
              margin: 0 
            }
            input:-webkit-autofill, 
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active, 
            input:-internal-autofill-previewed, 
            input:-internal-autofill-selected, 
            textarea:-internal-autofill-previewed, 
            textarea:-internal-autofill-selected, 
            select:-internal-autofill-previewed, 
            select:-internal-autofill-selected {
              -webkit-transition-delay: 99999s;
              -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
            }
            `
          }</style>
          <link rel="stylesheet" href="/static/robot-webfont.css" />
          <link rel="stylesheet" href="/static/iconfont.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MoeraeDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext = null;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired
    };

    return WrappedComponent;
  });

  let css = null;
  // It might be undefined, e.g. after an error.
  if (pageContext) {
    css = pageContext.sheetsRegistry.toString();
  }

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: css }}
        />
        {flush() || null}
      </React.Fragment>
    )
  };
};

export default MoeraeDocument;

// The `ctx` object is equivalent to the one received in all `getInitialProps` 
// hooks, with one addition:

// `renderPage` (`Function`) a callback that executes the actual React rendering 
// logic (synchronously). It's useful to decorate this function in order to 
// support server-rendering wrappers like Aphrodite's `renderStatic`

// Note: React-components outside of `<Main />` will not be initialised by the browser. 
// Do not add application logic here. If you need shared components in all your pages 
// (like a menu or a toolbar), take a look at the `App` component instead.