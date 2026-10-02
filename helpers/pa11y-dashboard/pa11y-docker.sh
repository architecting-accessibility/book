#!/usr/bin/env bash
set -euo pipefail

ACTION="${1:-setup}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE="$ROOT/compose.yaml"

check_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker was not found. Install Docker Desktop or Docker Engine first." >&2
    exit 1
  fi

  if ! docker version >/dev/null 2>&1; then
    echo "Docker is installed but the Docker engine is not running." >&2
    exit 1
  fi

  if ! docker compose version >/dev/null 2>&1; then
    echo "Docker Compose v2 is required." >&2
    exit 1
  fi
}

compose() {
  docker compose -f "$COMPOSE" "$@"
}

check_docker
cd "$ROOT"

case "$ACTION" in
  setup)
    compose up -d --build
    compose ps
    echo
    echo "Pa11y Dashboard: http://127.0.0.1:4000"
    ;;
  start)
    compose up -d
    compose ps
    ;;
  stop)
    compose stop
    ;;
  status)
    compose ps
    ;;
  logs)
    docker compose -f "$COMPOSE" logs --follow dashboard
    ;;
  remove)
    compose down --remove-orphans
    ;;
  reset)
    compose down --volumes --remove-orphans
    compose up -d --build --force-recreate
    compose ps
    echo
    echo "Pa11y Dashboard: http://127.0.0.1:4000"
    ;;
  *)
    echo "Usage: $0 {setup|start|stop|status|logs|remove|reset}" >&2
    exit 2
    ;;
esac
