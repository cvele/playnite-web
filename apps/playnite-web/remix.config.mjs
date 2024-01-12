import { withEsbuildOverride } from 'remix-esbuild-override'
import materialUiImportPlugin from './material-ui-import-esbuild-plugin.mjs'

withEsbuildOverride((option) => {
  option.plugins.unshift(materialUiImportPlugin())

  return option
})

/** @type {import('@remix-run/dev').AppConfig} */

const config = {
  appDirectory: 'src',
  assetsBuildDirectory: 'public/build',
  future: {
    /* any enabled future flags */
  },
  ignoredRouteFiles: ['**/.*'],
  publicPath: '/build/',
  serverBuildPath: 'build/index.js',
}

export default config
