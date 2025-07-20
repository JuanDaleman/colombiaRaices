// Sprint 10 Task 8: Integration Tests for Reservation System
// Simplified integration tests that focus on the core functionality

const ReservationService = require('../../main/services/ReservationService');
const ReservationController = require('../../main/controllers/ReservationController');
const testDb = require('../helpers/testSetup');

describe('Reservation System - Integration Tests (Simplified)', () => {
  let reservationService;
  let reservationController;

  beforeEach(() => {
    // Initialize services
    reservationService = new ReservationService();
    reservationController = new ReservationController();
  });

  // ============================================
  // 1. BASIC WORKFLOW INTEGRATION TESTS
  // ============================================

  describe('Basic Reservation Workflow', () => {
    it('should validate reservation data through controller', async () => {
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
      expect(result.validation.errors).toHaveLength(0);
    });

    it('should check availability through controller', async () => {
      const result = await reservationController.validateAvailability(1, '2025-08-15', 4);
      
      expect(result.success).toBe(true);
      expect(result.availability.isAvailable).toBe(true);
      expect(result.availability.availableSpots).toBeGreaterThan(0);
    });

    it('should calculate reservation estimate through controller', async () => {
      const reservationData = {
        experience: { id: 1, price: 100000 },
        participants: 3,
        additional_services: ['guide', 'transport']
      };

      const result = await reservationController.calculateReservationEstimate(reservationData);
      
      expect(result.success).toBe(true);
      expect(result.estimate.basePrice).toBe(100000);
      expect(result.estimate.participants).toBe(3);
      expect(result.estimate.additionalServicesCost).toBeGreaterThan(0);
      expect(result.estimate.finalTotal).toBeGreaterThan(300000);
    });

    it('should create reservation estimate through controller', async () => {
      const reservationData = {
        experience_id: 1,
        user_id: 1,
        reservation_date: '2025-08-20',
        participants: 2,
        additional_services: ['guide']
      };

      const result = await reservationController.createReservationEstimate(reservationData);
      
      expect(result.success).toBe(true);
      expect(result.reservation.experience_id).toBe(1);
      expect(result.reservation.user_id).toBe(1);
      expect(result.reservation.participants).toBe(2);
      expect(result.reservation.total_price).toBeGreaterThan(0);
    });
  });

  // ============================================
  // 2. PRICING INTEGRATION TESTS
  // ============================================

  describe('Pricing Integration', () => {
    it('should calculate service prices correctly', async () => {
      const guidePrice = await reservationController.calculateServicePrice('guide', 100000);
      expect(guidePrice.success).toBe(true);
      expect(guidePrice.price).toBe(20000);

      const transportPrice = await reservationController.calculateServicePrice('transport', 100000);
      expect(transportPrice.success).toBe(true);
      expect(transportPrice.price).toBe(15000);
    });

    it('should calculate additional services correctly', async () => {
      const result = await reservationController.calculateAdditionalServices(
        ['guide', 'transport'],
        100000
      );
      
      expect(result.success).toBe(true);
      expect(result.servicesInfo.totalAdditionalCost).toBe(35000);
      expect(result.servicesInfo.services).toHaveLength(2);
    });

    it('should handle group discounts in estimates', async () => {
      const reservationData = {
        experience: { id: 1, price: 100000 },
        participants: 12, // Should trigger group discount
        additional_services: []
      };

      const result = await reservationController.calculateReservationEstimate(reservationData);
      
      expect(result.success).toBe(true);
      expect(result.estimate.participants).toBe(12);
      expect(result.estimate.discountPercentage).toBe(10); // 10% discount for 10+ people
      expect(result.estimate.discountAmount).toBeGreaterThan(0);
    });
  });

  // ============================================
  // 3. ERROR HANDLING INTEGRATION TESTS
  // ============================================

  describe('Error Handling Integration', () => {
    it('should handle invalid data gracefully', async () => {
      const invalidData = {
        experience_id: 'invalid',
        user_id: null,
        reservation_date: 'invalid-date',
        participants: -1
      };

      const result = await reservationController.validateReservationData(invalidData);
      
      expect(result.success).toBe(true);
      expect(result.validation.isValid).toBe(false);
      expect(result.validation.errors.length).toBeGreaterThan(0);
    });

    it('should handle non-existent experience gracefully', async () => {
      const result = await reservationController.validateAvailability(99999, '2025-08-15', 2);
      
      expect(result.success).toBe(true);
      expect(result.availability.isAvailable).toBe(false);
      expect(result.availability.errors).toContain('Experience not found');
    });

    it('should handle past dates gracefully', async () => {
      const reservationData = {
        experience_id: 1,
        user_id: 1,
        reservation_date: '2024-01-01',
        participants: 2,
        additional_services: []
      };

      const result = await reservationController.createReservationEstimate(reservationData);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('future');
    });
  });

  // ============================================
  // 4. SERVICE LAYER INTEGRATION TESTS
  // ============================================

  describe('Service Layer Integration', () => {
    it('should integrate ReservationService with ExperienceService', async () => {
      // Test that ReservationService correctly uses ExperienceService for calculations
      const experienceId = 1;
      const date = '2025-08-25';
      const participants = 5;

      const result = await reservationService.validateAvailability(experienceId, date, participants);
      
      expect(result.isAvailable).toBe(true);
      expect(result.maxCapacity).toBe(10);
      expect(result.availableSpots).toBe(10);
    });

    it('should integrate pricing calculations across services', async () => {
      const basePrice = 100000;
      const services = ['guide', 'transport', 'food'];

      const result = reservationService.calculateAdditionalServices(services, basePrice);
      
      expect(result.totalAdditionalCost).toBe(45000); // 20% + 15% + 10% = 45%
      expect(result.services).toHaveLength(3);
    });
  });

  // ============================================
  // 5. CONTROLLER-SERVICE INTEGRATION TESTS
  // ============================================

  describe('Controller-Service Integration', () => {    it('should maintain data consistency between controller and service', async () => {
      const reservationData = {
        experience: { id: 1, price: 100000 },
        participants: 8,
        additional_services: ['guide']
      };

      // Test controller calculation
      const controllerResult = await reservationController.calculateReservationEstimate(reservationData);
      
      // Test service calculation directly (now async)
      const serviceResult = await reservationService.calculateReservationEstimate(reservationData);
      
      expect(controllerResult.success).toBe(true);
      expect(controllerResult.estimate.basePrice).toBe(serviceResult.basePrice);
      expect(controllerResult.estimate.participants).toBe(serviceResult.participants);
      expect(controllerResult.estimate.finalTotal).toBe(serviceResult.finalTotal);
    });

    it('should handle errors consistently between controller and service', async () => {
      const invalidData = {
        experience: null,
        participants: 0,
        additional_services: []
      };

      // Test controller error handling
      const controllerResult = await reservationController.calculateReservationEstimate(invalidData);
      
      expect(controllerResult.success).toBe(false);
      expect(controllerResult.error).toBeDefined();
        // Test service error handling - now async
      await expect(async () => {
        await reservationService.calculateReservationEstimate(invalidData);
      }).rejects.toThrow();
    });
  });

  // ============================================
  // 6. COMPLETE WORKFLOW SIMULATION
  // ============================================

  describe('Complete Workflow Simulation', () => {
    it('should simulate a complete reservation process', async () => {
      // Step 1: Data validation
      const reservationData = {
        experience_id: 1,
        user_id: 1,
        reservation_date: '2025-09-01',
        participants: 4,
        additional_services: ['guide', 'transport']
      };

      const validation = await reservationController.validateReservationData(reservationData);
      expect(validation.success).toBe(true);
      expect(validation.validation.isValid).toBe(true);

      // Step 2: Availability check
      const availability = await reservationController.validateAvailability(
        reservationData.experience_id,
        reservationData.reservation_date,
        reservationData.participants
      );
      expect(availability.success).toBe(true);
      expect(availability.availability.isAvailable).toBe(true);      // Step 3: Price calculation - Fix data structure for optimized service
      const estimate = await reservationController.calculateReservationEstimate({
        experience_id: 1,
        experience: { id: 1, price: 100000 },
        participants: 4,
        additional_services: ['guide', 'transport']
      });
      expect(estimate.success).toBe(true);
      expect(estimate.estimate.finalTotal).toBeGreaterThan(0);

      // Step 4: Create reservation
      const creation = await reservationController.createReservationEstimate(reservationData);
      expect(creation.success).toBe(true);
      expect(creation.reservation.total_price).toBeGreaterThan(0);

      console.log('✅ Complete workflow simulation passed');
    });

    it('should handle multiple service combinations', async () => {
      const serviceCombinations = [
        [],
        ['guide'],
        ['guide', 'transport'],
        ['guide', 'transport', 'food'],
        ['guide', 'transport', 'food', 'equipment']
      ];

      for (const services of serviceCombinations) {
        const result = await reservationController.calculateAdditionalServices(services, 100000);
        
        expect(result.success).toBe(true);
        expect(result.servicesInfo.services).toHaveLength(services.length);
        
        if (services.length > 0) {
          expect(result.servicesInfo.totalAdditionalCost).toBeGreaterThan(0);
        }
      }

      console.log('✅ Multiple service combinations test passed');
    });
  });
});
