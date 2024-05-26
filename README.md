## Getting Started

First, run the development server:

```bash
docker-compose up -d

yarn install

yarn dev
```

migrate database

```bash
npx prisma format 

npx prisma migrate dev
```


build

```bash
docker build -t nextjs-docker .
docker images
docker run -p 3000:3000 nextjs-docker
```

## Checklist

-   [x] **Setup Project:** Setup NextJS with TailwindCSS, SASS, PostgreSQL, Firebase Authentication, Docker
-   [x] **Create Modal Database:** Write flow and modal database, implement into code base
-   [] **Login with Google:** Using Firebase SDK to Login and Authorization
-   [x] **Login with Email and Password:** User must register by email and password to login
-   [x] **Scraping search data:** Using scrapy by Flask Python backend to crawl data from google search and return when done. 
-   [] **UI** Map flow front end - backend - Scrapy service


## System Overview

### Models
<img src="documents/databaseModal.png">

### Flow
<img src="documents/finalFlow.png">


## Reference 
- [Plantuml](https://plantuml.com/object-diagram)