# To Do | Priority list

## Getting started

1. You will need to have node installed in your system. If you don't have Node.js you can install it from [here](https://nodejs.org/en/).

2. Once you are done with the above step you should be able to execute the task app by running the following command from the terminal.

   **On Windows:**

   ```
   .\task.bat
   ```

   **On Linix:**

   ```
   ./task.sh
   ```

## Usage

### 1. Help

Executing the command without any arguments, or with a single argument help prints the CLI usage.

```
$ ./task help
Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics
```

### 2. List all pending items

You can use the ls command to see all the items that are not yet complete, in ascending order of priority in below format.

```
[Serial number] [task] [priority]
```

Example:

```
$ ./task ls
1. clean floors [2]
2. clean study room [5]
```

### 3. Add a new item

You can use the add command. *The text of the task should be enclosed within double quotes.*

```
$ ./task add 5 "clean floors"
Added task: "clean floors" with priority 5
```

### 4. Delete an item

You can use the del command to remove an item by its SL No.

```
$ ./task del 3
Deleted item with serial number 3
```

### 5. Mark a task as completed

You can use the done command to mark an item as completed by its index.

```
$ ./task done 1
Marked item as done.
```

### 6. Generate a report

Show the number of complete and incomplete items in the list. and the complete and incomplete items grouped together.

```
$ ./task report
Pending : 2
1. this is a pending task [1]
2. this is a pending task with priority [4]

Completed : 3
1. completed task
2. another completed task
3. yet another completed task
```
