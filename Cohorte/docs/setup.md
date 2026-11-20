# Instalación del entorno

Para la **clase 2** necesitas: **Git, Node.js 20+, GitHub CLI (`gh`), jq, Claude Code y un editor** (VS Code o Cursor).
Para la **clase 7** se suman **Docker Desktop, Terraform y k6**. Instálalos con calma antes del Laboratorio 2 (Vie 4 dic): Docker es la descarga más pesada.

Al terminar, corre el verificador desde la raíz del repositorio:

```bash
./scripts/verificar-entorno.sh      # macOS / Linux / Git Bash
.\scripts\verificar-entorno.ps1     # Windows PowerShell
```

---

## Windows

Abre **PowerShell** y ejecuta:

```powershell
winget install --id Git.Git -e              # Git y Git Bash (Claude Code y los hooks lo usan)
winget install --id OpenJS.NodeJS.LTS -e    # Node.js LTS
winget install --id GitHub.cli -e           # GitHub CLI
winget install --id jqlang.jq -e            # jq: los hooks del harness leen JSON con él
winget install --id Microsoft.VisualStudioCode -e   # editor (o Cursor)
irm https://claude.ai/install.ps1 | iex     # Claude Code
```

Cierra y vuelve a abrir la terminal para que tome los cambios del PATH.

**Si PowerShell no deja ejecutar los scripts** ("la ejecución de scripts está deshabilitada"), permítelos solo para tu usuario:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Si `claude` no se reconoce** después de instalarlo, agrega su carpeta al PATH y abre otra terminal:

```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$env:USERPROFILE\.local\bin", "User")
```

**Finales de línea:** el repositorio ya trae `.gitattributes` para que los `.sh` queden con LF. Si clonaste antes de tenerlo y los hooks fallan con `\r: command not found`, guarda o haz commit de tus cambios y ejecuta (descarta lo que no esté en un commit):

```bash
git rm --cached -r . && git reset --hard
```

## macOS

```bash
brew install git node gh jq
brew install --cask visual-studio-code
curl -fsSL https://claude.ai/install.sh | bash
```

## Linux (Debian / Ubuntu)

```bash
sudo apt update && sudo apt install -y git jq curl
# Node.js 20+ (vía nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install --lts
# GitHub CLI: https://github.com/cli/cli/blob/trunk/docs/install_linux.md
curl -fsSL https://claude.ai/install.sh | bash
```

---

## Configuración de una sola vez

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@correo.com"
git config --global init.defaultBranch main
gh auth login          # elige GitHub.com → HTTPS → login con el navegador
claude                 # la primera vez te pide iniciar sesión
```

En Claude Code elige **Claude.ai Subscription** si tienes plan Pro, Max, Team o Enterprise. Elige **Anthropic Console** solo si te dieron una API key y el uso se paga por consumo.

## Para la clase 7: Docker, Terraform y k6

**Windows**

```powershell
winget install --id Docker.DockerDesktop -e   # pide reiniciar y activar WSL 2
winget install --id Hashicorp.Terraform -e
winget install --id k6.k6 -e
```

**macOS**

```bash
brew install --cask docker
brew tap hashicorp/tap && brew install hashicorp/tap/terraform
brew install k6
```

**Linux:** sigue las guías oficiales de [Docker Engine](https://docs.docker.com/engine/install/), [Terraform](https://developer.hashicorp.com/terraform/install) y [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).

Comprueba que quedaron bien:

```bash
docker run --rm hello-world
terraform -version
k6 version
```

> Abre Docker Desktop al menos una vez antes de clase: el motor debe estar corriendo (ícono de la ballena quieto) para que `docker` y Terraform funcionen.

---

## Cuentas que se necesitan

| Clase | Servicio | Para qué |
|---|---|---|
| 2 | GitHub | Repositorio, ramas y PR |
| 2 | Claude (plan Pro o superior) | Claude Code |
| 6 | GitHub Actions (incluido en GitHub) | Revisión automática del PR |
| 7 | Vercel (gratis, con tu cuenta de GitHub) | Despliegue ligero con vista previa por rama |

Las claves van en `.env.local`, que **nunca** se versiona (está en `.gitignore`). En el repo solo se sube `.env.example` con los nombres de las variables, sin valores.
