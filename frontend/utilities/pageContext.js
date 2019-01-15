
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

import { SheetsRegistry } from 'jss';
import defaultTheme from './theme';

const theme = createMuiTheme(defaultTheme);

let pageContext = null;

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName({ productionPrefix: 'mo' })
  };
}

export function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }
  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}