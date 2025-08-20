### Hvordan starte en database for testing
```sh
docker run -e POSTGRES_PASSWORD=password123 --rm -p 5432:5432 postgres
```

### Hvordan koble til den for testing
```sh
psql -h localhost -p 5432 --username postgres
```
