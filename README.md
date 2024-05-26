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

### Checklist

-   [] **Setup Project:** Setup NextJS with TailwindCSS, SASS, PostgreSQL, Firebase Authentication, Docker
-   [] **Create Modal Database:** Write flow and modal database, implement into code base
-   [] **Login with Google:** Using Firebase SDK to Login and Authorization
-   [] **Scraping search data:** In search
-   [] **UI** In progress


## Reference 
- [Plantuml](https://plantuml.com/object-diagram)