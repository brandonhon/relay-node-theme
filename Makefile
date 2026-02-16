.PHONY: help serve build clean test lint setup link

# Default target
help:
	@echo "Relay Node Theme - Development Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  setup     Create theme symlink in exampleSite"
	@echo "  serve     Run development server"
	@echo "  build     Build the example site"
	@echo "  test      Build and check for errors"
	@echo "  clean     Remove build artifacts"
	@echo "  lint      Check SCSS syntax (requires sass)"
	@echo ""

# Setup theme symlink for development
setup:
	@mkdir -p exampleSite/themes
	@if [ ! -L exampleSite/themes/relay-node ]; then \
		ln -s ../.. exampleSite/themes/relay-node; \
		echo "Symlink created: exampleSite/themes/relay-node"; \
	else \
		echo "Symlink already exists"; \
	fi

WSL_IP := $(shell hostname -I | awk '{print $$1}')

# Run development server
# Using output-dir outside the tree to avoid symlink loop triggering rebuild cycles
serve: setup
	@echo "Server will be available at http://$(WSL_IP):1111"
	cd exampleSite && zola serve --interface 0.0.0.0 --port 1111 --base-url http://$(WSL_IP) --output-dir /tmp/relay-node-public --force

# Build the site
build: setup
	cd exampleSite && zola build

# Test build and check links
test: setup
	cd exampleSite && zola build && zola check

# Clean build artifacts
clean:
	rm -rf exampleSite/public
	rm -rf exampleSite/.sass-cache
	rm -rf /tmp/relay-node-public
	@echo "Build artifacts cleaned"

# Lint SCSS files
lint:
	@if command -v sass >/dev/null 2>&1; then \
		sass --no-source-map sass/main.scss /dev/null && echo "SCSS syntax OK"; \
	else \
		echo "sass not installed, skipping lint"; \
	fi

# Watch for changes (alternative to serve)
watch: setup
	cd exampleSite && zola serve --interface 0.0.0.0 --drafts --output-dir /tmp/relay-node-public --force
