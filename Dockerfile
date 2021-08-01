FROM node:14-slim

RUN groupadd container_users && useradd -ms /bin/bash -g container_users belmont
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

USER belmont
ENV PAPYRUS_DIR /home/belmont/papyrus/
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN mkdir -p $PAPYRUS_DIR
ADD . $PAPYRUS_DIR
WORKDIR $PAPYRUS_DIR

RUN npm install
CMD node index.js