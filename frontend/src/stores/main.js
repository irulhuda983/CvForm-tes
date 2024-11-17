import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('main', () => {
  const skills = ref([]);
  const months = ref([
    { val: 'Jan', text: 'January' },
    { val: 'Feb', text: 'February' },
    { val: 'Mar', text: 'March' },
    { val: 'Apr', text: 'April' },
    { val: 'May', text: 'May' },
    { val: 'Jun', text: 'June' },
    { val: 'Jul', text: 'July' },
    { val: 'Aug', text: 'August' },
    { val: 'Sep', text: 'September' },
    { val: 'Oct', text: 'October' },
    { val: 'Nov', text: 'November' },
    { val: 'Des', text: 'December' },
  ]);

  const years = ref([]);

  const getYears = () => {
    let year = [];
    for(let i = 1990; i <= 2030; i++){
      year.push({
        val: String(i),
        text: String(i)
      });
    }

    return year;
  }

  const getCountry = async () => {
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.min.json')

      console.log(data)

      return data;
    } catch (error) {
      console.log(error)
    }
  }

  return { skills, months, years, getYears, getCountry }
})