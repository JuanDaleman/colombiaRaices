const db = require('./main/database/Database');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await db.connect();
    console.log('✅ Conexión establecida');
    
    // Verificar si ya existe un admin
    console.log('🔍 Verificando si existe usuario admin...');
    const existingAdmin = await db.get(
      "SELECT * FROM users WHERE user_type = 'admin' LIMIT 1"
    );
    
    if (existingAdmin) {
      console.log('✅ Usuario admin ya existe:');
      console.log(`   - Email: ${existingAdmin.email}`);
      console.log(`   - ID: ${existingAdmin.id}`);
      console.log(`   - Estado: ${existingAdmin.is_active ? 'Activo' : 'Inactivo'}`);
      await db.close();
      return;
    }
    
    console.log('➕ Creando usuario admin...');
    
    // Crear contraseña hasheada
    const password = 'admin123'; // Contraseña temporal
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
    console.log(`   - Contraseña: admin123`);
    console.log(`   - Tipo: admin`);
    console.log('');
    console.log('🔑 Credenciales de acceso:');
    console.log('   Email: admin@colombiaraices.com');
    console.log('   Password: admin123');
    
    await db.close();
    console.log('📄 Conexión cerrada');
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error.message);
    console.error('Stack:', error.stack);
  }
}

createAdminUser();
