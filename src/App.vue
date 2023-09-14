<template>
  <div>
	<input v-model="countryName"  @keydown.enter="searchCountry"/>
    <button @click="searchCountry">Search</button>
    <div v-if="hasResults()">
  <base-card>
  <ul>
      <li v-for="country in countries" :key="country.name.official" class="country_details">
        <h1>{{ country.name.common }} - {{ country.altSpellings[0] }}</h1>
        <div>
          <span>
            Official Name:
          </span>
          <span>
            {{ officialName(country) }}
          </span>
        </div>
        <div>
          <span>
            Coat Of Arms
          </span>
          <span>
            <img :src="country.coatOfArms.png" alt="Coat of Arms" />
          </span>
        </div>
        <div>
          <span>
            Capital
          </span>
          <span>
            <ul>
              <li v-for="capital in country.capital" :key="capital">
                {{ capital }}
              </li>
            </ul>
          </span>
        </div>  
        <div>
          <span>
            Borders
          </span>
          <span>
            <ul>
              <li v-for="border in country.borders" :key="border">
              {{ border }}
              </li>
            </ul>
          </span>
        </div>
        <div>
          <span>
            Population
          </span>
          <span>
            {{ country.population }}
          </span>
        </div>
        <div>
          <span>
            Currency
          </span>
          <span>
            {{ country.currencies[Object.keys(country.currencies)[0]].name }} {{ country.currencies[Object.keys(country.currencies)[0]].symbol }}
          </span>
        </div>
        <div>
          <span>
            Flag
          </span>
          <span>
            <img :src="country.flags.png" alt="Flag" />
          </span>
        </div>
        <div>
          <span>
            Language
          </span>
          <span>
            {{ getLanguages(country.languages) }}
          </span>
        </div>
        <div>
          <span>
            Map
          </span>
          <span>
            <a :href="country.maps.googleMaps" target="_blank">Open Google Map</a>
          </span>
        </div>
        <div>
          <span>
            Calling Code
          </span>
          <span>
            : {{ country.idd.root + country.idd.suffixes }}
          </span>
        </div>
      </li>
    </ul>
</base-card>
  </div>
    <div v-else>
        {{ countryName }} not found.
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: [],
      countryName: '',
      results:true,
    };
  },
  methods: {
    fetchCountryData() {
      axios.get(`https://restcountries.com/v3.1/name/${this.countryName}`)
      .then((response) => {
        this.countries = response.data;
        console.log(this.countries);
        this.results = true;
      })
      .catch((error) => {
          console.error('Error fetching country data:', error);
          this.results = false;
      });
    },
    getLanguages(languages) {
      return Object.values(languages).join(", ");
    },
    officialName(country) {
      const altSpellings = country.altSpellings;
      return altSpellings[altSpellings.length - 1];
    },
    searchCountry() {
      this.fetchCountryData();
    },
    hasResults(){
      return this.results;
    }
  },
};
</script>

<style scoped>
img {
  max-width:100px;
}
</style>