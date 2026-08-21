# Auction Angular Client

Client web du projet Auction, développé en Angular 21 avec une architecture basée sur les Signals (state réactif) et des mises à jour temps réel via WebSocket (STOMP).

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![WebSocket](https://img.shields.io/badge/WebSocket-STOMP-orange)]()

---

## API Backend

Serveur REST du projet, développé en Spring Boot 4 / Java 21, avec sécurité JWT (refresh token rotatif) et persistance multi-profils (mock, JDBC, JPA).

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.6-brightgreen)](https://github.com/Max-Rougeux/auction-spring-api)

---

## Stack technique

| Couche | Technologies |
|---|---|
| Framework | Angular 21, Standalone Components, Signals |
| Langage | TypeScript 5 |
| Temps réel | WebSocket (STOMP over SockJS) |
| Data viz | Apache eCharts |
| Animations | GSAP |
| Style | SCSS |
| Tests | Vitest |

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


## Fonctionnalités

| Domaine | Détail |
|---|---|
| Enchères temps réel | Mise à jour du prix et de l'historique via STOMP, sans rechargement |
| Notifications de surenchère | Topic `/user/queue/credit` par utilisateur, payload typé en union discriminée |
| Crédit utilisateur | Compteur animé (GSAP), feedback couleur selon le sens du mouvement |
| Graphique des enchères | eCharts, dégradé personnalisé, tooltip avec identité de l'enchérisseur |
| Auth | JWT avec refresh automatique, cookies `HttpOnly` |
| Transitions | `ngmMotion` / `ngmPresence` entre états de l'application |

---

## Architecture

| Aspect | Choix |
|---|---|
| État applicatif | `panelState` en `computed signal`, union type discriminée |
| Données de vente | `SaleResolver`, préchargement avant navigation |
| Logique métier | `BidStepper` extrait en classe TS pure, testable hors framework |
| Cycle de vie | Gestion des souscriptions via `takeUntilDestroyed` |

---

## Structure du projet

```
src/app/
├── core/          # Services transverses (auth, websocket, credit...)
├── features/      # Modules fonctionnels (enchères, ventes, profil...)
├── shared/        # Composants, pipes et directives réutilisables
└── models/        # Interfaces et types partagés
```
