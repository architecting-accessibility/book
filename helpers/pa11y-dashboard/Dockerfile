# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:24-bookworm-slim
ARG PA11Y_DASHBOARD_VERSION=5.2.0

FROM ${NODE_IMAGE} AS build

ARG PA11Y_DASHBOARD_VERSION

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
       ca-certificates \
       git \
       fonts-liberation \
       libasound2 \
       libatk-bridge2.0-0 \
       libatk1.0-0 \
       libcups2 \
       libdbus-1-3 \
       libdrm2 \
       libgbm1 \
       libgtk-3-0 \
       libnspr4 \
       libnss3 \
       libx11-xcb1 \
       libxcomposite1 \
       libxdamage1 \
       libxrandr2 \
       xdg-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN git clone --depth 1 \
    --branch "${PA11Y_DASHBOARD_VERSION}" \
    https://github.com/pa11y/pa11y-dashboard.git .

ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

RUN npm ci --omit=dev \
    && npm cache clean --force

FROM ${NODE_IMAGE} AS runtime

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
       ca-certificates \
       fonts-liberation \
       libasound2 \
       libatk-bridge2.0-0 \
       libatk1.0-0 \
       libcups2 \
       libdbus-1-3 \
       libdrm2 \
       libgbm1 \
       libgtk-3-0 \
       libnspr4 \
       libnss3 \
       libx11-xcb1 \
       libxcomposite1 \
       libxdamage1 \
       libxrandr2 \
       xdg-utils \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system pptruser \
    && useradd --system --gid pptruser --groups audio,video \
       --create-home --home-dir /home/pptruser pptruser

WORKDIR /app

COPY --from=build --chown=pptruser:pptruser /app /app

USER pptruser

ENV NODE_ENV=production
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

EXPOSE 4000

CMD ["node", "index.js"]
