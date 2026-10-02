<#
Cross-platform launcher for the Pa11y Docker environment.
Works with Windows PowerShell / PowerShell 7.
#>

[CmdletBinding()]
param(
    [ValidateSet("setup","start","stop","status","logs","reset","remove")]
    [string]$Action = "setup"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Compose = Join-Path $Root "compose.yaml"

function Check-Docker {
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        throw "Docker was not found. Install Docker Desktop or Docker Engine first."
    }

    & docker version *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker is installed but the Docker engine is not running."
    }

    & docker compose version *> $null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker Compose v2 is required."
    }
}

function Compose {
    param([Parameter(ValueFromRemainingArguments=$true)][string[]]$Args)
    & docker compose -f $Compose @Args
    if ($LASTEXITCODE -ne 0) {
        throw "docker compose failed with exit code $LASTEXITCODE."
    }
}

Check-Docker
Set-Location $Root

switch ($Action) {
    "setup" {
        Compose up -d --build
        Compose ps
        Write-Host ""
        Write-Host "Pa11y Dashboard: http://127.0.0.1:4000"
    }
    "start" {
        Compose up -d
        Compose ps
    }
    "stop" {
        Compose stop
    }
    "status" {
        Compose ps
    }
    "logs" {
        & docker compose -f $Compose logs --follow dashboard
    }
    "remove" {
        Compose down --remove-orphans
    }
    "reset" {
        Compose down --volumes --remove-orphans
        Compose up -d --build --force-recreate
        Compose ps
        Write-Host ""
        Write-Host "Pa11y Dashboard: http://127.0.0.1:4000"
    }
}
