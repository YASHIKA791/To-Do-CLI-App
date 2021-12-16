const fs = require('fs');
const command = process.argv[2];



if(command === "add")
{
    let List = [], addtask = process.argv[4], addpriority = process.argv[3]; 
    if(addpriority==null || addtask==null)
    {
        console.log("Error: Missing tasks string. Nothing added!");
    }
    else
    {
    try {
        List = JSON.parse(fs.readFileSync('PendingList.json'));
    } catch(e) {

    }
       let item={task:addtask,priority:addpriority};
    if(!List.includes(item))
    List.push({task: addtask, priority: addpriority});
    List.sort(function(a, b) {
        return a.priority - b.priority;
    })

    try {
        fs.writeFileSync('PendingList.json', JSON.stringify(List));
    } catch(e) {

    }

    console.log("Added task: \"" + process.argv[4] + "\" with priority " + process.argv[3]);
}
}
else if(command === "ls") 
{
    let List = []; 
    try {
        List = JSON.parse(fs.readFileSync('PendingList.json'));
    } catch(e) {

    }
   let uniqueList=[... new Set(List)];
    for(var i=0; i<uniqueList.length; i++) 
    {
        console.log((i+1) + ". " + uniqueList[i].task + " [" + uniqueList[i].priority + "]");
    }
} 
else if(command === "del")
{  if(process.argv[3]==null)
    {
        console.log("Error: Missing NUMBER for deleting tasks.");
    }
    else
    {
     let idx= process.argv[3] - 1;
    let List = []; 
    try {
        List = JSON.parse(fs.readFileSync('PendingList.json'));
    } catch(e){

    }
   
    if(idx>=List.length || idx<0)
    { idx=idx+1;
      console.log("Error: task with index #"+idx+" does not exist. Nothing deleted.");
    }
    else{
    
    List.splice(idx, 1); 

    try {
        fs.writeFileSync('PendingList.json', JSON.stringify(List));
    } catch(e) {

    }
    idx=idx+1;
    console.log("Deleted task #"+idx);
}
    }
}
else if(command === "done")
{   if(process.argv[3]!=null)
    {
    let idx = process.argv[3] - 1;
    let List = [];
    let completedList = []; 
    try {
        List = JSON.parse(fs.readFileSync('PendingList.json'));
        completedList = JSON.parse(fs.readFileSync('CompletedList.json'));
    } catch(e) {

    }
    //Error: no incomplete item with index 5 exists.
    if(idx>=List.length || idx<0)
    {  idx=idx+1;
        console.log("Error: no incomplete item with index #"+idx+" exists.");


    }
    else{
    completedList.push(List[idx]); 
    List.splice(idx, 1); 

    completedList.sort(function(a, b) {
        return a.priority - b.priority;
    });

    try {
        fs.writeFileSync('PendingList.json', JSON.stringify(List));
        fs.writeFileSync('CompletedList.json', JSON.stringify(completedList));
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
else if(command === "report") {
    let List = []; 
    try {
        List = JSON.parse(fs.readFileSync('PendingList.json'));
    } catch(e) {

    }

    console.log("Pending List : "+List.length);
    for(var i=0; i<List.length; i++) 
    {
        console.log((i+1) + ". " + List[i].task + " [" + List[i].priority + "]");
    }

    let completedList = []; 
    try {
        completedList = JSON.parse(fs.readFileSync('CompletedList.json'));
    }
     catch(e) {

    }

    console.log(" ");

    console.log("Completed List : "+completedList.length);
    for(var i=0; i<completedList.length; i++) 
    {
        console.log((i+1) + ". " + completedList[i].task + " [" + completedList[i].priority + "]");
    }
}
else
{
    console.log("Usage :-");
    console.log("$ ./task add 2 hello world    # Add a new item with priority 2 and text " + '"hello world"' + " to the list");
    console.log("$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order");
    console.log("$ ./task del INDEX            # Delete the incomplete item with the given index");
    console.log("$ ./task done INDEX           # Mark the incomplete item with the given index as complete");
    console.log("$ ./task help                 # Show usage");
    console.log("$ ./task report               # Statistics");

} 
