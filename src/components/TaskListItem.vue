<template>
  <div class="tasklist-item" >
   <div class="card">
     <!--  v-if="!isEditing" -->
     <div>
                        <h2 style="float:left" class="box-title">{{item.taskName}}</h2>
                        <ul class="list-inline" style="margin-top:0px;float:right;color-grey;">
                          <li>
                            <a :title="('New Task')" @click.prevent="OneTask" style="color:#34495E"><i class="fa fa-thumb-tack fa-2x"></i> </a>
                          </li>
                          <li>
                            <a :title="('Clone Task')" @click.prevent="clone" style="color:#34495E"><i class="fa fa-clone fa-2x"></i> </a>
                          </li>
                            <li>
                              <a :title="('Edit Task')" @click.prevent="startEditing" style="color:#34495E"><i class="fa fa-pencil fa-2x"></i> </a>
                            </li>
                            <li>
                              <a :title="('Delete Task')" @click.prevent="remove" style="color:#34495E"><i class="fa fa-trash-o fa-2x"></i> </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                      <h3 style="float:left" class="box-title">{{item.description}}</h3>
                       </div>
                       <div>
                         <h4 style="float:right;color:grey" class="box-title">Created By : {{item.username}}</h4>
                          </div>
   </div>
   <!-- <div class="card" v-else>
     <div class="card-body">
       <form class="form">
         <div class="form-group">
           <label for="description">Task description</label>
           <input
             name="description"
             class="form-control"
             v-model.trim="form.description"
             v-validate="'required'"
             data-vv-as="description"
             placeholder="Task description"
           >
           <span class="text-danger">{{ errors.first("description") }}</span>
           <br>
           <label for="username">username</label>
           <input
           name="username"
           class="form-control"
           v-model.trim="form.username"
           v-validate="'required'"
           data-vv-as="username"
           placeholder="User Name"
           >
           <span class="text-danger">{{ errors.first("username") }}</span>
         </div>

         <div class="d-flex justify-content-between">
           <div>
             <button class="btn btn-outline-success btn-sm mr-2" @click.prevent="save">
               Save
             </button>
             <button class="btn btn-outline-dark btn-sm" @click.prevent="cancel">
               Cancel
             </button>
           </div>
         </div>
       </form>
     </div>
   </div> -->
  </div>


</template>
<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex"
export default {
  props: ["item", "list"],
  computed: {
  },
  data() {
    return {
      isEditing: false,
      form: {
        taskName: "",
        description: "",
        username:""
      }
    }
  },

  methods: {
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
      deleteTaskListItem: "deleteTaskListItem"
    }),
    startEditing() {
        this.$router.push("/task_manager/edit/"+this.item.id);
      // this.form.taskName = this.item.taskName
      // this.form.description = this.item.description
      // this.form.username = this.item.username
      // this.isEditing = true
      // this.$emit("item-editing")
    },
    OneTask(){
      this.$router.push("/task_manager/one/"+this.item.id);
    },
    clone(){
      var uid = uuidv4();
      const updatedItem = {
        id:uid,
        taskName:this.item.taskName,
        description: this.item.description,
        username:this.item.username
      }
      this.saveTaskListItem({
        listName: this.list.name,
        item: updatedItem
      })
      this.$swal('Success','Cloned successfully',"success")
    },
    clearForm() {
      this.form.taskName = ""
      this.form.description = "",
      this.form.username = ""
    },
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
           var uid = uuidv4();
          const updatedItem = {
            id:uid,
            taskName:this.item.taskName,
            description: this.form.description,
            username:this.form.username
          }
          this.saveTaskListItem({
            listName: this.list.name,
            item: updatedItem
          })
          this.isEditing = false
          this.$emit("item-edited")
          this.$validator.reset()
        }
      })
    },
    cancel() {
      this.isEditing = false
      this.$emit("item-cancelled")
    },
    remove() {
      this.deleteTaskListItem({
        listName: this.list.name,
        item: this.item
      })
      this.$emit("item-deleted")
    }
  }
}
</script>
