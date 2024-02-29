cd client
docker build -t itpfront:v0 .
docker run -p 5173:5173 --cpus=1 --memory=2g 44dc11229a6b