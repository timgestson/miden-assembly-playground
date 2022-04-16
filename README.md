# Miden Assembly Playground

Playground for Stark-based VM [Miden's](https://github.com/maticnetwork/miden) assembly language

[Try it out on Github Pages!](https://timgestson.github.io/miden-assembly-playground/)

## Prerequisites

Install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

## Starting site

In the project directory, you can run:

`npm install && npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Test rust code:

`cd miden-wasm && wasm-pack test --node`

Build production release:

`npm run build`