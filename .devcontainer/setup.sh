#!/bin/zsh
set -e

echo "🚀 Setting up development environment..."

# Install Oh My Zsh if not already installed
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    echo "📦 Installing Oh My Zsh..."
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    
    # Configure Oh My Zsh with basic settings
    echo "⚙️  Configuring Oh My Zsh..."
    
    # Backup original .zshrc if it exists
    if [ -f "$HOME/.zshrc" ]; then
        cp "$HOME/.zshrc" "$HOME/.zshrc.backup"
    fi
    
    # Set theme to robbyrussell (default)
    sed -i 's/ZSH_THEME=".*"/ZSH_THEME="robbyrussell"/' ~/.zshrc
    
    # Enable useful plugins (excluding asdf since we configure it manually)
    sed -i 's/plugins=(git)/plugins=(git docker kubectl rust python node npm)/' ~/.zshrc
    
    # Add custom aliases
    cat >> ~/.zshrc << 'EOF'

# Custom aliases
alias ll='ls -lah'
alias zshconfig='vim ~/.zshrc'
alias zshreload='source ~/.zshrc'

EOF
else
    echo "ℹ️  Oh My Zsh already installed"
fi

# Install asdf if not already installed
if [ ! -d "$HOME/.asdf" ]; then
    echo "📦 Installing asdf..."
    git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
fi

# Configure asdf in .zshrc if not already configured
if ! grep -q "asdf.sh" ~/.zshrc 2>/dev/null; then
    echo "⚙️  Configuring asdf in .zshrc..."
    echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.zshrc
    echo '. $HOME/.asdf/asdf.sh' >> ~/.zshrc
    echo 'fpath=(${ASDF_DIR}/completions $fpath)' >> ~/.zshrc
    echo 'autoload -Uz compinit && compinit' >> ~/.zshrc
fi

# Source asdf
. $HOME/.asdf/asdf.sh

# Add asdf plugins
echo "📦 Adding asdf plugins..."
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git || true
asdf plugin add yq https://github.com/sudermanjr/asdf-yq.git || true
# Install latest versions of development tools
echo "🔄 Installing latest versions of development tools..."

# Install latest Node.js
echo "📥 Installing latest Node.js..."
if [ -f "$HOME/.asdf/plugins/nodejs/bin/import-release-team-keyring" ]; then
    bash "$HOME/.asdf/plugins/nodejs/bin/import-release-team-keyring"
fi
LATEST_NODE=$(asdf latest nodejs)
asdf install nodejs $LATEST_NODE
asdf global nodejs $LATEST_NODE



# Install tools from .tool-versions if it exists (this will override globals if specified)
WORKSPACE_DIR="${WORKSPACE_DIR:-/workspace}"
if [ -f "$WORKSPACE_DIR/.tool-versions" ]; then
    echo "📥 Installing tools from .tool-versions..."
    cd "$WORKSPACE_DIR"
    asdf install
else
    echo "ℹ️  No .tool-versions file found, using latest versions"
fi

# Install latest global npm packages
echo "📦 Installing latest global npm packages..."
if command -v npm &> /dev/null; then
    npm install -g typescript@latest yaml-language-server@latest @openai/codex @anthropic-ai/claude-code 
fi

# Install latest yq (YAML processor)
echo "📥 Installing latest yq (YAML processor)..."
LATEST_YQ=$(asdf latest yq)
asdf install yq $LATEST_YQ
asdf global yq $LATEST_YQ




echo "✅ Development environment setup complete!"
echo ""
echo "Available tools:"
asdf current || echo "No asdf tools installed yet"


