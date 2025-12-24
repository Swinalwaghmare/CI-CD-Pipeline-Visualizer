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

### Video Demo
https://github.com/user-attachments/assets/8ef17aff-786f-4d02-a21e-236d58117dac

