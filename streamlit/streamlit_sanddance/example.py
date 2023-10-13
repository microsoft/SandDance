# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

import streamlit as st
from streamlit_sanddance import sanddance
import pandas as pd
from streamlit_sanddance.types_explorer import SandDanceEvent

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

# Create an instance of our SandDance component
sdEvent: SandDanceEvent = sanddance(df=df, explorerProps={"initialSidebarClosed": True}, insight={"chart": "treemap", "columns": {"color": "age"}, "scheme": "redyellowgreen"})

#if sdEvent is not None and contains a cubeClick >= 0, display the data row
if sdEvent is not None and 'cubeClick' in sdEvent and sdEvent['cubeClick'] is not None and sdEvent['cubeClick'] >= 0:
        st.write(df.iloc[sdEvent['cubeClick']])
else:
        st.write("No cubeClick event")
