class Toolbar extends Component{
    constructor(el,state){
        super(el,state, new ToolbarController(),"components/body/toolbar/Toolbar.html");
        this.controller.component=this;
    }

    postRender(){
        this.el.getElementsByTagName("img")[0].onclick=this.onclick.bind(this);
    }

    onclick(){
        //document.getElementById("menu").style.left="0px";
        document.getElementById('menu').style.transform="translateX(250px)";
        setTimeout(function(){
            document.getElementsByTagName("body")[0].onclick=function(){
                //document.getElementById('menu').style.left='-250px';
                document.getElementById('menu').style.transform="translateX(0px)";
                document.getElementsByTagName("body")[0].onclick=null;
            }; 
        },300);
    }
}