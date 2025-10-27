# Configuration Google Sheets pour ZH HOME

## 📋 Guide d'installation

### Étape 1: Créer une Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Nommez-la **"Commandes ZH HOME"**
4. Ajoutez les en-têtes suivants dans la première ligne (A1 à H1):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Date/Heure | Nom Complet | WhatsApp | Adresse | Modèle | Couleur | Quantité | Commentaires |

### Étape 2: Créer le Google Apps Script

1. Dans votre Google Sheet, allez dans **Extensions > Apps Script**
2. Supprimez le code par défaut et collez le code suivant:

```javascript
function doPost(e) {
  try {
    // Ouvrir la feuille de calcul
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Ajouter une nouvelle ligne avec les données
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.whatsapp,
      data.address,
      data.model,
      data.color,
      data.quantity,
      data.comments
    ]);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retourner une erreur
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Service de commandes ZH HOME actif")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Étape 3: Déployer le script

1. Cliquez sur **Déployer > Nouveau déploiement**
2. Sélectionnez le type: **Application web**
3. Description: "API Commandes ZH HOME"
4. Exécuter en tant que: **Moi**
5. Qui a accès: **Tout le monde**
6. Cliquez sur **Déployer**
7. **IMPORTANT**: Copiez l'URL du déploiement (elle ressemble à: `https://script.google.com/macros/s/VOTRE_ID_SCRIPT/exec`)

### Étape 4: Mettre à jour le site web

1. Ouvrez le fichier `script.js`
2. Remplacez `YOUR_GOOGLE_SCRIPT_ID` par votre ID de script:

```javascript
// Remplacez cette ligne:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';

// Par votre URL réelle:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_VRAI_ID/exec';
```

3. Remplacez aussi `YOUR_WHATSAPP_NUMBER` par votre numéro WhatsApp complet avec l'indicatif pays (ex: `213123456789`)

### Étape 5: Tester l'intégration

1. Ouvrez votre site web
2. Remplissez le formulaire de commande
3. Soumettez le formulaire
4. Vérifiez que les données apparaissent dans votre Google Sheet

## 🔧 Dépannage

### Problème: "Erreur de connexion"
- Vérifiez que l'URL du script est correcte
- Assurez-vous que le script est déployé avec les bonnes permissions

### Problème: "Données non enregistrées"
- Vérifiez les en-têtes de votre Google Sheet
- Assurez-vous que le script a les permissions d'écriture

### Problème: "Formulaire ne se soumet pas"
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que tous les champs requis sont remplis

## 📊 Fonctionnalités

### ✅ Ce qui fonctionne:
- Soumission automatique vers Google Sheets
- Validation des champs en temps réel
- Message de confirmation
- Fallback vers WhatsApp en cas d'erreur
- Design responsive et animations

### 🔄 Workflow:
1. Client remplit le formulaire
2. Données envoyées vers Google Sheets
3. Confirmation affichée au client
4. Vous recevez la commande dans votre feuille de calcul
5. Vous contactez le client via WhatsApp

## 📱 Notifications (Optionnel)

Pour recevoir des notifications par email à chaque nouvelle commande, ajoutez cette fonction à votre Google Apps Script:

```javascript
function sendNotification(data) {
  const subject = `Nouvelle commande ZH HOME - ${data.fullName}`;
  const body = `
    Nouvelle commande reçue:
    
    Nom: ${data.fullName}
    WhatsApp: ${data.whatsapp}
    Adresse: ${data.address}
    Modèle: ${data.model}
    Couleur: ${data.color}
    Quantité: ${data.quantity}
    Commentaires: ${data.comments}
    
    Date: ${data.timestamp}
  `;
  
  GmailApp.sendEmail('votre-email@gmail.com', subject, body);
}
```

Puis ajoutez `sendNotification(data);` dans la fonction `doPost` après `sheet.appendRow(...)`.

---

**© 2025 ZH HOME - Configuration technique**
