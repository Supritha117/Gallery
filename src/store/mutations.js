import Vue from "vue"

export default {
  // Set Initial Data
  SET_INITIAL_DATA(state, payload) {
    state.taskList = payload
  },

  // Set Loading State
  SET_LOADING_STATE(state, payload) {
    state.isLoading = payload
  },

  // Reorder Task List Items
  REORDER_TASKLIST_ITEMS(state, payload) {
    console.log(payload);
    console.log("taskList"+JSON.stringify(state.taskList))
    const taskList = state.taskList.find(b => b.name == payload.listName)
    Vue.set(taskList, "items", payload.items)
  },

  // Save Task List Item
  SAVE_TASKLIST_ITEM(state, payload) {
    const taskList = state.taskList.find(b => b.name == payload.listName)

    const itemIdx = taskList.items.findIndex(item => item.id == payload.item.id)

    // For existing item
    if (itemIdx > -1) {
      Vue.set(taskList.items, itemIdx, payload.item)
    }
    // For new item
    else {
      taskList.items.push(payload.item)
    }
  },

  // Delete Task List Item
  DELETE_TASKLIST_ITEM(state, payload) {
    const taskList = state.taskList.find(b => b.name == payload.listName)
    const itemIdx = taskList.items.findIndex(item => item.taskName == payload.item.taskName)
    // For existing item
    if (itemIdx > -1) {
      Vue.delete(taskList.items, itemIdx)
    }
  }
}
