#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${HOME:-}" ]]; then
  echo "HOME is not set. Aborting." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BASHRC="${HOME}/.bashrc"
MARKER_START="# --- sme-business-health-dashboard (setup:shell) ---"
MARKER_END="# --- end sme-business-health-dashboard ---"

skip_distro() {
  local id="${1:-unknown}"
  echo "Skipping shell setup on ${id} (only Ubuntu/Debian are modified)."
  exit 0
}

is_debian_family() {
  if [[ ! -f /etc/os-release ]]; then
    return 1
  fi
  # shellcheck source=/dev/null
  source /etc/os-release
  case "${ID:-}" in
    ubuntu | debian) return 0 ;;
    fedora) skip_distro "fedora" ;;
    *) skip_distro "${ID:-unknown}" ;;
  esac
}

append_dotenv_block() {
  if grep -q 'dotenv_if_exists()' "$BASHRC" 2>/dev/null; then
    echo "dotenv_if_exists already present in ~/.bashrc"
    return 0
  fi

  cat >>"$BASHRC" <<'EOF'

dotenv_if_exists() {
    local file=${1:-.env}
    if [ -f "$file" ]; then
        # Load variables while ignoring comments
        export $(grep -v '^#' "$file" | xargs)
        echo "Loaded $file"
    fi
}
EOF
  echo "Added dotenv_if_exists to ~/.bashrc"
}

append_direnv_hook() {
  if grep -q 'direnv hook bash' "$BASHRC" 2>/dev/null; then
    echo "direnv hook already present in ~/.bashrc"
    return 0
  fi

  cat >>"$BASHRC" <<'EOF'

eval "$(direnv hook bash)"
EOF
  echo "Added direnv hook to ~/.bashrc"
}

ensure_bashrc_blocks() {
  local needs_start=false

  if [[ ! -f "$BASHRC" ]]; then
    touch "$BASHRC"
    echo "Created ~/.bashrc"
  fi

  if ! grep -qF "$MARKER_START" "$BASHRC" 2>/dev/null; then
    needs_start=true
    {
      echo ""
      echo "$MARKER_START"
    } >>"$BASHRC"
  fi

  append_dotenv_block
  append_direnv_hook

  if [[ "$needs_start" == true ]] || ! grep -qF "$MARKER_END" "$BASHRC" 2>/dev/null; then
    echo "$MARKER_END" >>"$BASHRC"
  fi
}

activate_shell() {
  set +u
  # shellcheck source=/dev/null
  source "$BASHRC" || true
  set -u

  if command -v direnv >/dev/null 2>&1; then
    eval "$(direnv hook bash)"
  fi
}

run_direnv_allow() {
  if ! command -v direnv >/dev/null 2>&1; then
    echo "Warning: direnv is not installed. Install it (e.g. apt install direnv), then re-run: npm run setup" >&2
    return 0
  fi

  (cd "$REPO_ROOT" && direnv allow)
  echo "Ran direnv allow in ${REPO_ROOT}"
}

main() {
  if ! is_debian_family; then
    skip_distro "unknown"
  fi

  ensure_bashrc_blocks
  activate_shell
  run_direnv_allow

  echo ""
  echo "Shell setup complete. In your terminal, run: source ~/.bashrc"
}

main "$@"
