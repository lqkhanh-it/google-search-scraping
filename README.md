## Getting Started

First, run the development server:

```bash
docker build -t my-postgres-image .

docker run -d --name my-postgres-container -p 5432:5432 my-postgres-image

yarn install

yarn dev
```


### Checklist

-   [] **Setup Project:** Setup NextJS with TailwindCSS, SASS, PostgreSQL, Firebase Authentication, Docker
-   [] **Create Modal Database:** Write flow and modal database, implement into code base
-   [] **Login with Google:** Using Firebase SDK to Login and Authorization
-   [] **Scraping search data:** In search
-   [] **UI** In progress


## Reference 
- [Plantuml](https://plantuml.com/object-diagram)