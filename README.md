# 🔥 Hestia - Liste d'Attente

Application de liste d'attente moderne pour Hestia, la plateforme de matching intelligent qui connecte les talents freelance avec les établissements d'hôtellerie et de restauration.

![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## 🎯 À propos

Cette application permet aux utilisateurs de s'inscrire sur la liste d'attente pour le lancement d'Hestia. Elle offre :

- ✨ Design moderne avec un dégradé orange/doré (#FF5900 → #CC9933)
- 📧 Inscription par email avec validation
- 🔒 Protection contre les doublons
- 📊 Backend Supabase avec Row Level Security (RLS)
- 🎨 UI responsive construite avec shadcn/ui et Tailwind CSS

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Supabase (gratuit)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd waitList
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

4. **Configurer la base de données Supabase**

Connectez-vous à votre [Dashboard Supabase](https://supabase.com/dashboard) et exécutez les migrations SQL suivantes :

**a) Créer la table waitlist :**
```sql
-- Voir le fichier : supabase/migrations/20251119103624_create_waitlist_table.sql
```

**b) Configurer les permissions RLS :**
```sql
-- Voir le fichier : supabase/migrations/waitlist_permissions.sql
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
waitList/
├── app/
│   ├── page.tsx          # Page principale avec formulaire d'inscription
│   ├── layout.tsx        # Layout global
│   └── globals.css       # Styles globaux
├── components/
│   └── ui/               # Composants shadcn/ui
├── lib/
│   ├── supabase.ts       # Client Supabase
│   └── utils.ts          # Utilitaires (cn, etc.)
├── supabase/
│   ├── migrations/       # Migrations SQL
│   └── queries/          # Requêtes SQL utiles
└── hooks/
    └── use-toast.ts      # Hook pour les notifications
```

## 🗄️ Base de données

### Table `waitlist`

| Colonne      | Type          | Description                              |
|--------------|---------------|------------------------------------------|
| `id`         | uuid          | Clé primaire (auto-générée)             |
| `email`      | text          | Email de l'utilisateur (unique, lowercase) |
| `created_at` | timestamptz   | Date d'inscription                       |
| `source`     | text          | Source d'inscription (par défaut : 'web') |

### Récupérer les emails

Utilisez les requêtes SQL dans `supabase/queries/get_all_emails.sql` :

```sql
-- Liste simple des emails
SELECT email FROM waitlist ORDER BY created_at DESC;

-- Vue complète avec statistiques
SELECT 
  COUNT(*) as total_inscriptions,
  MIN(created_at) as premiere_inscription,
  MAX(created_at) as derniere_inscription
FROM waitlist;
```

## 🎨 Personnalisation

### Couleurs de la marque

Les couleurs principales d'Hestia sont définies dans le dégradé :
- **Orange primaire** : `#FF5900`
- **Doré** : `#CC9933`

Modifiez-les dans `app/page.tsx` pour personnaliser le thème.

### Composants UI

Le projet utilise [shadcn/ui](https://ui.shadcn.com/). Pour ajouter de nouveaux composants :

```bash
npx shadcn-ui@latest add [component-name]
```

## 📜 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer la version production
npm start

# Linter
npm run lint

# Vérification TypeScript
npm run typecheck
```

## 🔒 Sécurité

- ✅ Row Level Security (RLS) activé sur Supabase
- ✅ Validation des emails côté client et serveur
- ✅ Protection contre les doublons (contrainte UNIQUE)
- ✅ Emails stockés en minuscules (contrainte CHECK)
- ✅ Variables d'environnement pour les clés sensibles

## 🐛 Résolution des problèmes

### Erreur 403 lors de l'inscription

Si vous recevez une erreur 403, vérifiez que :
1. Les politiques RLS sont correctement configurées
2. La clé `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correcte
3. Les permissions sont accordées au rôle `anon`

Exécutez le fichier `supabase/migrations/waitlist_permissions.sql` dans le SQL Editor de Supabase.

### L'email existe déjà

C'est normal ! La table empêche les doublons. L'utilisateur verra un message : "Cet email est déjà inscrit sur la liste d'attente !"

## 🤝 Contribution

Ce projet fait partie de la plateforme Hestia. Pour toute question ou suggestion :

📧 Email : [contact@hestia.com](mailto:contact@hestia.com)

## 📝 Licence

Propriétaire - Hestia © 2025

---

**Développé avec ❤️ pour révolutionner le recrutement dans l'HCR**

