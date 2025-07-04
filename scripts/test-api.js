#!/usr/bin/env node

/**
 * Script pour tester la connexion à l'API Laravel
 * Usage: node scripts/test-api.js
 */

const API_URL = process.env.VITE_API_URL || "http://localhost:8000/api";

async function testApiConnection() {
  console.log("🔍 Test de connexion à l'API Laravel...");
  console.log(`📡 URL de test: ${API_URL}`);
  console.log("");

  try {
    // Test de connexion basique
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Laravel accessible !");
      console.log(`📊 Statut: ${response.status}`);
      console.log(`🔢 Nombre de commandes: ${data.data?.data?.length || 0}`);
      console.log("");
      console.log(
        "💡 Pour utiliser l'API réelle, définissez VITE_USE_FALLBACK=false dans votre .env",
      );
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.log("❌ API Laravel non accessible");
    console.log(`🔥 Erreur: ${error.message}`);
    console.log("");
    console.log("📋 Solutions possibles:");
    console.log("1. Démarrer le serveur Laravel: php artisan serve");
    console.log("2. Vérifier l'URL dans VITE_API_URL");
    console.log("3. Configurer CORS dans Laravel");
    console.log("4. Utiliser le mode fallback: VITE_USE_FALLBACK=true");
    console.log("");
    console.log("📖 Guide complet: voir LARAVEL_SETUP.md");
  }
}

// Exécuter le test
testApiConnection();
