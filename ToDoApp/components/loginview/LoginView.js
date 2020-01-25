class LoginView extends Component{
    constructor(el,state){
        super(el,state, new LoginViewController(),"components/loginview/LoginView.html");
        this.controller.component=this;
    }
}