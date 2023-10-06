import streamlit as st
from sanddance import sanddance
import pandas as pd

# Create a dictionary with some data
data = {'name': ['Alice', 'Bob', 'Charlie', 'David'],
        'age': [25, 32, 18, 47],
        'city': ['New York', 'Paris', 'London', 'San Francisco']}

# Create a DataFrame from the dictionary
df = pd.DataFrame(data)

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run sanddance/example.py`

st.subheader("SandDance component from Pandas DataFrame")

# Create an instance of our SandDance component with a `df` arg
sanddance(df=df)
