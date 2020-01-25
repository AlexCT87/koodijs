// version 0.0.4
// usage
// you have to Create your Components by extends the Component Class for example see the ToDoItem.js
// -------------------------------------------------------------------------------------------------//
// new Form(el,{html:html,form:component,inputs:{keyId:""}},submitFunction); // submitFunction is optional
// new List(el,{items:[component1,component2]});
// new OList(el,{items:[component1,component2],itemWidth:100});
// new View(el,{html:html,view:component,components:{keyId:component}});
// new Popup(el,{view:popupView});
// new Tabs(el,{tabs:["tab1","tab2"],views:[tab1View, tab2View],itemWidth:"175px"});



class Tabs {
    constructor(el,state){
        this.el=el;
        this.state=state;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        this.el.innerHTML="";
        this.state.tabscontainer=document.createElement("div");
        this.state.tabscontainer.classList="tabscontainer";
        this.state.viewscontainer=document.createElement("div");
        this.state.viewscontainer.classList="viewscontainer";
        this.state.tabLine=document.createElement("div");
        this.state.tabLine.classList="tabline";
        this.state.tabLine.style.width=this.state.itemWidth;
        this.el.appendChild(this.state.tabscontainer);
        this.el.appendChild(this.state.viewscontainer);
        this.state.tabscontainer.appendChild(this.state.tabLine);

        this.state.tabsList=new OList(this.state.tabscontainer,{items:[],itemWidth:this.state.itemWidth});
        this.state.viewsList=new OList(this.state.viewscontainer,{items:[],itemWidth:"100%"});
        for(var i=0; i<this.state.tabs.length; i++){
            this.state.tabsList.state.items.push(new Tab(null,{label:this.state.tabs[i],index:i,itemWidth:this.state.itemWidth},this.selectTab.bind(this)));
            this.state.viewsList.state.items.push(this.state.views[i]);
        }    
        this.state.tabsList.render();  
        this.state.viewsList.render();
        for(var i=0; i<this.state.tabs.length; i++){
            this.state.viewsList.state.items[i].el.style.width="100%";
            this.state.viewsList.state.items[i].el.style.height="100%";
            this.state.viewsList.state.items[i].el.style.position="absolute";
            this.state.viewsList.state.items[i].el.style.left=Number(i*100)+"%";
            this.state.viewsList.state.items[i].el.style.transition="cubic-bezier(.16,1.02,1,1)";
            this.state.viewsList.state.items[i].el.style.transitionDuration="0.15s";
        }
        this.state.tabscontainer.appendChild(this.state.tabLine);
        this.selectedTab=this.state.tabsList.state.items[0];
        this.selectTab(this.selectedTab);
    }

    selectTab(tab){
        this.selectedTab.el.getElementsByTagName("div")[0].style.background="";
        var i=tab.state.index;
        var xpos=Number(i)*Number(this.state.itemWidth.split("px")[0]);
        var xpospx=xpos+"px";
        this.state.tabLine.style.transform="translate("+xpospx+") scale(1)";
        tab.el.getElementsByTagName("div")[0].style.background="rgba(0, 0, 0, 0.2)";

        for(var j=0; j<this.state.tabs.length; j++){
            var dif=j-i;
            this.state.viewsList.state.items[j].el.style.left=Number(dif*100)+"%";
        }

        this.selectedTab=tab;
    }
}

class Tab {
    constructor(el,state,func){
        this.el=el;
        this.state=state;
        this.func=func
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        var html=
        '<div name="tab" class="tab" style="width:'+this.state.itemWidth+'" align="center">'+
            '<label class="tablabel">'+this.state.label+'</label>'+
        '</div>';
        this.el.innerHTML=html;
        this.el.onclick=this.onclick.bind(this);
    }

    onclick(){
        this.func(this);
    }

}

class Popup {
    constructor(el,state){
        this.el=el;
        this.state=state;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        if(this.state.view==null)return;
        this.el.innerHTML=this.state.view;
        this.state.view.render(this.el);
    }

    open(view){
        if(view!=undefined)
            this.state.view=view;
        this.render();
        this.el.style.transform="translate(0,0) scale(1)";
        this.el.style.opacity="1";
    }

    close(){
        this.el.style.transform="translate(0,0) scale(0)";
        this.el.style.opacity="0";
    }
}

