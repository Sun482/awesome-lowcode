// @ts-nocheck
import './core/polyfill';
import '@@/core/devScripts';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/apple/Projects/awesome-lowcode/node_modules/umi/node_modules/@umijs/runtime';
import { renderClient } from '/Users/apple/Projects/awesome-lowcode/node_modules/@umijs/renderer-react';
import { getRoutes } from './core/routes';



(() => {
  // Runtime block add component
  window.GUmiUIFlag = require('/Users/apple/Projects/awesome-lowcode/node_modules/@umijs/plugin-ui-blocks/lib/sdk/flagBabelPlugin/GUmiUIFlag.js').default;

  // Enable/Disable block add edit mode
  window.addEventListener(
    'message',
    event => {
      try {
        const { action, data } = JSON.parse(event.data);
        switch (action) {
          case 'umi.ui.checkValidEditSection':
            const haveValid = !!document.querySelectorAll('div.g_umiuiBlockAddEditMode').length;
            const frame = document.getElementById('umi-ui-bubble');
            if (frame && frame.contentWindow) {
              frame.contentWindow.postMessage(
                JSON.stringify({
                  action: 'umi.ui.checkValidEditSection.success',
                  payload: {
                    haveValid,
                  },
                }),
                '*',
              );
            }
          default:
            break;
        }
      } catch (e) {}
    },
    false,
  );
})();


const getClientRender = (args: { hot?: boolean; routes?: any[] } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        routes: args.routes || getRoutes(),
        plugin,
        history: createHistory(args.hot),
        isServer: process.env.__IS_SERVER,
        dynamicImport: true,
        rootElement: 'root',
      },
    });
    return renderClient(opts);
  },
  args,
});

const clientRender = getClientRender();
export default clientRender();


    window.g_umi = {
      version: '3.5.17',
    };
  

    (() => {
      try {
        const ua = window.navigator.userAgent;
        const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        if (isIE) return;

        // Umi UI Bubble
        require('/Users/apple/Projects/awesome-lowcode/node_modules/@umijs/preset-ui/lib/bubble').default({
          port: 3000,
          path: '/Users/apple/Projects/awesome-lowcode',
          currentProject: '',
          isBigfish: undefined,
        });
      } catch (e) {
        console.warn('Umi UI render error:', e);
      }
    })();
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    const ret = require('./core/routes');
    if (ret.then) {
      ret.then(({ getRoutes }) => {
        getClientRender({ hot: true, routes: getRoutes() })();
      });
    } else {
      getClientRender({ hot: true, routes: ret.getRoutes() })();
    }
  });
}
