FROM debian:bookworm-slim

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    gnupg \
    ca-certificates \
    procps \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev \
    vim \
    nano \
    sudo \
    jq \
    libxml2-utils \
    bash-completion \
    zsh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set zsh as default shell for root
RUN chsh -s /usr/bin/zsh root

# Set up root user with zsh
WORKDIR /root

# Set up zsh history persistence and workspace directory
RUN mkdir -p /root/.zsh_history_volume \
    && mkdir -p /workspace \
    && echo 'HISTFILE=/root/.zsh_history_volume/.zsh_history' >> /root/.zshrc \
    && echo 'HISTSIZE=10000' >> /root/.zshrc \
    && echo 'SAVEHIST=10000' >> /root/.zshrc

# Install asdf
ENV ASDF_DIR=/root/.asdf
RUN git clone https://github.com/asdf-vm/asdf.git /root/.asdf --branch v0.14.0 \
    && echo '. $HOME/.asdf/asdf.sh' >> /root/.zshrc \
    && echo 'fpath=(${ASDF_DIR}/completions $fpath)' >> /root/.zshrc \
    && echo 'autoload -Uz compinit && compinit' >> /root/.zshrc

# Set working directory
WORKDIR /workspace

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog
