
async function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  return data;
}

export { fetchCountries };
