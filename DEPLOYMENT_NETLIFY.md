# Guide de Déploiement Frontend sur Netlify

## 📋 Configuration Requise

### Informations du Projet
- **Frontend**: altusfinancegroup.com (Netlify)
- **Backend**: api.altusfinancegroup.com (Render)
- **Base de données**: PostgreSQL sur Render

---

## 🚀 Étapes de Déploiement

### 1. Créer un Compte Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte ou connectez-vous
3. Liez votre compte GitHub/GitLab/Bitbucket

### 2. Créer un Nouveau Site

#### Option A: Via l'Interface Web
1. Cliquez sur **"Add new site"** > **"Import an existing project"**
2. Sélectionnez votre provider Git (GitHub, GitLab, etc.)
3. Choisissez votre repository
4. Netlify détectera automatiquement `netlify.toml`

#### Option B: Via Netlify CLI
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser le projet
netlify init
```

### 3. Configuration du Build

Netlify utilisera automatiquement le fichier `netlify.toml` créé, qui contient:

```toml
[build]
  command = "npm install && npm run build:frontend"
  publish = "dist/public"
```

**⚠️ Important**: Si Netlify ne détecte pas automatiquement, configurez manuellement:
- **Build command**: `npm install && npm run build:frontend`
- **Publish directory**: `dist/public`
- **Node version**: 20

### 4. Variables d'Environnement

Dans Netlify Dashboard:
1. Allez dans **Site settings** > **Environment variables**
2. Ajoutez les variables suivantes:

| Variable | Valeur | Description |
|----------|--------|-------------|
| `VITE_API_URL` | `https://api.altusfinancegroup.com` | URL de votre API backend sur Render |
| `NODE_VERSION` | `20` | Version de Node.js |

**⚠️ CRITIQUE**: Sans `VITE_API_URL`, le frontend ne pourra pas communiquer avec le backend!

#### Comment ajouter les variables:
```bash
# Via Netlify CLI
netlify env:set VITE_API_URL "https://api.altusfinancegroup.com"

# Ou dans l'interface web:
# Site settings > Environment variables > Add a variable
```

### 5. Configuration du Domaine

#### Domaine Principal
1. Allez dans **Site settings** > **Domain management**
2. Cliquez sur **"Add custom domain"**
3. Entrez `altusfinancegroup.com`
4. Netlify vous donnera des instructions DNS

#### Configuration DNS (chez votre registrar)
Ajoutez ces enregistrements DNS:

```
Type: A
Name: @
Value: 75.2.60.5 (IP Netlify - peut varier)

Type: CNAME
Name: www
Value: altusfinancegroup.com
```

**OU utilisez Netlify DNS** (recommandé):
1. Dans Netlify, cliquez sur **"Use Netlify DNS"**
2. Netlify vous donnera des serveurs de noms
3. Changez les nameservers chez votre registrar

#### SSL/HTTPS
- Netlify active automatiquement HTTPS avec Let's Encrypt
- Attendez quelques minutes après la configuration du domaine

### 6. Déploiement

#### Déploiement Automatique
Chaque `git push` sur votre branche principale déclenchera automatiquement un nouveau déploiement.

#### Déploiement Manuel
```bash
# Via CLI
netlify deploy --prod

# Ou dans l'interface:
# Deploys > Trigger deploy > Deploy site
```

### 7. Vérifications Post-Déploiement

#### ✅ Checklist
- [ ] Le site se charge sur `https://altusfinancegroup.com`
- [ ] `www.altusfinancegroup.com` redirige vers `altusfinancegroup.com`
- [ ] Les appels API fonctionnent (vérifiez la console du navigateur)
- [ ] SSL/HTTPS est actif (cadenas vert)
- [ ] Toutes les pages/routes fonctionnent
- [ ] Les formulaires fonctionnent et communiquent avec le backend

#### 🔍 Tests à Effectuer
```bash
# Vérifier que l'API est accessible
curl https://api.altusfinancegroup.com/api/health

# Vérifier le frontend
curl -I https://altusfinancegroup.com
```

#### Console du Navigateur
1. Ouvrez la console (F12)
2. Vérifiez qu'il n'y a pas d'erreurs CORS
3. Vérifiez que les requêtes API pointent vers `api.altusfinancegroup.com`

