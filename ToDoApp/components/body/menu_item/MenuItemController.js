class MenuItemController{
    constructor(component){
        this.component=component;
    }

    goToPage(page){
        app.goToPage(page);
    }
}