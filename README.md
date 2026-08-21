# Auction Angular Client

Client web du projet Auction, développé en Angular 21 avec une architecture basée sur les Signals (state réactif) et des mises à jour temps réel via WebSocket (STOMP).

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) 
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Max-Rougeux/auction-angular-client)

---

## API Backend

Serveur REST du projet, développé en Spring Boot 4 / Java 21, avec sécurité JWT (refresh token rotatif) et persistance multi-profils (mock, JDBC, JPA).

[![Java](https://img.shields.io/badge/Java-21-orange)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.6-brightgreen)](https://github.com/Max-Rougeux/auction-spring-api)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Max-Rougeux/auction-spring-api)

---

## Stack technique

| Couche | Technologies |
|---|---|
| Framework | Angular 21, Standalone Components, Signals |
| Langage | TypeScript 5 |
| Temps réel | WebSocket (STOMP over SockJS) |
| Data viz | eCharts |
| Animations | GSAP, [ng-motion](https://ng-motion.dev/) |
| Style | Tailwind CSS |

---

## Prérequis

- Node.js ≥ 18
- Angular CLI (`npm install -g @angular/cli`)
- [API backend](https://github.com/Max-Rougeux/auction-spring-api) démarrée en local

---

## Installation

```bash
git clone https://github.com/Max-Rougeux/auction-angular-client.git
cd auction-angular-client
npm install
ng serve
```

Application accessible sur `http://localhost:4200/`.

---

## Fonctionnalités
 
| Domaine | Détail |
|---|---|
| Enchères temps réel | Mise à jour du prix et de l'historique via STOMP, sans rechargement |
| Notifications de surenchère | Topic `/user/queue/refund` par utilisateur, payload typé en union discriminée |
| Prix en direct | Topic public `/topic/sales/price`, animation par slug via `PriceAnimService` |
| Graphique des enchères | eCharts, dégradé personnalisé, tooltip avec identité de l'enchérisseur |
| Auth | JWT avec refresh transparent sur 401, cookies `HttpOnly` |
| Transitions | Overlay de transition GSAP piloté par `WipeService` |
| Notifications & toasts | `ToastService` / `NotificationService` pour les alertes système |
 
---
 
## Architecture (`src/app/core`)
 
| Répertoire | Rôle | Éléments clés |
|---|---|---|
| `action/` | Services HTTP métier | `AuthService`, `BiddingService` |
| `api/` | Données et état des entités | `SaleService`, `BidService`, `MeService` |
| `models/` | Contrats TypeScript | `Sale`, `User`, `Item` |
| `guards/` | Protection des routes | `authGuard`, `loginGuard`, `wipeGuard` |
| `interceptors/` | Middleware HTTP | `authInterceptor` |
| `resolvers/` | Préchargement des données | `meResolver`, `saleResolver` |
| `ui/` | Services transverses UI | `WebSocketService`, `TokenService`, `WipeService` |
 
Autres points d'architecture :
- État applicatif (`panelState`) en `computed signal`, union type discriminée
- Logique métier (`BidStepper`) extraite en classe TS pure, testable hors framework
- Gestion du cycle de vie des souscriptions via `takeUntilDestroyed`

---

## Structure du projet
 
```
src/
├── app/
│   ├── core/
│   │   ├── action/        # AuthService, BiddingService
│   │   ├── api/           # BidService, CategoryService, MeService, SaleService
│   │   ├── guards/        # authGuard, loginGuard, wipeGuard
│   │   ├── interceptors/  # authInterceptor
│   │   ├── models/        # Bid, Brand, Category, Image, Item, Response, Sale, User
│   │   ├── resolvers/     # meResolver, saleResolver
│   │   ├── types/         # common.ts, constants.ts
│   │   └── ui/            # services ui
│   ├── features/
│   │   ├── auction/
│   │   ├── home/
│   │   ├── login/
│   │   └── not-found/
│   └── shared/
│       ├── components/     # composants réutilisables
│       ├── icons/          # icônes SVG (bell, gavel, lock, money, signal...)
│       ├── layouts/        # credit, feed, footer, notification, toast, topbar
│       ├── pipes/          # pipes angular
│       └── utils/          # animations
└── environments/
```
