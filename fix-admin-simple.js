const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

console.log('🔍 Recreando usuario admin...');

// Conectar a la base de datos directamente
const dbPath = path.join(__dirname, 'data', 'colombia_raices.db');
const db = new Database(dbPath);

try {
  // Eliminar usuario admin existente
  console.log('🗑️ Eliminando usuario admin existente...');
  const deleteResult = db.prepare("DELETE FROM users WHERE email = 'admin@colombiaraices.com'").run();
  console.log('✅ Usuarios eliminados:', deleteResult.changes);
  
  // Crear contraseña hasheada
  const password = 'admin123';
  const saltRounds = 10;
  console.log('🔐 Generando hash de contraseña...');
  const passwordHash = bcrypt.hashSync(password, saltRounds);
  console.log('✅ Hash generado, longitud:', passwordHash.length);
  
  // Crear usuario admin
  console.log('💾 Insertando usuario en base de datos...');
  const insertResult = db.prepare(`
    INSERT INTO users (
      email, password_hash, name, 
      user_type, is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run([
    'admin@colombiaraices.com',
    passwordHash,
    'Administrador Sistema',
    'admin',
    1,
    new Date().toISOString(),
    new Date().toISOString()
  ]);
  
  console.log('✅ Usuario admin creado exitosamente:');
  console.log(`   - ID: ${insertResult.lastInsertRowid}`);
  console.log(`   - Email: admin@colombiaraices.com`);
  console.log(`   - Nombre: Administrador Sistema`);
  console.log(`   - Tipo: admin`);
  console.log('');
  
  // Verificar el usuario creado
  console.log('🔍 Verificando usuario creado...');
  const admin = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@colombiaraices.com');
  
  if (admin) {
    console.log('✅ Usuario admin encontrado:');
    console.log('   - ID:', admin.id);
    console.log('   - Email:', admin.email);
    console.log('   - Name:', admin.name);
    console.log('   - User Type:', admin.user_type);
    console.log('   - Is Active:', admin.is_active);
    console.log('   - Password Hash:', admin.password_hash ? 'Exists' : 'Missing');
    
    // Verificar contraseña
    const isValidPassword = bcrypt.compareSync('admin123', admin.password_hash);
    console.log('   - Password Check:', isValidPassword ? '✅ Válida' : '❌ Inválida');
    
    console.log('');
    console.log('🔑 Credenciales de acceso:');
    console.log('   Email: admin@colombiaraices.com');
    console.log('   Password: admin123');
  } else {
    console.log('❌ Usuario admin no encontrado después de la inserción');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
} finally {
  db.close();
  console.log('📄 Conexión cerrada');
}
