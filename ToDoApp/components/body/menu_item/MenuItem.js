class MenuItem extends Component{
    constructor(el,state){
        super(el,state,new MenuItemController(),"components/body/menu_item/MenuItem.html");
        this.controller.component=this;
    }

    postRender(){
        this.el.onclick=this.onclick.bind(this);
    }
 
    onclick(){
        this.controller.goToPage(this.state.label);
    }
}