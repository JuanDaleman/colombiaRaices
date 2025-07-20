// Check database structure and existing data
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'main/database/colombia_raices.db');

console.log('🔍 Checking database structure and data...');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  
  console.log('✅ Connected to database');
  
  // Check if experiences table exists
  db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='experiences'", [], (err, tables) => {
    if (err) {
      console.error('❌ Error checking tables:', err);
      return;
    }
    
    console.log('📊 Tables found:', tables.length);
    
    if (tables.length > 0) {
      // Check existing experiences
      db.all("SELECT id, title, is_active, operator_id FROM experiences ORDER BY created_at DESC", [], (err, experiences) => {
        if (err) {
          console.error('❌ Error getting experiences:', err);
          return;
        }
        
        console.log('📋 Total experiences:', experiences.length);
        
        if (experiences.length > 0) {
          console.log('🔍 Sample experiences:');
          experiences.slice(0, 5).forEach(exp => {
            console.log(`   - ID: ${exp.id}, Title: ${exp.title}, Active: ${exp.is_active}, Operator: ${exp.operator_id}`);
          });
          
          // Check pending experiences
          const pendingCount = experiences.filter(exp => exp.is_active === 0).length;
          console.log(`⏳ Pending experiences: ${pendingCount}`);
          
          if (pendingCount > 0) {
            console.log('🎯 Pending experiences:');
            experiences.filter(exp => exp.is_active === 0).forEach(exp => {
              console.log(`   - ID: ${exp.id}, Title: ${exp.title}, Operator: ${exp.operator_id}`);
            });
          }
        }
        
        // Check users table
        db.all("SELECT id, name, email, user_type FROM users WHERE user_type = 'operador'", [], (err, operators) => {
          if (err) {
            console.error('❌ Error getting operators:', err);
            return;
          }
          
          console.log('👥 Operators found:', operators.length);
          if (operators.length > 0) {
            console.log('👤 Sample operators:');
            operators.forEach(op => {
              console.log(`   - ID: ${op.id}, Name: ${op.name}, Email: ${op.email}`);
            });
          }
          
          db.close();
          console.log('✅ Database check completed!');
        });
      });
    } else {
      console.log('❌ No experiences table found');
      db.close();
    }
  });
});
