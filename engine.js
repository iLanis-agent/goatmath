/* GoatMath engine - pure functions, no DOM. Honest backyard goat math.
   Constants stated in the UI: never one goat, 200 sq ft outdoor and 18 sq ft
   shelter each, hay at 3.5% of body weight daily, 50 lb small square bales,
   lactation 305 days at 65% of peak, 4 ft woven-wire fence minimum. */
var GoatMath = (function () {
  function spaceSqft(goats) {
    return { outdoor: 200 * goats, shelter: 18 * goats };
  }
  function herdVerdict(goats) {
    if (goats < 2) return 'Never one goat - they are herd animals and a lonely goat screams, escapes and dies of stress. Start with two.';
    if (goats <= 3) return 'Two or three is the honest starter herd - enough company, small enough to learn on.';
    return 'A real herd - lovely, but the hay math and the fence better both be done first.';
  }
  function hayLbPerDay(bodyLb, pct) {
    return bodyLb * pct / 100;
  }
  function winterHay(goats, bodyLb, days, baleLb) {
    var totalLb = goats * hayLbPerDay(bodyLb, 3.5) * days;
    return { totalLb: totalLb, bales: totalLb / baleLb };
  }
  function hayVerdict(bales, storageSqft) {
    var need = bales * 4;
    if (storageSqft >= need) return 'Fits - about ' + Math.round(need) + ' sq ft of stack space for the winter hay.';
    return 'Will not fit - ' + Math.round(bales) + ' bales wants about ' + Math.round(need) + ' sq ft of dry stack space, you have ' + storageSqft + '. Buy in two loads.';
  }
  function milkGal(peakQtDay, lactationDays, avgFactor) {
    return peakQtDay * avgFactor * lactationDays / 4;
  }
  function milkVerdict(breed) {
    if (breed === 'nigerian') return 'Nigerian dwarf: a quart or two a day at best, but 6-10% butterfat - drinking cream, not filling buckets.';
    if (breed === 'saanen') return 'Saanen: the gallon-a-day workhorse - volume over richness, and a big appetite funding it.';
    return 'Nubian: the middle road - good volume, high butterfat, and an opinion about everything.';
  }
  function costPerGal(hayCost, grainCost, miscCost, gallons) {
    return (hayCost + grainCost + miscCost) / gallons;
  }
  function costVerdict(perGal) {
    if (perGal <= 5) return 'Under $5 a gallon - cheaper than store milk, before you price your mornings.';
    if (perGal <= 9) return 'Store-price parity - the milk is free if the goats were the point.';
    return 'Over $9 a gallon - this is a hobby with a milk dividend, not a dairy economy.';
  }
  function fenceVerdict(heightFt, type) {
    if (type !== 'woven' && type !== 'electric') return 'Goats laugh at ' + type + ' fencing - woven wire or multi-strand electric, or learn where they go.';
    if (heightFt < 4) return 'Under 4 ft is a suggestion, not a fence - a bored goat clears it.';
    if (heightFt <= 5) return 'Four to five feet of ' + type + ' is the standard - walk the line weekly anyway.';
    return 'Serious fence - now the weak point is the gate latch, and goats study latches.';
  }
  return {
    spaceSqft: spaceSqft, herdVerdict: herdVerdict, hayLbPerDay: hayLbPerDay, winterHay: winterHay, hayVerdict: hayVerdict,
    milkGal: milkGal, milkVerdict: milkVerdict, costPerGal: costPerGal, costVerdict: costVerdict, fenceVerdict: fenceVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = GoatMath;
