// Sprint 6 Integration Test - Authentication Flow
// Test: "Usuario puede registrarse e iniciar sesión correctamente"

const { test, expect } = require('@playwright/test');

describe('Sprint 6 - Authentication Flow', () => {
  const testUrl = 'http://localhost:3009';
  
  test.describe('User Registration with User Type Selection', () => {
    test('should register a new traveler user', async ({ page }) => {
      // Navigate to registration page
      await page.goto(`${testUrl}/register`);
      
      // Fill registration form
      await page.fill('input[name="name"]', 'Juan Viajero');
      await page.fill('input[name="email"]', 'juan@viajero.com');
      await page.fill('input[name="password"]', 'SecurePass123!');
      await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
      
      // Select user type as traveler
      await page.selectOption('select[name="userType"]', 'viajero');
      
      // Submit registration
      await page.click('button[type="submit"]');
      
      // Should redirect to traveler dashboard
      await expect(page).toHaveURL(`${testUrl}/traveler-dashboard`);
      
      // Verify dashboard content
      await expect(page.locator('h1')).toContainText('Panel de Viajero');
      await expect(page.locator('text=Buscar Experiencias')).toBeVisible();
      await expect(page.locator('text=Mis Reservas')).toBeVisible();
    });
    
    test('should register a new operator user', async ({ page }) => {
      // Navigate to registration page
      await page.goto(`${testUrl}/register`);
      
      // Fill registration form
      await page.fill('input[name="name"]', 'María Operadora');
      await page.fill('input[name="email"]', 'maria@operador.com');
      await page.fill('input[name="password"]', 'SecurePass123!');
      await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
      
      // Select user type as operator
      await page.selectOption('select[name="userType"]', 'operador');
      
      // Submit registration
      await page.click('button[type="submit"]');
      
      // Should redirect to operator dashboard
      await expect(page).toHaveURL(`${testUrl}/operator-dashboard`);
      
      // Verify dashboard content
      await expect(page.locator('h1')).toContainText('Panel de Operador');
      await expect(page.locator('text=Publicar Experiencia')).toBeVisible();
      await expect(page.locator('text=Mis Experiencias')).toBeVisible();
    });
  });
  
  test.describe('User Login with Dashboard Redirection', () => {
    test('should login traveler and redirect to traveler dashboard', async ({ page }) => {
      // Navigate to login page
      await page.goto(`${testUrl}/login`);
      
      // Fill login form
      await page.fill('input[name="email"]', 'viajero@test.com');
      await page.fill('input[name="password"]', 'password123');
      
      // Submit login
      await page.click('button[type="submit"]');
      
      // Should redirect to traveler dashboard
      await expect(page).toHaveURL(`${testUrl}/traveler-dashboard`);
      
      // Verify dashboard content
      await expect(page.locator('h1')).toContainText('Panel de Viajero');
    });
    
    test('should login operator and redirect to operator dashboard', async ({ page }) => {
      // Navigate to login page
      await page.goto(`${testUrl}/login`);
      
      // Fill login form
      await page.fill('input[name="email"]', 'operador@test.com');
      await page.fill('input[name="password"]', 'password123');
      
      // Submit login
      await page.click('button[type="submit"]');
      
      // Should redirect to operator dashboard
      await expect(page).toHaveURL(`${testUrl}/operator-dashboard`);
      
      // Verify dashboard content
      await expect(page.locator('h1')).toContainText('Panel de Operador');
    });
  });
  
  test.describe('Form Validation', () => {
    test('should validate user type selection in registration', async ({ page }) => {
      await page.goto(`${testUrl}/register`);
      
      // Fill partial form without user type
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'SecurePass123!');
      await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
      
      // Submit without selecting user type
      await page.click('button[type="submit"]');
      
      // Should show validation error
      await expect(page.locator('text=Selecciona el tipo de usuario')).toBeVisible();
    });
    
    test('should validate required fields in login', async ({ page }) => {
      await page.goto(`${testUrl}/login`);
      
      // Submit empty form
      await page.click('button[type="submit"]');
      
      // Should show validation errors
      await expect(page.locator('text=El email es requerido')).toBeVisible();
      await expect(page.locator('text=La contraseña es requerida')).toBeVisible();
    });
  });
  
  test.describe('Navigation Flow', () => {
    test('should navigate between login and register pages', async ({ page }) => {
      // Start at home
      await page.goto(testUrl);
      
      // Click login button
      await page.click('button:has-text("Iniciar Sesión")');
      await expect(page).toHaveURL(`${testUrl}/login`);
      
      // Click register link
      await page.click('text=Regístrate aquí');
      await expect(page).toHaveURL(`${testUrl}/register`);
      
      // Click back to login
      await page.click('text=Inicia sesión aquí');
      await expect(page).toHaveURL(`${testUrl}/login`);
    });
  });
  
  test.describe('Dashboard Features', () => {
    test('should display traveler dashboard sections', async ({ page }) => {
      await page.goto(`${testUrl}/traveler-dashboard`);
      
      // Verify all traveler sections are present
      await expect(page.locator('text=Buscar Experiencias')).toBeVisible();
      await expect(page.locator('text=Mis Reservas')).toBeVisible();
      await expect(page.locator('text=Explorar Comunidades')).toBeVisible();
      await expect(page.locator('text=Mi Perfil')).toBeVisible();
      
      // Verify logout button works
      await page.click('button:has-text("Cerrar Sesión")');
      await expect(page).toHaveURL(testUrl);
    });
    
    test('should display operator dashboard sections', async ({ page }) => {
      await page.goto(`${testUrl}/operator-dashboard`);
      
      // Verify all operator sections are present
      await expect(page.locator('text=Publicar Experiencia')).toBeVisible();
      await expect(page.locator('text=Mis Experiencias')).toBeVisible();
      await expect(page.locator('text=Reservas Recibidas')).toBeVisible();
      await expect(page.locator('text=Perfil de la Comunidad')).toBeVisible();
      
      // Verify logout button works
      await page.click('button:has-text("Cerrar Sesión")');
      await expect(page).toHaveURL(testUrl);
    });
  });
});
