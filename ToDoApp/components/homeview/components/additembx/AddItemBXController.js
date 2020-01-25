class AddItemBXController{
    constructor(component){
        this.component=component;
    }

    submit(){
        var name=this.component.state.inputs.name;
        if(name==""){
            alert("insert a name");
            return;
        }
        app.page.home.views.homeview.state.components.listitems.addItem(new ToDoItem(null,{name:name}));
        this.component.clear();
    }
}