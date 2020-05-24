"""
Widget main class
"""

from ipywidgets import DOMWidget
from traitlets import (Unicode, List, Instance)
import pandas as pd
from IPython.core.display import display

from ._frontend import module_name, module_version

defaults = {
    'width': '100%',
    'height': '60vh',
    'data': '[]',  # json string
}

class SandDanceWidget(DOMWidget):
    """An SandDance widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('SandDanceView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('SandDanceModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('sanddance-jupyter').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('sanddance-jupyter').tag(sync=True)

    _view_module_version = Unicode('^0.0.1').tag(sync=True)
    _model_module_version = Unicode('^0.0.1').tag(sync=True)

    data = Unicode(defaults['data']).tag(sync=True)

    width = Unicode(defaults['width']).tag(sync=True)
    height = Unicode(defaults['height']).tag(sync=True)
    snapshots = List([]).tag(sync=True)

    def show(self, **kwargs):
        self.width = kwargs.get('width', defaults['width'])
        self.height = kwargs.get('height', defaults['height'])
        display(self)

    def load(self, df):
        self.load_dataframe(df)

    def load_dataframe(self, df):
        self.data = df.to_json(orient='records')

    def load_records(self, records):
        self.data = json.dumps(records)