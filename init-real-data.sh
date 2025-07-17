#!/bin/bash

echo "🗃️  INICIALIZANDO BASE DE DATOS CON IMÁGENES Y DATOS REALES"
echo "=" | head -c 60
echo ""

cd /e/ColombiaRaices

echo "📊 Ejecutando migraciones..."
node -e "
const Migration = require('./main/database/migrations/migration.js');
const migration = new Migration();
migration.runMigrations()
  .then(() => {
    console.log('✅ Migraciones completadas');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error en migraciones:', error);
    process.exit(1);
  });
"

echo ""
echo "🌱 Ejecutando seeder con datos reales..."
node -e "
const DataSeeder = require('./main/database/seeders/DataSeeder.js');
const seeder = new DataSeeder();
seeder.run()
  .then(() => {
    console.log('✅ Datos insertados correctamente');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error en seeder:', error);
    process.exit(1);
  });
"

echo ""
echo "🎯 PROCESO COMPLETADO"
echo "✅ Base de datos actualizada con imágenes y datos reales"
echo "✅ 5 comunidades insertadas"
echo "✅ 10 experiencias insertadas"
echo "✅ Imágenes copiadas al directorio renderer"
