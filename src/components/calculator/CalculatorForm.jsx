import { Car, Utensils, Zap, Trash2, ShoppingBag } from 'lucide-react'
import GlassCard from '../ui/GlassCard'
import {
  TRANSPORT_MODES,
  FOOD_DIETS,
  WASTE_FACTORS,
  SHOPPING_FACTORS,
} from '../../data/emissionFactors'

function FormSection({ icon: Icon, title, children }) {
  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <div className="p-2 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)]">
          <Icon className="w-5 h-5 text-[var(--brand-primary)]" aria-hidden="true" />
        </div>
        <h3 className="heading-lg">{title}</h3>
      </div>
      {children}
    </GlassCard>
  )
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="label block mb-1.5">
      {children}
    </label>
  )
}

function Select({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-base appearance-none cursor-pointer"
    >
      {options.map(([val, label]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  )
}

function NumberInput({ id, value, onChange, min = 0, max = 10000, step = 1, unit }) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={`input-base ${unit ? 'pr-14' : ''}`}
        aria-describedby={unit ? `${id}-unit` : undefined}
      />
      {unit && (
        <span
          id={`${id}-unit`}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted pointer-events-none"
        >
          {unit}
        </span>
      )}
    </div>
  )
}

export default function CalculatorForm({ inputs, onUpdate }) {
  const t = inputs.transportation
  const f = inputs.food
  const e = inputs.energy
  const w = inputs.waste
  const s = inputs.shopping

  return (
    <div className="space-y-4 sm:space-y-6">
      <FormSection icon={Car} title="Transportation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="transport-mode">Primary Mode</Label>
            <Select
              id="transport-mode"
              value={t.mode}
              onChange={(v) => onUpdate('transportation', { mode: v })}
              options={Object.entries(TRANSPORT_MODES).map(([k, v]) => [k, v.label])}
            />
          </div>
          <div>
            <Label htmlFor="transport-distance">Distance per Day</Label>
            <NumberInput
              id="transport-distance"
              value={t.distancePerDay}
              onChange={(v) => onUpdate('transportation', { distancePerDay: v })}
              unit="km"
            />
          </div>
          <div>
            <Label htmlFor="transport-days">Days per Week</Label>
            <NumberInput
              id="transport-days"
              value={t.daysPerWeek}
              onChange={(v) => onUpdate('transportation', { daysPerWeek: v })}
              min={0}
              max={7}
              unit="days"
            />
          </div>
        </div>
      </FormSection>

      <FormSection icon={Utensils} title="Food Habits">
        <div>
          <Label htmlFor="food-diet">Diet Type</Label>
          <Select
            id="food-diet"
            value={f.diet}
            onChange={(v) => onUpdate('food', { diet: v })}
            options={Object.entries(FOOD_DIETS).map(([k, v]) => [k, v.label])}
          />
        </div>
      </FormSection>

      <FormSection icon={Zap} title="Energy Consumption">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="energy-electricity">Monthly Electricity</Label>
            <NumberInput
              id="energy-electricity"
              value={e.monthlyElectricity}
              onChange={(v) => onUpdate('energy', { monthlyElectricity: v })}
              unit="kWh"
            />
          </div>
          <div>
            <Label htmlFor="energy-ac">AC Usage per Day</Label>
            <NumberInput
              id="energy-ac"
              value={e.acHoursPerDay}
              onChange={(v) => onUpdate('energy', { acHoursPerDay: v })}
              unit="hrs"
            />
          </div>
          <div>
            <Label htmlFor="energy-household">Household Size</Label>
            <NumberInput
              id="energy-household"
              value={e.householdSize}
              onChange={(v) => onUpdate('energy', { householdSize: v })}
              min={1}
              max={20}
              unit="people"
            />
          </div>
        </div>
      </FormSection>

      <FormSection icon={Trash2} title="Waste Management">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="waste-recycling">Recycling Frequency</Label>
            <Select
              id="waste-recycling"
              value={w.recycling}
              onChange={(v) => onUpdate('waste', { recycling: v })}
              options={Object.entries(WASTE_FACTORS.recycling).map(([k, v]) => [k, v.label])}
            />
          </div>
          <div>
            <Label htmlFor="waste-plastic">Plastic Usage</Label>
            <Select
              id="waste-plastic"
              value={w.plastic}
              onChange={(v) => onUpdate('waste', { plastic: v })}
              options={Object.entries(WASTE_FACTORS.plastic).map(([k, v]) => [k, v.label])}
            />
          </div>
          <div>
            <Label htmlFor="waste-compost">Composting</Label>
            <Select
              id="waste-compost"
              value={w.composting}
              onChange={(v) => onUpdate('waste', { composting: v })}
              options={Object.entries(WASTE_FACTORS.composting).map(([k, v]) => [k, v.label])}
            />
          </div>
        </div>
      </FormSection>

      <FormSection icon={ShoppingBag} title="Shopping Habits">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shop-clothing">Clothing Purchases</Label>
            <Select
              id="shop-clothing"
              value={s.clothing}
              onChange={(v) => onUpdate('shopping', { clothing: v })}
              options={Object.entries(SHOPPING_FACTORS.clothing).map(([k, v]) => [k, v.label])}
            />
          </div>
          <div>
            <Label htmlFor="shop-electronics">Electronics Purchases</Label>
            <Select
              id="shop-electronics"
              value={s.electronics}
              onChange={(v) => onUpdate('shopping', { electronics: v })}
              options={Object.entries(SHOPPING_FACTORS.electronics).map(([k, v]) => [k, v.label])}
            />
          </div>
        </div>
      </FormSection>
    </div>
  )
}
