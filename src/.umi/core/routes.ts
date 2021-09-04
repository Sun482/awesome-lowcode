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
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'/Users/apple/Projects/awesome-lowcode/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "exact": true,
        "path": "/",
        "name": "欢迎",
        "icon": "user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'@/pages/home'), loading: LoadingComponent}),
        "hideInMenu": true
      },
      {
        "exact": true,
        "path": "/home",
        "name": "欢迎",
        "icon": "user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'@/pages/home'), loading: LoadingComponent}),
        "hideInMenu": true
      },
      {
        "exact": true,
        "path": "/editor",
        "name": "编辑器",
        "icon": "edit",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__editor__index' */'@/pages/editor/index'), loading: LoadingComponent})
      },
      {
        "exact": true,
        "path": "/dls",
        "name": "DSL转换",
        "icon": "export",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dsl__index' */'@/pages/dsl/index'), loading: LoadingComponent})
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
