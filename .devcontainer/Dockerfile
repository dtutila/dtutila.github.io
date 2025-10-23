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
    bash-completion \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up bash history persistence
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/root/.bash_history_volume/.bash_history" \
    && mkdir -p /root/.bash_history_volume \
    && echo "$SNIPPET" >> "/root/.bashrc"

# Install asdf
ENV ASDF_DIR=/root/.asdf
RUN git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0 \
    && echo '. $HOME/.asdf/asdf.sh' >> ~/.bashrc \
    && echo '. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc

# Set working directory
WORKDIR /workspace

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog
