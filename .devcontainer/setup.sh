#!/bin/bash
set -e

echo "🚀 Setting up development environment..."

# Source asdf
. $HOME/.asdf/asdf.sh

# Add asdf plugins
echo "📦 Adding asdf plugins..."
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git || true
asdf plugin add python https://github.com/asdf-community/asdf-python.git || true
asdf plugin add yq https://github.com/sudermanjr/asdf-yq.git || true

# Install latest versions of development tools
echo "🔄 Installing latest versions of development tools..."

# Install latest Node.js
echo "📥 Installing latest Node.js..."
LATEST_NODE=$(asdf latest nodejs)
asdf install nodejs $LATEST_NODE
asdf global nodejs $LATEST_NODE

# Install tools from .tool-versions if it exists (this will override globals if specified)
if [ -f "/workspace/.tool-versions" ]; then
    echo "📥 Installing tools from .tool-versions..."
    cd /workspace
    asdf install
else
    echo "ℹ️  No .tool-versions file found, using latest versions"
fi

# Install latest global npm packages
echo "📦 Installing latest global npm packages..."
if command -v npm &> /dev/null; then
    npm install -g typescript@latest yaml-language-server@latest
fi

# Install latest yq (YAML processor)
echo "📥 Installing latest yq (YAML processor)..."
LATEST_YQ=$(asdf latest yq)
asdf install yq $LATEST_YQ
asdf global yq $LATEST_YQ

# Install Python packages if Python is available
if command -v python &> /dev/null; then
    echo "🐍 Installing Python development tools..."
    pip install --upgrade pip
fi

echo "✅ Development environment setup complete!"
echo ""
echo "Available tools:"
asdf current || echo "No asdf tools installed yet"

