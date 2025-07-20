const db = require('./main/database/Database');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await db.connect();
    console.log('✅ Conexión establecida');
    
    // Eliminar usuario admin existente
    console.log('🗑️ Eliminando usuario admin existente...');
    try {
      await db.run("DELETE FROM users WHERE email = 'admin@colombiaraices.com'");
      console.log('✅ Usuarios admin eliminados');
    } catch (err) {
      console.log('ℹ️ No había usuarios admin existentes');
    }
    
    // Crear contraseña hasheada
    const password = 'admin123';
    const saltRounds = 10;
    console.log('🔐 Generando hash de contraseña...');
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log('✅ Hash generado, longitud:', passwordHash.length);
    
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
    console.log('');
    
    // Verificar el usuario creado
    console.log('🔍 Verificando usuario creado...');
    const admin = await db.get('SELECT * FROM users WHERE email = ?', ['admin@colombiaraices.com']);
    
    if (admin) {
      console.log('✅ Usuario admin encontrado:');
      console.log('   - ID:', admin.id);
      console.log('   - Email:', admin.email);
      console.log('   - Name:', admin.name);
      console.log('   - User Type:', admin.user_type);
      console.log('   - Is Active:', admin.is_active);
      console.log('   - Password Hash:', admin.password_hash ? 'Exists' : 'Missing');
      
      // Verificar contraseña
      const isValidPassword = await bcrypt.compare('admin123', admin.password_hash);
      console.log('   - Password Check:', isValidPassword ? '✅ Válida' : '❌ Inválida');
      
      console.log('');
      console.log('🔑 Credenciales de acceso:');
      console.log('   Email: admin@colombiaraices.com');
      console.log('   Password: admin123');
    } else {
      console.log('❌ Usuario admin no encontrado después de la inserción');
    }
    
    await db.close();
    console.log('📄 Conexión cerrada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

createAdminUser();
