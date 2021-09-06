// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/apple/Projects/awesome-lowcode/node_modules/.pnpm/registry.nlark.com+@umijs+runtime@3.5.17_react@16.14.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/Loading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/dsl",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dsl__index' */'@/pages/dsl/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/editor",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__editor__index' */'@/pages/editor/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/home",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__index' */'@/pages/home/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/tree",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__tree__index' */'@/pages/tree/index.tsx'), loading: LoadingComponent})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
