// import axios from "axios"
import jsonData from "./data.json";
const INITIAL_DATA_URL = jsonData;
console.log(jsonData)


export default {
  async fetchData({ commit }) {
    commit("SET_LOADING_STATE", true)
    commit("SET_INITIAL_DATA", INITIAL_DATA_URL)
  },
  async setLoadingState({ commit }, payload) {
    commit("SET_LOADING_STATE", payload)
  },

  async reorderTaskListItems({ commit }, payload) {
    commit("REORDER_TASKLIST_ITEMS", payload)
  },

  async saveTaskListItem({ commit }, payload) {
    commit("SAVE_TASKLIST_ITEM", payload)
  },
  async deleteTaskListItem({ commit }, payload) {
    commit("DELETE_TASKLIST_ITEM", payload)
  }
}
