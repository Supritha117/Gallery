<template>
  <div class="page-wrapper">
    <div class="container-fluid appliance-top">
      <div>
        <div class="row">
          <div class="panel panel-primary">
            <div class="ordergalle">
              <ul class="list-inline">
                <li class="tab active">
                  <router-link
                    :to="{ name: 'gallery' }"
                    href="#tab1"
                    class="nav-link"
                    active-class="active"
                    data-toggle="tab"
                  >
                    GALLERY
                  </router-link>
                </li>
                <li class="tab">
                  <router-link
                    :to="{ name: 'TaskList' }"
                    class="nav-link"
                    href="#tab2"
                    active-class="active"
                    data-toggle="tab"
                  >
                    TASK-MANAGER
                  </router-link>
                </li>
              </ul>
              <div class="panel-body tabs-menu-body">
                <div class="tab-content" style="margin-top: 0px;">
                  <div v-if="errorMessage==''" class="tab-pane active" id="tab1">
                    <PhotoGallery :serviceList="serviceList" />
                  </div>
                  <div v-else class="tab-pane active" id="tab1">
                    <p style="color:red">{{errorMessage}}</p>
                  </div>
                  <div class="tab-pane white-box" id="tab2">
                    <TaskManager :list="list" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/index.js";
const axios = require("axios");
import PhotoGallery from "../components/PhotoGallery";
import TaskManager from "../components/TaskManager";
import { mapGetters } from "vuex";
export default {
  components: {
    PhotoGallery,
    TaskManager
  },
  data() {
    return {
      serviceList: [],
      errorMessage:""
    };
  },
  computed: {
    ...mapGetters({
      list: "taskList"
    })
  },
  watch: {},
  methods: {},
  mounted: function () {
    console.log(store);
    var comp = this;
    this.$router.push({
      name: "gallery"
    });
    var config = {
      limit: 10
    };
    axios
      .get("https://picsum.photos/v2/list", config)
      .then(function (response) {
        console.log(response.data);
        comp.serviceList = response.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        comp.errorMessage = error.message;
      });
  }
};
</script>
<style scoped>
.row-container {
  display: table;
  empty-cells: show;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}
.first-row {
  display: table-row;
  overflow: auto;
  background-color: lime;
}
.second-row {
  display: table-row;
  height: 100%;
  background-color: white;
  overflow: hidden;
}
.second-row iframe {
  width: 100%;
  height: 650px;
  border: none;
  margin: 0;
  padding: 0;
  display: block;
}
@media screen and (min-width: 320px) {
  .list-inline {
    font-size: 10px;
    width: 100%;
    margin-left: 0px;
  }
  .tab {
    width: 50%;
    text-align: center;
  }
  .panel-primary {
    padding: 10px;
    font-size: 5px;
    width: 100%;
    border: 0px;
  }
  .ordergalle {
    width: 100%;
    border: 1px solid black;
  }
}
@media screen and (min-width: 600px) {
  .list-inline {
    font-size: 15px;
    width: 100%;
    margin-left: 0px;
    margin-top: 0px;
  }
  .tab {
    width: 50%;
    text-align: center;
  }
  .panel-primary {
    padding: 100px;
    font-size: 15px;
    width: 100%;
    border: 0px;
  }
  .ordergalle {
    width: 100%;
    border: 1px solid black;
  }
}
@media screen and (min-width: 1024px) {
  .list-inline {
    font-size: 30px;
    width: 100%;
    margin-left: 0px;
  }
  .tab {
    width: 50%;
    text-align: center;
    border-bottom: 2px solid #212f3c;
  }
  .panel-primary {
    padding: 50px;
    font-size: 30px;
    width: 100%;
    border: 0px;
  }
  .ordergalle {
    width: 100%;
    border: 2px solid #212f3c;
  }
}
.tab-content .active {
  text-align: center;
  background-color: #fff;
  color: black;
}
.tab {
  padding: 10px 20px 11px 20px;
  color: #fff;
  text-decoration: none;
  background-color: #ccd1d1;
}
.tab a {
  padding: 10px 20px 11px 20px;
  color: #fff;
  text-decoration: none;
  background-color: #ccd1d1;
}

/* Style the active class, and buttons on mouse-over */
.active {
  background: #5d6d7e;
  color: #fff;
}

.active a {
  background: #5d6d7e;
  color: #fff;
}
</style>
