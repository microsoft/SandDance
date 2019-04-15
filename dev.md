# SandDance development

The SandDance repo is a monorepo made up of several packages, managed by [Lerna](). SandDance is a component stack with the layer hierarchy below:

1. [Deck.gl]() - WebGL rendering and canvas control.
1. [Vega]() - chart layout.
1. [sanddance]() - unit visualization chart views and selecting / filtering interaction.
1. [sanddance-test-umd]() - test of sanddance in UMD deployment.
1. [sanddance-test-es6]() - test of sanddance in es6 deployment.
1. [sanddance-react]() - (optional) React wrapper for sanddance.
1. [sanddance-explorer]() - React-based data exploration component.
1. [sanddance-app]() - React-based sample application used on website.

## Install
1. Clone this repo
1. `npm install`
1. [Install Jekyll](https://jekyllrb.com/) to run the website locally.

## Build
1. `npm run build`

## Run
Depending on which component you'd like to see, you can run in various ways.

### Run website
1. `npm run deploy`
1. `cd docs`
1. `jekyll serve`
1. Visit http://127.0.0.1:4000/SandDance/

### Run basic tests
1. Visit http://127.0.0.1:4000/SandDance/tests

### Run sanddance-app with watchers
1. TODO
