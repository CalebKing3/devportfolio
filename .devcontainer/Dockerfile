FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl \
    wget \
    git \
    zsh

# Install global node packages
RUN npm install -g npm@latest typescript@latest vite@latest serve@latest

# Set up shell
RUN chsh -s $(which zsh) $(whoami)

# Clean up
RUN apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*