---

## 🔧 Configuration Backend (Render)

### CORS sur le Backend
Assurez-vous que votre backend sur Render autorise les requêtes depuis votre frontend:

```javascript
// Dans votre configuration Express
const allowedOrigins = [
  'https://altusfinancegroup.com',
  'https://www.altusfinancegroup.com',
  'http://localhost:5000' // Pour le développement local
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### Variables d'Environnement sur Render
Assurez-vous d'avoir configuré:
- `DATABASE_URL` (PostgreSQL connection string)
- `SESSION_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL=https://altusfinancegroup.com`
- Toutes les autres variables nécessaires (Cloudinary, SendGrid, etc.)

---

## 📊 Monitoring et Analytics

### Netlify Analytics (Optionnel)
- Activez dans **Site settings** > **Analytics**
- Coût: ~$9/mois

### Logs de Déploiement
- Consultables dans **Deploys** > Cliquez sur un déploiement
- Utile pour déboguer les erreurs de build

---

## 🐛 Dépannage

### Problème: "Page Not Found" sur les routes
**Solution**: Le fichier `netlify.toml` contient déjà le rewrite nécessaire:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Problème: Erreurs CORS
**Solution**: Vérifiez que le backend autorise `altusfinancegroup.com` dans les CORS

### Problème: API calls échouent
**Solution**: 
1. Vérifiez que `VITE_API_URL` est bien configuré
2. Vérifiez dans la console du navigateur l'URL utilisée
3. Testez l'API directement: `curl https://api.altusfinancegroup.com/api/health`

### Problème: Build échoue
**Solution**:
1. Vérifiez les logs de build dans Netlify
2. Testez localement: `npm run build:frontend`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Problème: Ancien cache Vercel
**Solution**: 
1. Videz le cache du navigateur
2. Attendez la propagation DNS (peut prendre 24-48h)
3. Utilisez un navigateur en mode incognito pour tester

---

## 🔄 Workflow de Développement

### Branches
Configurez des branches de déploiement:
1. **Production**: `main` → `altusfinancegroup.com`
2. **Staging** (optionnel): `staging` → `staging--altusfinancegroup.netlify.app`

### Deploy Previews
- Netlify crée automatiquement des previews pour les Pull Requests
- URL de preview: `deploy-preview-{PR-number}--altusfinancegroup.netlify.app`

---

## 📝 Commandes Utiles

```bash
# Voir le statut du site
netlify status

# Voir les logs
netlify logs

# Ouvrir le dashboard
netlify open

# Ouvrir le site
netlify open:site

# Lancer un build local
npm run build:frontend

# Tester le build localement
npx serve dist/public
```

---

## ✅ Checklist Finale

Avant de considérer le déploiement terminé:

- [ ] Site accessible sur `altusfinancegroup.com`
- [ ] Certificat SSL actif (HTTPS)
- [ ] Redirection www fonctionnelle
- [ ] Variables d'environnement configurées
- [ ] Backend sur Render configuré avec CORS
- [ ] Tests de tous les formulaires
- [ ] Tests de connexion/authentification
- [ ] Tests sur mobile
- [ ] Vérification des performances (Lighthouse)
- [ ] DNS propagé (peut prendre 24-48h)

---

## 📞 Support

- **Documentation Netlify**: https://docs.netlify.com
- **Status Netlify**: https://www.netlifystatus.com
- **Community Forum**: https://answers.netlify.com

---

## 🎯 Différences Clés avec Vercel

| Aspect | Vercel | Netlify |
|--------|--------|---------|
| Configuration | `vercel.json` | `netlify.toml` |
| Rewrites SPA | ✅ Automatique | ✅ Via `netlify.toml` |
| Variables d'env | UI ou `.env` | UI ou `netlify.toml` |
| DNS | Optionnel | Recommandé |
| Analytics | Intégré | Payant ($9/mois) |
| Deploy Previews | ✅ | ✅ |

---

**Note**: Ce fichier `netlify.toml` et ce guide ont été créés pour remplacer votre ancienne configuration Vercel. Tous les paramètres importants ont été migrés.
