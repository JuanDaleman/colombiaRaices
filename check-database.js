// Simple database check
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'colombia_raices.db');
console.log('🔍 Verificando base de datos:', dbPath);

try {
  const db = new Database(dbPath, { readonly: true });
  
  // Check if database exists and has tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('📋 Tablas encontradas:', tables.map(t => t.name));
  
  // Check experiences
  const experiencias = db.prepare("SELECT COUNT(*) as total FROM experiencias").get();
  console.log('📊 Total experiencias:', experiencias.total);
  
  if (experiencias.total > 0) {
    const sample = db.prepare("SELECT * FROM experiencias LIMIT 3").all();
    console.log('🔍 Muestra de experiencias:');
    sample.forEach((exp, i) => {
      console.log(`${i+1}. ${exp.nombre} - ${exp.descripcion?.substring(0, 50)}...`);
      console.log(`   Precio: ${exp.precio}, Duración: ${exp.duracion_horas}h`);
    });
  }
  
  db.close();
} catch (error) {
  console.error('❌ Error:', error.message);
}
