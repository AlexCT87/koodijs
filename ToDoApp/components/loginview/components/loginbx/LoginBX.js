class LoginBX extends Component{
    constructor(el,state){
        super(el,state,new LoginBXController(),"components/loginview/components/loginbx/LoginBX.html");
        this.controller.component=this;
    }

    preRender(){

    }

    postRender(){
     
    }

    update(){
        ;
    }

}