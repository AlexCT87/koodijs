class AddItemBX extends Component{
    constructor(el,state){
        super(el,state,new AddItemBXController(),"components/homeview/components/additembx/AddItemBX.html");
        this.controller.component=this;
    }

    preRender(){

    }

    postRender(){
    }

    update(){
        
    }
}