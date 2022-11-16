interface Props {
  name: string;
  url: string;
}
export const mapToArray = (object: Props[]) => {
  const array = [];
  for (const elem in object) {
    array.push({
      ...object[elem],
      id: object[elem].url.substring(34, object[elem].url.length - 1),
      avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${object[
        elem
      ].url.substring(34, object[elem].url.length - 1)}.svg`,
    });
  }
  return array;
};
