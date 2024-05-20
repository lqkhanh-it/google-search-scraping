FROM postgres:latest

ENV POSTGRES_PASSWORD=docker

RUN mkdir -p /var/lib/postgresql/data

VOLUME /var/lib/postgresql/data

EXPOSE 5432

ENTRYPOINT ["postgres", "-d"]