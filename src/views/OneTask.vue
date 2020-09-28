<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-12 offset-md-12 col-xs-12">
          <h1 style="margin-bottom:20px;" class="text-xs-center">Edit Task</h1>
          <form class="form" data-vv-scope="form1">
          <div class="form-group">
              <label for="taskName">Task Name</label>
              <input
              name="taskName"
              class="form-control"
              v-model.trim="form.taskName"
              v-validate="'required'"
              placeholder="Task Name"
              />
              <span class="text-danger">{{ errors.first("taskName") }}</span>
            </div>
              <div class="form-group">
              <label for="description">Task description</label>
              <input
                name="description"
                class="form-control"
                v-model.trim="form.description"
                v-validate="'required'"
                placeholder="Task description"
              >
              <span class="text-danger">{{ errors.first("description") }}</span>
            </div>
                <div class="form-group">
              <label for="username">username</label>
              <input
              name="username"
              class="form-control"
              v-model.trim="form.username"
              v-validate="'required'"
              placeholder="User Name"
              >
              <span class="text-danger">{{ errors.first("username") }}</span>
            </div>
            <div class="form-group">
                        <label for="listType">Type : </label>
                          <select name="listType" class="form-control" style="height:40px;width:100%;" v-model.trim="form.listType" v-validate="'required'" data-vv-as="listType">
                            <option value="BACKLOGS">BACKLOGS</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                             </select>
                    </div>
            <button style="margin-left:10px" class="btn btn-lg btn-dark pull-xs-right" @click="cancel">Cancel</button>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="addNewTask">
              Save
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapGetters,mapActions } from "vuex"
export default {
    name: 'createTask',
    data(){
      return{
        form: {
          taskName: "",
          description: "",
          username:"",
          listType:""
        },
        id:""
      }
    },
    mounted() {
      this.id=this.$route.params.id
      this.load();
    },
    computed: {
      ...mapGetters({
        TaskList: "taskList"
      }),
      ...mapGetters({
        edit: "isLoading"
      })
    },
    methods:{
      async cancel(){
        this.$router.push({
          name: "TaskList"
        });
    },
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
    }),
    ...mapActions({
      setLoadingState: "setLoadingState",
    }),
    load() {
        var List = this.TaskList;
        console.log("TaskLists"+JSON.stringify(List));
        for(var k=0;k<List.length;k++){
          for(var l=0;l<List[k].items.length;l++){
            if(List[k].items[l].id==this.id){
              this.form.taskName = List[k].items[l].taskName;
              this.form.description = List[k].items[l].description;
              this.form.username = List[k].items[l].username;
              this.form.listType = List[k].name;
            }
          }
        }
    },
      async addNewTask() {
        this.$validator.validateAll('form1').then(result => {
          if (result) {
            var uid = uuidv4();
            const addItem = {
              id:uid,
              taskName:this.form.taskName,
              description: this.form.description,
              username:this.form.username,
            }
            this.saveTaskListItem({
              listName:this.form.listType,
              item: addItem
            })
            // this.$emit("it em-edited")
            // this.$validator.reset()
            this.$swal('Success','Created successfully',"success")
            this.$router.push({
              name: "TaskList"
            });
          }
        })
    }
  }
}
</script>
