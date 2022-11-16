export const nameShortener = (name: string) => {
  switch (name) {
    case "attack":
      return "ATK";
      break;
    case "defense":
      return "DEF";
      break;
    case "special-attack":
      return "SATK";
      break;
    case "special-defense":
      return "SDEF";
      break;
    case "speed":
      return "SPD";
      break;
    default:
      return "HP";
  }
};
