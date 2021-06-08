# ---- Step 1 - Base node ----
FROM node:14 AS base

WORKDIR /usr/discord-bot
COPY package.json yarn.lock ./

# ---- Step 2 - Dependencies ----
FROM base AS dependencies

# Install prod deps
RUN yarn install --prod

# Copy production deps aside
RUN cp -R node_modules prod_node_modules

# Install all deps (tests need them)
RUN yarn install

# ---- Step 3 - Test (Uncomment if wanted) ----
# FROM dependencies AS test
# COPY . .
# RUN yarn lint && yarn test


# ---- Step 4 - Release ----
FROM base AS release

# Copy prod deps
COPY --from=dependencies /usr/discord-bot/prod_node_modules ./node_modules

# Copy source
COPY . .

# Build bot
RUN yarn build

# Start bot
CMD yarn start



