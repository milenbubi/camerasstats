import { IDashboardItem, IEntityVisit, IUniqueCounts } from "../../../Utils/models";


type EntityCount = Record<string, number>;

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


// Helper function to sort an array of IEntityVisit objects first by visits in descending order,
// and then by name in ascending order if the number of visits is the same
function sortByVisits(items: IEntityVisit[]): IEntityVisit[] {
  return items.sort((a, b) => {
    if (b.visits !== a.visits) {
      return b.visits - a.visits;
    }

    return a.name.localeCompare(b.name);
  });
}



export function transformDashboardItems(items: IDashboardItem[]) {
  const deviceCounts: EntityCount = {};
  const countryCounts: EntityCount = {};
  const cityCounts: EntityCount = {};
  const osCounts: EntityCount = {};
  const dayCounts: EntityCount = {};

  // Инициализация
  for (const day of dayNames) {
    dayCounts[day] = 0;
  }

  // Aggregate the number of visits per device, city, country, OS and day of week
  for (const item of items) {
    deviceCounts[item.device] = (deviceCounts[item.device] || 0) + 1;
    countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
    cityCounts[item.city] = (cityCounts[item.city] || 0) + 1;
    osCounts[item.os] = (osCounts[item.os] || 0) + 1;

    //Process week days
    const date = new Date(item.visitTime);
    const localDayIndex = date.getDay();
    // Convert JavaScript's getDay() result (0=Sunday, 1=Monday, ..., 6=Saturday)
    // into a "Monday-first" index where Monday = 0, Tuesday = 1, ..., Sunday = 6
    const mondayIndex = (localDayIndex + 6) % 7;
    const dayName = dayNames[mondayIndex];
    dayCounts[dayName] += 1;
  }




  // Transform the counts object into an array of IEntityVisit
  const devices: IEntityVisit[] = Object.entries(deviceCounts).map(
    ([name, visits]) => ({ name, visits })
  );

  const countries: IEntityVisit[] = Object.entries(countryCounts).map(
    ([name, visits]) => ({ name, visits })
  );

  const cities: IEntityVisit[] = Object.entries(cityCounts).map(
    ([name, visits]) => ({ name, visits })
  );

  const oses: IEntityVisit[] = Object.entries(osCounts).map(
    ([name, visits]) => ({ name, visits })
  );

  const daysOfWeek: IEntityVisit[] = Object.entries(dayCounts).map(
    ([name, visits]) => ({ name, visits })
  );


  // Compute unique counts for countries and cities
  const uniqueCountries = new Set(items.map(v => v.country)).size;
  const uniqueCities = new Set(items.map(v => v.city)).size;
  const uniqueOses = new Set(items.map(v => v.os)).size;

  const uniqueCounts: IUniqueCounts = {
    uniqueCountries,
    uniqueCities,
    uniqueOses
  };


  return {
    uniqueEntities: {
      devices: sortByVisits(devices),
      countries: sortByVisits(countries),
      cities: sortByVisits(cities),
      oses: sortByVisits(oses),
      daysOfWeek
    },
    uniqueCounts
  };
}