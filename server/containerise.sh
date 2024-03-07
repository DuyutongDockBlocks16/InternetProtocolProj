cd server
docker build -t itpback:v0 .
docker run -p 3000:3000 --cpus=1 --memory=2g 44dc11229a6b