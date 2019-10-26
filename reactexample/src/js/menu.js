$(function(){
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        if (hash == "bar") {
            getBarTab();
        } else if (hash == "recipe") {
            getRecipeTab();
        } else if (hash == "account") {
            getAccountTab();
        } else {
            //Default to bar
            getBarTab();
        }
    } else {
        getBarTab();
    }
    instantateTabs();
    launchMenu();
});

function instantateTabs() {
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        console.log(tabs[i].id);
        tabs[i].addEventListener("click", function (){
            var id = this.id.replace("Tab", ""); 
            console.log(id);
        });
    }
}

function launchMenu() {
    var hash = window.location.hash.substring(1);
    var boxes = document.getElementsByClassName("box");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.display = "none";
    }

    if (hash == "bar") {
        getBarTab();
    } else if (hash == "recipe") {
        getRecipeTab();
    } else if (hash == "account") {
        getAccountTab();
    } else {
        getBarTab();
    }
}

function getRecipeTab() {
    window.location.hash = "recipe";
    document.getElementById("recipeBox").style.display = "block";
}

function getAccountTab() {
    window.location.hash = "account";
    document.getElementById("accountBox").style.display = "block";
}

function getBarTab() {
    window.location.hash = "bar";
    document.getElementById("barBox").style.display = "block";
}