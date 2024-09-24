# setup-otdr.ps1

# Function to check if a command exists
function Test-Command {
    param (
        [string]$Command
    )
    Get-Command $Command -ErrorAction SilentlyContinue | Select-Object -First 1
}

# Function to install a package via Winget
function Install-PackageIfMissing {
    param (
        [string]$PackageName,
        [string]$AppId = $null
    )
    if (-not (Test-Command $PackageName)) {
        Write-Host "Installing $PackageName..." -ForegroundColor Cyan
        if ($AppId) {
            winget install --id $AppId --exact --silent --accept-source-agreements --accept-package-agreements
        } else {
            winget install --name $PackageName --silent --accept-source-agreements --accept-package-agreements
        }
    } else {
        Write-Host "$PackageName is already installed." -ForegroundColor Green
    }
}

# Install Git using Winget
Install-PackageIfMissing -PackageName "Git.Git" -AppId "Git.Git"

# Install Docker Desktop using Winget
# Docker Desktop requires user agreement to the license, which Winget cannot automate fully.
# However, you can initiate the installation and prompt the user to complete it.
if (-not (Test-Command docker)) {
    Write-Host "Installing Docker Desktop..." -ForegroundColor Cyan
    winget install --id Docker.DockerDesktop -e --silent --accept-source-agreements --accept-package-agreements
    Write-Host "Docker Desktop installed. Please complete the installation manually if prompted." -ForegroundColor Yellow
    Write-Host "You may need to restart your computer after installation." -ForegroundColor Yellow
    Write-Host "After restarting, rerun this script to proceed with setup." -ForegroundColor Yellow
    exit
} else {
    Write-Host "Docker is already installed." -ForegroundColor Green
}

# Function to wait for Docker to be ready
function Wait-Docker {
    Write-Host "Waiting for Docker Desktop to initialize..." -ForegroundColor Cyan
    while (-not (docker info -ErrorAction SilentlyContinue)) {
        Start-Sleep -Seconds 5
        Write-Host "." -NoNewline
    }
    Write-Host "`nDocker Desktop is ready." -ForegroundColor Green
}

# Wait for Docker to be ready
Wait-Docker

# Clone the 'local' branch of the repository
$repoURL = "https://github.com/jardo5/OTDR-Results-Extract.git"
$branch = "local"
$clonePath = "C:\OTDR-Results-Extract"

if (Test-Path $clonePath) {
    Write-Host "Repository already cloned at $clonePath." -ForegroundColor Green
    Write-Host "Pulling the latest changes..." -ForegroundColor Cyan
    cd $clonePath
    git fetch origin
    git checkout $branch
    git pull origin $branch
} else {
    Write-Host "Cloning repository..." -ForegroundColor Cyan
    git clone --branch $branch $repoURL $clonePath
}

# Navigate to the project directory
cd $clonePath

# Check if docker-compose.yml exists
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "docker-compose.yml not found in the repository. Exiting." -ForegroundColor Red
    exit
}

# Build and run the Docker containers
Write-Host "Building and starting Docker containers..." -ForegroundColor Cyan
docker-compose up --build -d

Write-Host "Setup complete. The application should now be running." -ForegroundColor Green
Write-Host "Access the frontend at http://localhost:5300" -ForegroundColor Green
