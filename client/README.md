# moerae-client

> Moerae Client-Side App

- To run the script below for debug with vscode at `nodemon`.

```bash
$ npm i -g nodemon
```

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "nodemon",
      "cwd": "${workspaceFolder}/client",
      "program": "${workspaceFolder}/client/server/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true,
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