class View {
    constructor(el,state){
        this.el=el;
        this.state=state;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        if(this.state.html!=null){
            this.state.view=new Component(null,{html:this.state.html},{});
        }
        if(this.state.view!=null){
            this.state.view.render(el);
        }
        //this.el.innerHTML=this.state.view;
        for(var key in this.state.components){
            var node=document.getElementById(key);
            //console.log(node);
            //console.log(this.state.components[key]);
            this.state.components[key].render(node);
        }
    }

    renderComponents(){
        for(var key in this.state.components){
            var node=document.getElementById(key);
            this.state.components[key].render(node);
        }
    }
}

class List {
    constructor(el,state){
        this.el=el;
        this.state=state;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        this.el.innerHTML="";
        for(var i=0; i<this.state.items.length; i++){
            var node=document.createElement("div");
            //node.id=this.el.id+'_'+i;
            this.el.appendChild(node);
            this.state.items[i].render(node);
        }
    }

    addItem(item){
        this.state.items.push(item);
        var i=this.state.items.length-1;
        if(this.el!=undefined){
        var node=document.createElement("div");
        //node.id=this.el.id+'_'+i;
        this.el.appendChild(node);
        this.state.items[i].render(node);
        }
    }
    
    removeItem(i){
        var items=this.state.items.splice(i,1);
        items[0].el.outerHTML='';
        /*
        for(i; i < this.state.items.length; i++){
            this.state.items[i].el.id=this.el.id+'_'+(i);
        }
        */
    }

    removeItemByIstance(item){
        for(var i=0; i < this.state.items.length; i++){
            if(item === this.state.items[i]){
                var items=this.state.items.splice(i,1);
                items[0].el.outerHTML='';
            }
        } 
    }
}

class OList {
    constructor(el,state){
        this.el=el;
        this.state=state;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        this.el.innerHTML="";
        var width=this.state.items.length*this.state.itemWidth;
        this.el.style.width=width+'px';
        for(var i=0; i<this.state.items.length; i++){
            var node=document.createElement("div");
            //node.id=this.el.id+'_'+i;
            this.el.appendChild(node);
            this.state.items[i].render(node);
        }
    }

    addItem(item){
        this.state.items.push(item);
        var i=this.state.items.length-1;
        var node=document.createElement("div");
        //node.id=this.el.id+'_'+i;
        this.el.appendChild(node);
        this.state.items[i].render(node);
    }
    
    removeItem(i){
        var items=this.state.items.splice(i,1);
        items[0].el.outerHTML='';
    }

    removeItemByIstance(item){
        for(var i=0; i < this.state.items.length; i++){
            if(item === this.state.items[i]){
                var items=this.state.items.splice(i,1);
                items[0].el.outerHTML='';
            }
        } 
    }
}

class Form {
    constructor(el,state,submit){
        this.el=el;
        this.state=state;
        this.submit=submit;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        if(this.state.html!=null){
            this.state.form=new Component(null,{html:this.state.html},{});
        }
        if(this.state.form!=null){
            this.state.form.render(this.el);
            this.init();
        }
    }

    init(){
        if(this.state.index!=undefined){
            
            var nodes=this.el.getElementsByTagName("input");
            for(var i=0; i < nodes.length; i++){
                nodes[i].id+="_"+this.state.index;
            }
            document.getElementById("submit_"+this.state.index).onclick=this.presubmit.bind(this);
            for(var key in this.state.inputs){
                var node=document.getElementById(key+"_"+this.state.index);
                if(node != null && node != undefined){
                    node.value=this.state.inputs[key];
                    node.onchange=this.onchange.bind(this);
                }
            }
        }
        else{
            document.getElementById("submit").onclick=this.presubmit.bind(this);
            for(var key in this.state.inputs){
                var node=document.getElementById(key);
                if(node != null && node != undefined){
                    node.value=this.state.inputs[key];
                    node.onchange=this.onchange.bind(this);
                }
            }
        }
    }

    clear(){
        for(var key in this.state.inputs){
            var node=document.getElementById(key);
            if(node != null && node != undefined){
                this.state.inputs[key]="";
                document.getElementById(key).value="";
            }
        }
    }

    onchange(){
        for(var key in this.state.inputs){
            if(this.state.index!=undefined){
                var node=document.getElementById(key+"_"+this.state.index);
                if(node != null && node != undefined){
                    this.state.inputs[key]=document.getElementById(key+"_"+this.state.index).value;
                }
            }
            else{
                var node=document.getElementById(key);
                if(node != null && node != undefined){
                    this.state.inputs[key]=document.getElementById(key).value;
                }
            }
        }
    }

