/**
 * Validates the carbon calculator inputs and returns an object of errors.
 * If all inputs are valid, returns an empty object.
 */


/**
 * Validates all calculator inputs against accepted limits.
 * Ensures realistic values before carbon calculations.
 *
 * @param {Object} inputs User calculator inputs
 * @returns {Object} Validation errors keyed by field name
 */

export function validateInputs(inputs) {
  const errors = {}

  if (!inputs) return errors

  // 1. Transportation Distance
  const distance = inputs.transportation?.distancePerDay
  if (distance === '' || distance === undefined || distance === null) {
    errors.distancePerDay = 'Distance is required'
  } else {
    const numDistance = Number(distance)
    if (isNaN(numDistance)) {
      errors.distancePerDay = 'Must be a valid number'
    } else if (numDistance < 0) {
      errors.distancePerDay = 'Distance cannot be negative'
    } else if (numDistance > 500) {
      errors.distancePerDay = 'Distance cannot exceed 500 km/day'
    }
  }

  // 2. Transportation Days
  const days = inputs.transportation?.daysPerWeek
  if (days === '' || days === undefined || days === null) {
    errors.daysPerWeek = 'Days per week is required'
  } else {
    const numDays = Number(days)
    if (isNaN(numDays)) {
      errors.daysPerWeek = 'Must be a valid number'
    } else if (numDays < 0) {
      errors.daysPerWeek = 'Days cannot be negative'
    } else if (numDays > 7) {
      errors.daysPerWeek = 'Days cannot exceed 7 per week'
    } else if (!Number.isInteger(numDays)) {
      errors.daysPerWeek = 'Days must be a whole number'
    }
  }

  // 3. Energy Monthly Electricity
  const electricity = inputs.energy?.monthlyElectricity
  if (electricity === '' || electricity === undefined || electricity === null) {
    errors.monthlyElectricity = 'Electricity usage is required'
  } else {
    const numElec = Number(electricity)
    if (isNaN(numElec)) {
      errors.monthlyElectricity = 'Must be a valid number'
    } else if (numElec < 0) {
      errors.monthlyElectricity = 'Usage cannot be negative'
    } else if (numElec > 5000) {
      errors.monthlyElectricity = 'Usage cannot exceed 5,000 kWh'
    }
  }

  // 4. Energy AC Hours per Day
  const acHours = inputs.energy?.acHoursPerDay
  if (acHours === '' || acHours === undefined || acHours === null) {
    errors.acHoursPerDay = 'AC usage hours is required'
  } else {
    const numAc = Number(acHours)
    if (isNaN(numAc)) {
      errors.acHoursPerDay = 'Must be a valid number'
    } else if (numAc < 0) {
      errors.acHoursPerDay = 'Hours cannot be negative'
    } else if (numAc > 24) {
      errors.acHoursPerDay = 'Hours cannot exceed 24 hours/day'
    }
  }

  // 5. Energy Household Size
  const householdSize = inputs.energy?.householdSize
  if (householdSize === '' || householdSize === undefined || householdSize === null) {
    errors.householdSize = 'Household size is required'
  } else {
    const numSize = Number(householdSize)
    if (isNaN(numSize)) {
      errors.householdSize = 'Must be a valid number'
    } else if (numSize < 1) {
      errors.householdSize = 'Household size must be at least 1'
    } else if (numSize > 20) {
      errors.householdSize = 'Household size cannot exceed 20'
    } else if (!Number.isInteger(numSize)) {
      errors.householdSize = 'Size must be a whole number'
    }
  }

  return errors
}
