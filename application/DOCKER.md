# Docker Deployment Guide

## 🐳 Docker Setup

This project includes a production-ready Dockerfile with multi-stage builds for optimal image size and performance.

## 📦 Files

- **Dockerfile** - Multi-stage build (Node.js → Nginx)
- **nginx.conf** - Nginx configuration with compression & caching
- **.dockerignore** - Excludes unnecessary files from build
- **docker-compose.yml** - Easy orchestration

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Access at: **http://localhost:8080**

### Option 2: Docker CLI

```bash
# Build the image
docker build -t cicd-pipeline-viz .

# Run the container
docker run -d -p 8080:80 --name pipeline-viz cicd-pipeline-viz

# View logs
docker logs -f pipeline-viz

# Stop and remove
docker stop pipeline-viz
docker rm pipeline-viz
```

## 🏗️ Build Details

### Multi-Stage Build

**Stage 1: Builder**
- Base: `node:20-alpine`
- Installs dependencies
- Builds React app with Vite
- Output: Optimized static files in `/dist`

**Stage 2: Production**
- Base: `nginx:alpine`
- Copies built files from Stage 1
- Serves with Nginx
- Final image size: ~25MB

### Image Optimization

- ✅ Multi-stage build reduces image size by 90%
- ✅ Alpine Linux for minimal footprint
- ✅ Only production dependencies included
- ✅ Gzip compression enabled
- ✅ Static asset caching configured

## 🔧 Configuration

### Environment Variables

You can customize the build with environment variables:

```bash
# Build with custom NODE_ENV
docker build --build-arg NODE_ENV=production -t cicd-pipeline-viz .
```

### Port Mapping

Change the exposed port in `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Access at http://localhost:3000
```

## 🏥 Health Checks

The container includes a health check endpoint:

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' pipeline-viz

# Manual health check
curl http://localhost:8080/health
```

## 📊 Monitoring

### View Container Stats

```bash
docker stats pipeline-viz
```

### View Logs

```bash
# Follow logs
docker logs -f pipeline-viz

# Last 100 lines
docker logs --tail 100 pipeline-viz
```

## 🔒 Security Features

- ✅ Non-root user (Nginx)
- ✅ Security headers configured
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection enabled

## 🚢 Deployment

### Push to Docker Hub

```bash
# Tag the image
docker tag cicd-pipeline-viz yourusername/cicd-pipeline-viz:latest

# Login to Docker Hub
docker login

# Push
docker push yourusername/cicd-pipeline-viz:latest
```

### Deploy to Cloud

#### AWS ECS/Fargate

```bash
# Tag for ECR
docker tag cicd-pipeline-viz:latest <account-id>.dkr.ecr.<region>.amazonaws.com/cicd-pipeline-viz:latest

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/cicd-pipeline-viz:latest
```

#### Google Cloud Run

```bash
# Tag for GCR
docker tag cicd-pipeline-viz gcr.io/<project-id>/cicd-pipeline-viz:latest

# Push to GCR
docker push gcr.io/<project-id>/cicd-pipeline-viz:latest

# Deploy
gcloud run deploy cicd-pipeline-viz --image gcr.io/<project-id>/cicd-pipeline-viz:latest --platform managed
```

#### Azure Container Instances

```bash
# Tag for ACR
docker tag cicd-pipeline-viz <registry-name>.azurecr.io/cicd-pipeline-viz:latest

# Push to ACR
docker push <registry-name>.azurecr.io/cicd-pipeline-viz:latest
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t cicd-pipeline-viz .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push cicd-pipeline-viz:latest
```

## 🧪 Testing

### Test the Docker build locally

```bash
# Build
docker build -t cicd-pipeline-viz:test .

# Run
docker run -d -p 8080:80 --name test-viz cicd-pipeline-viz:test

# Test
curl http://localhost:8080

# Cleanup
docker stop test-viz && docker rm test-viz
```

## 📝 Troubleshooting

### Container won't start

```bash
# Check logs
docker logs pipeline-viz

# Check if port is in use
netstat -an | grep 8080
```

### Build fails

```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t cicd-pipeline-viz .
```

### Image too large

```bash
# Check image size
docker images cicd-pipeline-viz

# Analyze layers
docker history cicd-pipeline-viz
```

## 🎯 Best Practices

1. ✅ Use multi-stage builds
2. ✅ Minimize layers
3. ✅ Use .dockerignore
4. ✅ Run as non-root user
5. ✅ Include health checks
6. ✅ Tag images properly
7. ✅ Keep base images updated

## 📚 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Ready for production deployment! 🚀**
