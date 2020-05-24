import pytest

from ..sanddance import SandDanceWidget


def test_default():
    w = SandDanceWidget()
    assert w.height == '60vh'
