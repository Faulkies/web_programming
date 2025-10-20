import { api } from "../apiClient";

export async function getSubGenreByName(genreName) {
  try {
    let res;

    switch (genreName) {
      case "Books":
        res = await api.get("/BookGenre");
        break;
      case "NewBookGenre":
        res = await api.get("/BookGenre new");
        break;
      case "Movies":
        res = await api.get("/MovieGenre");
        break;
      case "Games":
        res = await api.get("/GameGenre");
        break;
      default:
        return "Unknown";
    }


    const payload = res.data?.data ?? res.data;
    console.log("getSubGenreByName payload:", payload);
    return payload; 
  } catch (err) {
    console.error("getSubGenreByName failed:", err);
    throw err; 
  }
}
