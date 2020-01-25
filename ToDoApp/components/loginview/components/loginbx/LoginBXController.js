class LoginBXController{
    constructor(component){
        this.component=component;
    }

    login(){
        app.login(this.component.state)
    }
}