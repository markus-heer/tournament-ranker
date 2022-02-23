interface WithName {
  name: string;
}

export const sortByName = (a: WithName, b: WithName) => a.name.localeCompare(b.name);
