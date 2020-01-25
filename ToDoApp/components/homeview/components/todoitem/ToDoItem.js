class ToDoItem extends Component{
    constructor(el,state){
        super(el,state,new ToDoItemController(),"components/homeview/components/todoitem/ToDoItem.html");
        this.controller.component=this;
    }

    preRender(){
    }

    postRender(){
        this.el.getElementsByTagName("button")[0].onclick=this.onclick.bind(this);
    }

    update(){
    }
    
    onclick(){
        this.controller.onclick();
    }
}