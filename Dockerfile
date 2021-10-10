FROM node:14

ENV GCLOUD_API_KEY=AIzaSyDgi10TcxcCYPKdjrzdtTRaBCm2yH1A1Ak
ENV GCLOUD_AUTH_DOMAIN=news-archiver-7395b.firebaseapp.com
ENV GCLOUD_PROJECTID=news-archiver-7395b
ENV GCLOUD_STORAGE_BUCKET=news-archiver-7395b.appspot.com
ENV GCLOUD_MESSAGING_SENDER_ID=930834474148
ENV GCLOUD_APPID=1:930834474148:web:6bc5815c65aacd874c7231
ENV GCLOUD_MEASUREMENTID=G-KXFWG9R3TK
ENV GCLOUD_STORAGEURL=gs://news-archiver-7395b.appspot.com

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 


CMD [ "node", "server.js" ]


RUN dpkg --add-architecture i386


RUN apt -y update && apt -y install \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  ibatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgtk2.0-0:i386\
  libsm6:i386\
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget xdg-utils \
  && rm -rf /var/lib/apt/lists/*