const fs = require('fs');
const command = process.argv[2];

switch(command)
{
    case "add" : ADD(process.argv[4], process.argv[3]); break;
    case "ls" : LS(); break;
    case "del" : DEL(); break;
    case "done" : DONE(); break;
    case "report" : REPORT(); break;
    default : HELP(); break;
}


function ADD(currtask, currpriority) 
{
    let List = [];
    if(currpriority==null || currtask==null)
        console.log("Error: Missing tasks string. Nothing added!");
    else
    {
        try {
            List = JSON.parse(fs.readFileSync('task.json'));
            fs.unlinkSync("task.json");
        } catch(e) { }

        let curritem = { task: currtask , priority: currpriority };

        if(!List.includes(curritem))
            List.push(curritem);

        List.sort(function(a, b) {
            return a.priority - b.priority;
        })
    
        try {
            fs.writeFileSync('task.json', JSON.stringify(List));
        } catch(e) { }

        console.log("Added task: \"" + currtask + "\" with priority " + currpriority);
    }
}

function LS() 
{
    let List = [];
    try {
        List = JSON.parse(fs.readFileSync('task.json'));
    } catch(e) {
 
    }
    if(List.length==0)
    {
        console.log("There are no pending tasks!");
    } else {
        const uniqueList = List.filter(function(value, index) {
            const _value = JSON.stringify(value);
            return index === List.findIndex(function(obj) {
                return JSON.stringify(obj) === _value;
            });
        });
        for(var i=0; i<uniqueList.length; i++)
        {
            console.log((i+1) + ". " + uniqueList[i].task + " [" + uniqueList[i].priority + "]");
        }
    }
}

function DEL() 
{
    if(process.argv[3]==null)
    {
        console.log("Error: Missing NUMBER for deleting tasks.");
    }
    else
    {
        let idx= process.argv[3] - 1;
        let List = [];

        try {
            List = JSON.parse(fs.readFileSync('task.json'));
        } catch(e){ }

        const uniqueList = List.filter(function(value, index) {
            const _value = JSON.stringify(value);
            return index === List.findIndex(function(obj) {
                return JSON.stringify(obj) === _value;
            });
        });

        if(idx>=uniqueList.length || idx<0)
        { 
            idx=idx+1;
            console.log("Error: task with index #"+idx+" does not exist. Nothing deleted.");
        }
        else 
        {
            uniqueList.splice(idx, 1);
            try {
                fs.writeFileSync('task.json', JSON.stringify(uniqueList));
            } catch(e) { }
            idx=idx+1;
            console.log("Deleted task #"+idx);
        }
    }   
}

function DONE() 
{
    if(process.argv[3]!=null)
    {
        let idx = process.argv[3] - 1;
        let List = [];
        let completedList = [];
        try {
            List = JSON.parse(fs.readFileSync('task.json'));
            completedList = JSON.parse(fs.readFileSync('completeTask.json'));
        } catch(e) {
    
        }
        const uniqueList = List.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === List.findIndex(obj => {
            return JSON.stringify(obj) === _value;
            });
        });
        const CompleteduniqueList = completedList.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === completedList.findIndex(obj => {
            return JSON.stringify(obj) === _value;
            });
        });
        
        if(idx>=uniqueList.length || idx<0)
        {  idx=idx+1;
            console.log("Error: no incomplete item with index #"+idx+" exists.");
    
    
        }
        else{
        CompleteduniqueList.push(List[idx]);
        uniqueList.splice(idx, 1);
    
        CompleteduniqueList.sort(function(a, b) {
            return a.priority - b.priority;
        });
    
        try {
            fs.writeFileSync('task.json', JSON.stringify(uniqueList));
            fs.writeFileSync('completeTask.json', JSON.stringify(CompleteduniqueList));
        }
        catch(e) {
    
        }
    
        console.log("Marked item as done.");
      }
    }
    else
    {
        console.log(" Error: Missing NUMBER for marking tasks as done.");
    }
}

function REPORT()
{
    let List = [];
    try {
        List = JSON.parse(fs.readFileSync('task.json'));
    } catch(e) { }
 
    console.log("Pending : "+List.length);
    for(var i=0; i<List.length; i++)
    {  
        if(i==List.length-1)
        console.log((i+1) + ". " + List[i].task + " [" + List[i].priority + "]\n");
        else
        console.log((i+1) + ". " + List[i].task + " [" + List[i].priority + "]");
    }

    let completedList = [];
    try {
        completedList = JSON.parse(fs.readFileSync('completeTask.json'));
    }
     catch(e) {
 
    }
 
    console.log("Completed : "+completedList.length);
    for(var i=0; i<completedList.length; i++)
    {
        console.log((i+1) + ". " + completedList[i].task );
    }
}

function HELP() 
{
    console.log("Usage :-");
    console.log("$ ./task add 2 hello world    # Add a new item with priority 2 and text " + '"hello world"' + " to the list");
    console.log("$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order");
    console.log("$ ./task del INDEX            # Delete the incomplete item with the given index");
    console.log("$ ./task done INDEX           # Mark the incomplete item with the given index as complete");
    console.log("$ ./task help                 # Show usage");
    console.log("$ ./task report               # Statistics");
}
