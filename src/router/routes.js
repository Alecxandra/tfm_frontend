import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const DataProcessor = () => import(/* webpackChunkName: "dashboard" */"@/pages/DataProcessorPage.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");
const GenerateData = () => import(/* webpackChunkName: "common" */ "@/pages/DataProcessor/GenerateData.vue");
const ModelTraining = () => import(/* webpackChunkName: "common" */ "@/pages/ModelTraining.vue");
const CreateModel = () => import(/* webpackChunkName: "common" */ "@/pages/ModelTraining/CreateModel.vue");
const ModelNNDetail = () => import(/* webpackChunkName: "common" */ "@/pages/ModelTraining/ModelNNDetail.vue");
const ModelSVMDetail = () => import(/* webpackChunkName: "common" */ "@/pages/ModelTraining/ModelSVMDetail.vue");
const DashboardNN = () => import(/* webpackChunkName: "common" */ "@/pages/Dashboard/DashboardNN.vue");
const GeneralConfig = () => import(/* webpackChunkName: "common" */ "@/pages/GeneralConfigPage.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "dataprocessor",
        name: "data processor",
        component: DataProcessor
      },
      {
        path: "model-training",
        name: "Model Training",
        component: ModelTraining
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "generate-data",
        name: "Generate Data",
        component: GenerateData
      },
      {
        path: "create-model",
        name: "Create model",
        component: CreateModel
      },
      {
        path: "model-nn-detail/:id",
        name: "Model detail",
        component: ModelNNDetail
      },
      {
        path: "model-svm-detail/:id",
        name: "Model detail",
        component: ModelSVMDetail
      },
      {
        path: "model-nn-dashboard/:id",
        name: "Neural Network Dashboard",
        component: DashboardNN
      },
        {
        path: "general-config/",
        name: "General config",
        component: GeneralConfig
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
