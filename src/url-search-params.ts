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
