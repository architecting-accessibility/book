# Pa11y Dashboard cross-platform Docker setup

This package runs Pa11y Dashboard and MongoDB in Docker with the same
configuration on Windows, macOS, and Linux.

Requirements:
- Docker Desktop (Windows/macOS), or Docker Engine + Compose v2 (Linux)

Windows:
    powershell -ExecutionPolicy Bypass -File .\pa11y-docker.ps1

macOS/Linux:
    chmod +x ./pa11y-docker.sh
    ./pa11y-docker.sh

Dashboard:
    http://127.0.0.1:4000

Actions:
    setup   Build and start
    start   Start existing containers
    stop    Stop containers
    status  Show status
    logs    Follow Dashboard logs
    remove  Remove containers, retain MongoDB data
    reset   Remove containers and MongoDB data, rebuild clean

Examples:
    .\pa11y-docker.ps1 -Action status
    ./pa11y-docker.sh status

Security-oriented defaults:
- Dashboard bound only to 127.0.0.1
- MongoDB not exposed to the host
- Non-root application user
- No host filesystem bind mounts
- Docker-managed database volume
- Chromium sandbox retained
- Pa11y Dashboard pinned to 5.2.0
- MongoDB pinned to 8.0

For a web server running on the host, use:
    http://host.docker.internal:<port>

Note:
Docker reduces host exposure but is not a perfect security boundary. For
deliberately hostile or unknown targets, use an additional disposable VM.
