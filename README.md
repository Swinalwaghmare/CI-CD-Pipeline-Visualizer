# CI/CD Pipeline Visualizer – Event-Driven GitOps Deployment

## Project Overview

This project demonstrates a **real-world, event-driven CI/CD and GitOps workflow** for a containerized frontend application.

The system builds Docker images manually, pushes them to Docker Hub, and **automatically updates Helm chart values** using webhooks and GitHub Actions. Deployment is driven purely by **Git changes**, making it compatible with GitOps tools such as ArgoCD.

The project intentionally avoids cloud-provider lock-in and works reliably even in **restricted or sandbox environments**.

---

## Problem Statement

In many CI/CD setups:

* Docker images are rebuilt on every code push (unnecessary and costly)
* Image registries cannot directly authenticate with Git providers
* Deployments are triggered imperatively (`kubectl set image`)
* Git is not treated as the single source of truth

Additionally, **Docker Hub webhooks cannot send custom authorization headers**, which prevents them from directly triggering GitHub Actions via API.

This project solves these problems by:

* Using **manual image builds** (controlled releases)
* Introducing a **secure webhook proxy**
* Updating **Helm values via Git commits**
* Enabling a **pure GitOps deployment model**

---

## Architecture / Workflow

### High-Level Flow

```
Manual Trigger (GitHub Actions)
        ↓
Docker Image Build
        ↓
Push Image to Docker Hub
        ↓
Docker Hub Webhook
        ↓
Cloudflare Worker (Webhook Proxy)
        ↓
GitHub repository_dispatch Event
        ↓
GitHub Actions (update-helm workflow)
        ↓
Helm values.yaml Updated & Committed
        ↓
(ArgoCD syncs automatically, if configured)
```

### Key Design Decisions

* **Manual Docker builds** prevent unnecessary image creation
* **Webhook-driven updates** ensure event-based automation
* **Git remains the single source of truth**
* **Cloudflare Worker** bridges Docker Hub → GitHub authentication gap
* **No direct Kubernetes access from CI**

---

## Tech Stack

* **Frontend**: React (Vite)
* **Containerization**: Docker, Nginx
* **Image Registry**: Docker Hub (Private Repository)
* **CI/CD**: GitHub Actions
* **GitOps**: Helm (values.yaml updates)
* **Webhook Proxy**: Cloudflare Workers
* **Deployment (Optional)**: Kubernetes + ArgoCD

---

## Setup & Installation

### Prerequisites

* GitHub account
* Docker Hub account
* Cloudflare account (free tier)
* Docker installed locally
* GitHub repository with Actions enabled

---

### Repository Structure

```
repo-root/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── helm/
│   └── cicd-pipeline-viz/
│       └── values.yaml
│
└── .github/
    └── workflows/
        ├── docker-build.yml
        └── update-helm.yml
```

---

### Docker Hub Setup

1. Create a **private repository** on Docker Hub
2. Enable **Webhooks** for the repository
3. Set webhook URL to the **Cloudflare Worker endpoint**

---

### Cloudflare Worker Setup

The Cloudflare Worker acts as a **secure webhook forwarder**:

* Receives Docker Hub webhook (no auth)
* Adds GitHub authorization header
* Calls GitHub `repository_dispatch` API

A **GitHub Classic Personal Access Token** (`repo`, `workflow`) is stored as a **Worker secret**.

---

## Usage

### 1. Build & Push Docker Image (Manual)

From GitHub UI:

* Go to **Actions**
* Select **Manual Docker Build & Push**
* Click **Run workflow**
* Provide an image tag (e.g. `v1.0.0`)

This builds and pushes:

```
dockerhub-user/cicd-pipeline-viz:v1.0.0
```

---

### 2. Automatic Helm Update (No Manual Action)

After image push:

* Docker Hub webhook fires
* Cloudflare Worker forwards event
* GitHub Actions updates `helm/cicd-pipeline-viz/values.yaml`
* Commit is pushed automatically

Example update:

```yaml
image:
  repository: dockerhub-user/cicd-pipeline-viz
  tag: v1.0.0
```

---

### 3. Deployment (Optional)

If ArgoCD is configured:

* ArgoCD detects Git change
* Syncs Helm chart
* Kubernetes rollout occurs automatically

No `kubectl` commands are required.

---

## CI/CD & Kubernetes Details

### GitHub Actions Workflows

#### 1. `docker-build.yml`

* Trigger: `workflow_dispatch`
* Purpose: Build & push Docker image manually
* Prevents CI loops and unnecessary builds

#### 2. `update-helm.yml`

* Trigger: `repository_dispatch (image_pushed)`
* Purpose: Update Helm `values.yaml`
* Uses GitHub-provided token with `contents: write`

---

### GitOps Compliance

* No direct cluster access from CI
* No image tag mutation in Kubernetes
* All deployments are driven by Git changes
* Compatible with ArgoCD, Flux, or manual Helm

---

## Future Improvements

* Add multi-environment Helm values (`dev`, `staging`, `prod`)
* Add approval gate before Helm updates
* Implement automatic rollback on failed sync
* Replace webhook proxy with ArgoCD Image Updater (alternative model)
* Add security scanning (Trivy / Snyk)
* Add semantic version validation
* Visualize pipeline using diagrams or dashboards

---

## Summary

This project demonstrates a **production-grade, event-driven GitOps workflow** that:

* Works without cloud IAM dependencies
* Solves Docker Hub authentication limitations
* Enforces controlled releases
* Keeps Git as the single source of truth

It reflects **real-world DevOps architecture**, not a simplified tutorial setup.

---

If you want, I can also:

* Add an **architecture diagram**
* Create a **Kubernetes deployment example**
* Add an **ArgoCD Application manifest**
* Simplify this README for interview submissions
