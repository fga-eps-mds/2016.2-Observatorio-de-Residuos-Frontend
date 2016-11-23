angular.module("starter")
//Service to pass clicked projects as scope variables
    .service("projectService", function(){
        var project = {};
        var getProject = function(){
            return this.project;
        }
        var setProject = function(paramProject){
            this.project = paramProject;
        }
        return{
            getProject: getProject,
            setProject: setProject
        }
    })
