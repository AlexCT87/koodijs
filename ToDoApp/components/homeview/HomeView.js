class HomeView extends Component{
    constructor(el,state){
        super(el,state, new HomeViewController(),"components/homeview/HomeView.html");
        this.controller.component=this;
    }
}