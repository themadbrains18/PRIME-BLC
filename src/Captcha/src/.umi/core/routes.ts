// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/Internal/slidercaptcha/slider-captcha-react/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('D:/Internal/slidercaptcha/slider-captcha-react/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('D:/Internal/slidercaptcha/slider-captcha-react/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/captcha",
        "component": require('D:/Internal/slidercaptcha/slider-captcha-react/src/captcha/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/captcha/index.md",
          "updatedTime": 1640941067000,
          "componentName": "captcha",
          "slugs": [
            {
              "depth": 2,
              "value": "Captcha参考",
              "heading": "captcha参考"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "Captcha参考",
          "hasPreviewer": true,
          "group": {
            "path": "/captcha",
            "title": "Captcha"
          }
        },
        "title": "Captcha参考 - slider-captcha-react"
      },
      {
        "path": "/",
        "component": require('D:/Internal/slidercaptcha/slider-captcha-react/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1640937068000,
          "slugs": [
            {
              "depth": 2,
              "value": "quick start",
              "heading": "quick-start"
            }
          ],
          "title": "quick start"
        },
        "title": "quick start - slider-captcha-react"
      }
    ],
    "title": "slider-captcha-react",
    "component": (props) => props.children
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
