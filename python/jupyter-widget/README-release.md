# Prerequisite
- pypi 
    - twine (included in `requirements-dev.txt`)
    - pipy account/password or [token](https://github.com/microsoft/SandDance/tree/master/packages)
- npm
    - npm account or token

# Release
- Makse sure install dev dependencies of python `pip install -r requirements-dev.txt`
- Make a release commit, where you remove the `, 'dev'` entry in `_version.py`.
- Update the version in `package.json`
- Update the version in `sanddance/_frontend.py`
- Relase the npm packages:
  ```bash
  npm login
  npm publish
  ```
- Bundle the python package: `python setup.py sdist bdist_wheel`
- Publish the package to PyPI:
  ```bash
  twine upload dist/sanddance*
  ```
- Tag the release commit (`git tag <python package version identifier>`)
- Update the version in `_version.py`, and put it back to dev (e.g. 0.1.0 -> 0.2.0.dev).
  Update the versions of the npm packages (without publishing).
- Commit the changes.
- `git push` and `git push --tags`.