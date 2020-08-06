# sanddance-jupyter-widget

Custom Jupyter Widget with [SandDance](https://github.com/microsoft/SandDance)

<img src="https://user-images.githubusercontent.com/9415800/82153896-47367b00-98a5-11ea-80bb-aa42be2fc76d.gif" width="100%">

## Installation

You can install using `pip`:

```bash
pip install sanddance_jupyter
```

If you use jupyterlab:

```bash
jupyter labextension install @msrvida/sanddance-jupyter-widget
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension install --sys-prefix --symlink --overwrite --py sanddance_jupyter 
jupyter nbextension enable --py --sys-prefix sanddance_jupyter
```

Or you can install with `conda` instead of `pip`

```bash
conda install sanddance_jupyter
```

## Getting Started

See also [examples/introduction.ipynb](https://github.com/microsoft/SandDance/blob/master/python/jupyter-widget/examples/introduction.ipynb)

```python
import pandas as pd
from sanddance_jupyter import SandDanceWidget
widget = SandDanceWidget()
widget.show()

df = pd.DataFrame([
    {'x': 1, 'y': 1, 'text': 'first'},
    {'x': 2, 'y': 2, 'text': 'second'},
    {'x': 3, 'y': 3, 'text': 'third'},
])
widget.load(df)
```

Powered by [widget-ts-cookiecutter](https://github.com/jupyter-widgets/widget-ts-cookiecutter)
