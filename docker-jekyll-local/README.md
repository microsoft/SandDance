# Jekyll Local Development with Docker

This repository includes Docker setup for running Jekyll locally to preview the GitHub Pages site.

On Windows, start Docker Desktop with Linux containers enabled. These commands
use Docker Compose v2 or later (`docker compose`).

## Quick Start

### Start Jekyll
```bash
cd docker-jekyll-local
docker compose up --build
```

### View your site
Open http://localhost:4000/SandDance/ in your browser

### Stop Jekyll
Type ctrl-C in the terminal running `docker compose up`

## Other useful commands

### Rebuild after changes
```bash
cd docker-jekyll-local
docker compose build
```

Site files are bind-mounted from `docs`, so ordinary content edits do not require
an image rebuild. Rebuild after changing the Dockerfile, Gemfile, or lockfile.

### Troubleshooting

If the image build reports that Bundler cannot write `/srv/jekyll/Gemfile.lock`,
ensure the Dockerfile copies the docs with `--chown=jekyll:jekyll`. The image runs
Bundler as the `jekyll` user, so root-owned copied files are not writable.
Changing Windows file permissions is not necessary.

The base image uses Ruby 3.1. Keep the lockfile compatible with that runtime.
The image uses frozen Bundler installs so an incompatible lockfile fails during
the build instead of silently resolving different versions that disappear when
the host docs directory is mounted. To regenerate the lockfile using an existing
image, run this from `docker-jekyll-local`, then rebuild:

```bash
docker compose run --rm -e BUNDLE_FROZEN=false jekyll bundle install
docker compose up --build
```

## Files

- `docker-jekyll-local/Dockerfile` - Jekyll container setup for local development
- `docker-jekyll-local/docker-compose.yml` - Container orchestration for local development
- `docs/Gemfile` - Jekyll dependencies (same as GitHub Pages)
- `docs/_config.yml` - Jekyll configuration

The setup uses the same `github-pages` gem as GitHub Pages to ensure compatibility.
