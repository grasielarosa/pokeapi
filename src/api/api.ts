import { mapToArray } from "./../utils/mapToArray";
import { pokeApi } from "../utils/axios";

export const getPokemons = async () => {
  try {
    const response = await pokeApi.get("pokemon/");
    return mapToArray(response.data.results);
  } catch (err) {
    throw new Error();
  }
};

// export const getPokeInfo = async (pokemon: string) => {
//   try {
//     const response = await pokeApi.get(`pokemon/${pokemon}`);
//     return response.data;
//   } catch (err) {
//     throw new Error();
//   }
// };
