openssl genrsa -out private.key 2048
openssl req -new -x509 -key private.key -out certificate.crt -days 365