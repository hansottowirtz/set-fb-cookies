// From https://gist.github.com/Robert-96/9b228156dda87c1b314bfe4790a7b45a
export const getUspByName = (name: string) => {
  const url = window.location.search;
  name = name.replace(/[\[\]]/g, "\\$&");

  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2]);
};
