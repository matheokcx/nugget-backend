# Projet backend

---

## Stack technique

- NestJS
- TypeORM
- Postgres
- Jest

## Structure du projet

- `src/auth`: Module de l'authentification
- `src/config/data-source.ts`: Base de configuration
- `src/migrations`: Dossier des migrations de la base de données
- `src/user`: Module de l'entité User

## Commandes utiles pour la validation

- `npm run format`: Formater le code source
- `npm run lint`: Vérifier le code
- `npm run build`: Build de l'application
- `npm run test`: Lancer les tests unitaires et d'intégration

## Règles à suivre

1. Ne **jamais** lire les fichiers d'environnements sous aucun prétexte
2. Lors du développement d'une nouvelle fonctionnalité, si elle concerne une nouvelle entité, il faut créer son module associé dans l'arborescence pour suivre la logique déjà établit
3. Toujours validé ce qui vient du client et lui est retourné : `dto`, `class-validator`, réponses d'api contrôlées
4. Ne cherche pas à faire trop complèxe en surchargeant une classe de service, ou avoir un algorithme trop complèxe qui prend du temps, il vaut mieux une meilleure répartition du code
5. Pas de tests dans le cadre de ce projet
6. Ne pas créer un module nestjs uniquement pour un service ou un type

## Workflow de travail

Il faut réaliser les étapes **dans l'ordre** afin de développer correctement chaque fonctionnalité :

1. Utiliser **git** afin d'être à jour avec la branche `dev` puis de créer sa propre branche
2. Inspecter les fichiers et modules existants et éviter de créer du code doublon ou inutile
3. Créer ou modifier le/les modules concernés avec de nouvelles routes api, services, dto, interfaces, entités, migrations
4. Vérifier que d'un point de vue **fonctionnel** tout est ok
5. Lancer les commandes de **validation** (lint, build, test) avant de terminer et de push pour créer la pull request
