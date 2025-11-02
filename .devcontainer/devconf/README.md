# Devcontainer Configuration Persistence

This directory contains subdirectories that are mounted into the devcontainer to persist tool configurations between container rebuilds.

## Directories


- **`claude/`** - Claude CLI/API configuration (`.claude`)
  - API keys and authentication
  - User preferences

- **`codex/`** - Codex configuration (`.codex`)
  - API keys and settings
  - Tool preferences

## Files

- **`.claude.json`** - Claude configuration file
  - Will be created automatically when Claude CLI is used
  - Contains API keys and preferences

## Security

All subdirectories are gitignored to prevent committing sensitive credentials. Only this README and `.gitkeep` files are tracked in version control.

## Usage

These directories and files are automatically mounted when the devcontainer starts:

- `.devcontainer/devconf/claude` → `/root/.claude`
- `.devcontainer/devconf/.claude.json` → `/root/.claude.json`
- `.devcontainer/devconf/codex` → `/root/.codex`