    presubmit(){
        if(this.submit==null || this.submit==undefined){
            this.state.form.controller.component=this;
            this.state.form.controller.submit(this);
        }
        else
            this.submit(this);
    }
}

class Component {
    constructor(el,state,controller,templateUrl){
        this.el=el;
        this.state=state;
        this.controller=controller;
        this.templateUrl=templateUrl;
        if(this.controller!=null)
            this.controller.component=this;
    }

    getHTMLTemplate(){
        this.state.html="";
        if(this.templateUrl!=undefined && this.template==undefined){
            var html="";
            executeKoodiRestCall(false,this.templateUrl,function(result){
                html=result;
            });
            this.template=html;
            while(html.search("{")!=-1){
                var i=html.search("{")+1;
                var j=html.search("}");
                var ev=html.substr(i,j-i);
                var val=eval(ev);
                html=html.replace(/{.*}/,val);
            }
            this.state.html=html;
        }
        else{
            if(this.template==undefined)return;
            var html=this.template;
            while(html.search("{")!=-1){
                var i=html.search("{")+1;
                var j=html.search("}");
                var ev=html.substr(i,j-i);
                var val=eval(ev);
                html=html.replace(/{.*}/,val);
            }
            this.state.html=html;
        }  
    }

    updateHTMLTemplate(){
        if(this.template==undefined)return;
            var html=this.template;
            while(html.search("{")!=-1){
                var i=html.search("{")+1;
                var j=html.search("}");
                var ev=html.substr(i,j-i);
                var val=eval(ev);
                html=html.replace(/{.*}/,val);
            }
        this.state.html=html;
    }

    render(el){
        if(el!=undefined)
            this.el=el;
        this.preRender();
        if(this.templateUrl!=undefined)
            this.getHTMLTemplate();
        this.el.innerHTML=this.state.html;
        this.postRender();
    }

    update(){
        this.render();
    }

    preRender(){
        return 0;   
    }

    postRender(){
        return 0;
    }
}

class ModelViews{
    constructor(){
        this.bind=[];
    }

    setModel(key,model){
        if(this.bind[key]==undefined)
            this.bind[key]={model:null,views:[]}
        this.bind[key].model=model;
    }

    setModelViews(key,model,views){
        if(this.bind[key]==undefined)
            this.bind[key]={model:null,views:[]}
        this.bind[key].model=model;
        this.bind[key].views=views;
    }

    getModel(key){
        if(this.bind[key]!=undefined)
            return this.bind[key].model;
        return undefined;
    }

    getViews(key){
        return this.bind[key].views;
    }

    pushView(key,view){
        if(this.bind[key]==undefined)
            this.bind[key]={model:null,views:[]}
        if(this.bind[key].views.includes(view)==false)
            this.bind[key].views.push(view);
    }

    removeView(key,view){
        var i=this.bind[key].views.indexOf(view);
        this.bind[key].views.splice(i,1);
    }

    update(key,model){
        if(model != undefined)
            this.bind[key].model=model;
        for(var i=0; i<this.bind[key].views.length; i++){
            this.bind[key].views[i].update();
        }
    }
}

class KoodiApp {
    constructor(state){
        this.state=state;
        this.modelViews=new ModelViews();
        this.toolbar=new Toolbar(null,{label:""});
        this.menu=new List(null,{items:[]},{});
        this.toolbar.render(document.getElementById("toolbar"));
        this.page={ };
        this.locationPage=null;
    }

    goToPage(page,pageview){    
        page=page.toLowerCase();
        if(pageview==undefined || pageview== null)
        pageview=page;
        
        $("#page").fadeOut("fast","swing");
        setTimeout(function(){
            eval(" this.page."+page+".views."+pageview+"view.render(document.getElementById('page'))");
            this.locationPage=page;
            $("#page").fadeIn("fast","swing");
            this.toolbar.state.label=page;
            this.toolbar.render();
        }.bind(this),250);
    }
}

function executeKoodiRestCall(async,url,fnc){
    $.ajax({
        url: url,
        type : "GET",
        dataType : 'text',
        data : "",
        async: async,
        success : function(result){
            fnc(result);
        },
        error: function(xhr, resp, text){
            alert("errore");
        }
    });
}
