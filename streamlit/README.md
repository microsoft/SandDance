# streamlit-sanddance

Streamlit component that allows you to view a SandDance visualization of a dataframe.

## Installation instructions

```sh
pip install streamlit-sanddance
```

## Usage instructions

```python
import streamlit as st

from streamlit_sanddance import sanddance

#sample random DataFrame
df = pd.DataFrame(
     np.random.randn(20, 3),
     columns=['a', 'b', 'c'])

#make sure to use a key to prevent refreshing after an event
sdEvent = sanddance(df, key='sd1')

#if sdEvent is not None and contains a cubeClick >= 0, display the data row
if sdEvent is not None and 'cubeClick' in sdEvent and sdEvent['cubeClick'] is not None and sdEvent['cubeClick'] >= 0:
        st.write(df.iloc[sdEvent['cubeClick']])
else:
        st.write("No cubeClick event")

```
The return value is a dictionary of visual interaction events such as selections. 

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