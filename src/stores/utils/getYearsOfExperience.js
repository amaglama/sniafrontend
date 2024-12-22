function getDates(experiences, fieldName){
    const fields = [];
    for (let experience of experiences){
        fields.push(experience[fieldName]);
    }
    return fields;
}

const mergePeriods = (intervals) => {
    if (intervals.length === 0) return [];
    intervals.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    const merged = [];
    let currentInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
      const [start, end] = intervals[i];
      const currentEnd = new Date(currentInterval[1]);
      if (new Date(start) <= currentEnd) {
        currentInterval[1] = new Date(Math.max(currentEnd, new Date(end))).toISOString().split('T')[0];
      } else {
        merged.push(currentInterval);
        currentInterval = [start, end];
      }
    }
    merged.push(currentInterval);
    return merged;
};

const calculateTotalPeriod = (mergedPeriods) => {
    let totalYears = 0;
    let totalMonths = 0;
    let totalDays = 0;
    if (mergedPeriods.length === 0) return { years: totalYears, months: totalMonths, days: totalDays };
    mergedPeriods.forEach(([start, end]) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      let days = endDate.getDate() - startDate.getDate();
      if (days < 0) {
        months -= 1;
        days += new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      totalYears += years;
      totalMonths += months;
      totalDays += days;
      if (totalDays >= 30) {
        totalMonths += Math.floor(totalDays / 30);
        totalDays %= 30;
      }
      if (totalMonths >= 12) {
        totalYears += Math.floor(totalMonths / 12);
        totalMonths %= 12;
      }
    });
    return { years: totalYears, months: totalMonths, days: totalDays };
};

export default function getYearsOfExperience(experiences){
    //Only dates that init is less than end
    const experiencesApproved = experiences.filter(e => e["start_date"] < e["end_date"]);
    const initDates = getDates(experiencesApproved, "start_date");
    const endDates = getDates(experiencesApproved, "end_date");
    const periods = initDates.map((value, index) => [value, endDates[index]]);
    const mergedPeriods = mergePeriods(periods);
    const totalPeriod = calculateTotalPeriod(mergedPeriods);
    console.log(totalPeriod);
    return totalPeriod;

}


  

  
  
