def test_nbextension_path():
    # Check that magic function can be imported from package root:
    from sanddance import _jupyter_nbextension_paths
    # Ensure that it can be called without incident:
    path = _jupyter_nbextension_paths()
    # Some sanity checks:
    assert len(path) == 1
    assert isinstance(path[0], dict)
