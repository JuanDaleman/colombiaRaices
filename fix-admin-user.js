const db = require('./main/database/Database');
const bcrypt = require('bcryptjs');

async function deleteAndRecreateAdmin() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await db.connect();
    console.log('✅ Conexión establecida');
    
    // Eliminar usuario admin existente
    console.log('🗑️ Eliminando usuario admin existente...');
    await db.run("DELETE FROM users WHERE email = 'admin@colombiaraices.com'");
    console.log('✅ Usuario admin eliminado');
    
    // Crear contraseña hasheada
    const password = 'admin123';
    const saltRounds = 10;
    console.log('🔐 Generando hash de contraseña...');
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Crear usuario admin
    console.log('💾 Insertando usuario en base de datos...');
    const result = await db.run(`
      INSERT INTO users (
        email, password_hash, name, 
        user_type, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'admin@colombiaraices.com',
      passwordHash,
      'Administrador Sistema',
      'admin',
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ]);
    
    console.log('✅ Usuario admin creado exitosamente:');
    console.log(`   - ID: ${result.id}`);
    console.log(`   - Email: admin@colombiaraices.com`);
    console.log(`   - Nombre: Administrador Sistema`);
    console.log(`   - Tipo: admin`);
    console.log(`   - Password Hash Length: ${passwordHash.length}`);
    console.log('');
    console.log('🔑 Credenciales de acceso:');
    console.log('   Email: admin@colombiaraices.com');
    console.log('   Password: admin123');
    
    await db.close();
    console.log('📄 Conexión cerrada');
    
    // Verificar con debug
    console.log('\n🔍 Verificando usuario creado...');
    const Database = require('better-sqlite3');
    const path = require('path');
    const dbPath = path.join(__dirname, 'main', 'database', 'colombia_raices.db');
    const directDb = new Database(dbPath);
    
    const admin = directDb.prepare('SELECT * FROM users WHERE email = ?').get('admin@colombiaraices.com');
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
    }
    
    directDb.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

deleteAndRecreateAdmin();
