import { PRICING_PLANS } from '../../config/pricing/plans';
import { PlanCard } from './PlanCard';

export function PricingTable() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <PlanCard plan={PRICING_PLANS.FREE} />
        <PlanCard plan={PRICING_PLANS.PRO} highlighted />
      </div>
    </div>
  );
}