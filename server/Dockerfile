# Dockerfile.frontend
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package.json .
COPY package-lock.json .

# 安装依赖
RUN npm install

# 将所有文件复制到工作目录
COPY . .

EXPOSE 3000

# 运行开发服务器
CMD ["npm", "run", "dev"]
