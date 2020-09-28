<template>
        <div class="col-5 list-column list-width">
          <div class="heading" :style="{ backgroundColor: list.headerColor }">
            <h4 class="heading-text text-center" style="color:black">{{ list.name }}-[{{list.items.length}}]</h4>
          </div>
          <div class="cards cards-list">
            <Draggable v-model="items" group="items">
              <TaskListItem

                v-for="item in items"
                :item="item"
                :list="list"
                :key="item.taskName"
                @item-edited="itemEdited"
                @item-cancelled="itemCancelled"
                @item-editing="itemEditing"
              ></TaskListItem>
              <!-- <TaskListItem
                class="fixed-card"
                :item="defaultItem"
                :list="list"
              ></TaskListItem> -->
              <!-- <TaskListItem
                v-if="items.length>=0"
                v-else
                :item="item"
                :list="list"
                :key="item.taskName"
              ></TaskListItem> -->
            </Draggable>
          </div>
        </div>
</template>
<script>
import Draggable from "vuedraggable"
import { mapActions } from "vuex"
import TaskListItem from "./TaskListItem"
export default {
    name: 'TaskList',
    components: {
      TaskListItem,
      Draggable
    },
    props: ["list"],
    data(){
      return{
        isEditing: false,
      }
    },
    mounted() {
    },
    computed: {
      defaultItem() {
          return {
            id: ""
          }
        },
     items: {
      get() {
        return this.list.items
      },
      set(reorderedListItems) {
        const payload = {
          listName: this.list.name,
          items: reorderedListItems
        }
        console.log("payload"+JSON.stringify(payload))
        this.reorderTaskListItems(payload)
      }
    }
    },
    methods:{
      ...mapActions({
      reorderTaskListItems: "reorderTaskListItems"
    }),
      newTask: function() {
        this.$router.push({
          name: "newTask"
        });
      },
      itemEditing() {
        this.isEditing = true
      },
      itemEdited() {
        this.isEditing = false
      },
      itemCancelled() {
        this.isEditing = false
      }
    }
}
</script>
