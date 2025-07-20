const db = require('./main/database/Database');
const bcrypt = require('bcryptjs');

async function updateAdminPassword() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await db.connect();
    console.log('✅ Conexión establecida');
    
    // Verificar usuario admin existente
    console.log('🔍 Verificando usuario admin existente...');
    const admin = await db.get('SELECT * FROM users WHERE email = ?', ['admin@colombiaraices.com']);
    
    if (!admin) {
      console.log('❌ Usuario admin no encontrado');
      return;
    }
    
    console.log('✅ Usuario admin encontrado:');
    console.log(`   - ID: ${admin.id}`);
    console.log(`   - Email: ${admin.email}`);
    console.log(`   - Name: ${admin.name}`);
    
    // Crear nueva contraseña hasheada
    const newPassword = 'admin123';
    const saltRounds = 10;
    console.log('🔐 Generando nuevo hash de contraseña...');
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    console.log('✅ Nuevo hash generado, longitud:', newPasswordHash.length);
    
    // Actualizar contraseña
    console.log('💾 Actualizando contraseña en base de datos...');
    const result = await db.run(`
      UPDATE users 
      SET password_hash = ?, updated_at = ?
      WHERE email = ?
    `, [
      newPasswordHash,
      new Date().toISOString(),
      'admin@colombiaraices.com'
    ]);
    
    console.log('✅ Contraseña actualizada exitosamente:', result.changes, 'filas afectadas');
    
    // Verificar la nueva contraseña
    console.log('🔍 Verificando nueva contraseña...');
    const updatedAdmin = await db.get('SELECT * FROM users WHERE email = ?', ['admin@colombiaraices.com']);
    
    const isValidPassword = await bcrypt.compare('admin123', updatedAdmin.password_hash);
    console.log('   - Password Check:', isValidPassword ? '✅ Válida' : '❌ Inválida');
    
    console.log('');
    console.log('🔑 Credenciales de acceso actualizadas:');
    console.log('   Email: admin@colombiaraices.com');
    console.log('   Password: admin123');
    console.log('   User Type: admin');
    
    await db.close();
    console.log('📄 Conexión cerrada');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

updateAdminPassword();
