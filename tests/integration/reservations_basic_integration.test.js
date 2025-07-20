// Sprint 10 Task 8: Integration Tests for Reservation System
// Basic integration test to verify the workflow

const ReservationController = require('../../main/controllers/ReservationController');
const testDb = require('../helpers/testSetup');

describe('Reservation Integration Tests', () => {
  let reservationController;

  beforeEach(() => {
    reservationController = new ReservationController();
  });

  test('should complete basic reservation workflow', async () => {
    // Test basic workflow integration
    const validData = {
      experience_id: 1,
      user_id: 1,
      reservation_date: '2025-08-15',
      participants: 3,
      additional_services: ['guide']
    };

    const result = await reservationController.validateReservationData(validData);
    
    expect(result.success).toBe(true);
    expect(result.validation.isValid).toBe(true);
  });

  test('should handle pricing calculations integration', async () => {
    const result = await reservationController.calculateServicePrice('guide', 100000);
    
    expect(result.success).toBe(true);
    expect(result.price).toBe(20000);
  });
});
