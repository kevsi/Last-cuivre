#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Fichiers à nettoyer
const filesToClean = [
  "client/pages/NewOrder.tsx",
  "client/pages/Index.tsx",
  "client/pages/NotFound.tsx",
  "client/pages/ManagerArticles.tsx",
  "client/pages/Login.tsx",
  "client/components/dashboard/OrderTable.tsx",
  "client/components/orders/OrdersTable.tsx",
];

function removeConsoleLogs(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, "utf8");

    // Supprimer les console.log mais garder console.error et console.warn
    content = content.replace(/^\s*console\.log\(.*?\);?\s*$/gm, "");

    fs.writeFileSync(fullPath, content);
    console.log(`✅ Cleaned: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error cleaning ${filePath}:`, error.message);
  }
}

console.log("🧹 Removing console.log statements...");
filesToClean.forEach(removeConsoleLogs);
console.log("✨ Cleanup complete!");
