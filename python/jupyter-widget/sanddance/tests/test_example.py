import pytest

from ..sanddance import Explorer


def test_default():
    w = Explorer()
    assert w.height == '60vh'
