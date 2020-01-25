class ToDoItemController{
    constructor(component){
        this.component=component;
    }

    onclick(){
      app.page.home.views.homeview.state.components.listitems.removeItemByIstance(this.component);
    }
}