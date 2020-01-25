class ToDoApp extends KoodiApp {
    constructor(state){
        super(state);
        this.menu.state.items.push(new MenuItem(null,{label:"home",image:"images/imagesNav/home.svg"}));
       
        this.userLogin={email:"user@mail.com", username:"admin", password:"admin", remember:false};

        this.menu.render(document.getElementById("menu"));
        this.toolbar.render(document.getElementById("toolbar"));

        this.ToDoItems=[];
        this.ToDoItems.push(new ToDoItem(null,{name:"Buy an Apple"}));
        this.ToDoItems.push(new ToDoItem(null,{name:"Buy a Banana"}));
        this.ToDoItems.push(new ToDoItem(null,{name:"Buy pasta"}));
        this.ToDoItems.push(new ToDoItem(null,{name:"Buy pomodoro"}));

        this.page={
                    login:{
                        views:{
                            loginview:new View(null,{view:new LoginView(null,{}),
                                        components:{
                                            "loginbx":new Form(null,{form:new LoginBX(null,{}),inputs:this.userLogin},this.login.bind(this))// submitFunction is optional
                                        }
                                })
                            } 
                    },
                    home:{
                        views:{
                            homeview:new View(null,{view:new HomeView(null,{}),
                                        components:{
                                            "listitems":new List(null,{items:this.ToDoItems}),// submitFunction is optional
                                            "additembx":new Form(null,{form:new AddItemBX(null,{}),inputs:{name:""}})
                                        }
                                })
                            } 
                    },
                    
                };
        this.goToPage("login");
    }

    login(){
        document.getElementById("loaderIcon").style.display="block";
        setTimeout(function(){
            this.goToPage("home");
            document.getElementById("loaderIcon").style.display="none";
        }.bind(this),1000);
    };

    addItem(){
        alert("addItem");
    }

}



