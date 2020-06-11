def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension/static',
        'dest': 'sanddance_jupyter',
        'require': 'sanddance_jupyter/extension'
    }]
