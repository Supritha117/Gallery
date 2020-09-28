<template>
  <div class="scrolling-wrapper">
    <div class="row">
      <div class="col-md-12">
          <div class="white-box">
             <button @click="newTask" style="width:200px;float:right;margin-right:20px;font-size:20px;background-color:#EBF5FB;border:#7FB3D5;" class="btn btn-block btn-default" >&#43;&nbsp;&nbsp;ADD NEW TASK</button>
          </div>
          </div>
          </div>
          <div class="row">
              <div class="col-md-12" >
    <draggable v-model="lists" class="row flex-nowrap mt-1" style="padding:10px;margin-left:5px;">
      <TaskList v-for="(listItem, index) in lists" :key="index"  :list="listItem"></TaskList>
    </draggable>
      </div>
      </div>
  </div>
</template>
<script>
import TaskList from "./TaskList"
import Draggable from "vuedraggable"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "TaskManager",
  props: ["list"],
  data(){
    return{
      lists:[]
    }
  },
  components: {
    TaskList,
    Draggable
  },
  mounted() {
     this.lists = this.list;
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading"
    }),
  },
  methods: {
    ...mapActions({
      reorderTaskLists: "reorderTaskLists",
      setActiveTaskBoard: "setActiveTaskBoard"
    }),
    newTask: function() {
      this.$router.push({
        name: "newTask"
      });
    },
  },
}
</script>
