# streamlit-sanddance

Streamlit component that allows you to do X

## Installation instructions

```sh
pip install streamlit-sanddance
```

## Usage instructions

```python
import streamlit as st

from streamlit_sanddance import sanddance

value = sanddance()

st.write(value)
```

## Dev Setup

* Ensure you have [Python 3.6+](https://www.python.org/downloads/).
* Create a new Python virtual environment for the Streamlit component:
```
$ cd streamlit
$ python3 -m venv venv  # create venv
$ . venv/bin/activate   # activate venv
$ pip install streamlit # install streamlit
```
* Initialize and run the component frontend:
```
$ cd streamlit/sanddance/frontend
$ npm install    # Install npm dependencies
$ npm run start  # Start the Webpack dev server
```
* From a separate terminal, run the Streamlit app:
```
$ cd streamlit
$ . venv/bin/activate  # activate the venv you created earlier
$ pip install -e . # install streamlit-sanddance as editable package
$ streamlit run sanddance/example.py  # run the example
```