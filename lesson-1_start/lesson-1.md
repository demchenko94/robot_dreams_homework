# Homework for Lesson 1
<br>

## Task

### Description
*Напишіть програму на Node.js, яка приймає з командного рядка вкладені масиви чисел у вигляді рядка та обчислює їхню суму за допомогою рекурсії.*

### Example command

*node sum.js "[1, 2, [3, 4, [5]], 6]"*

### Result
*Сума чисел: 21*

## Used
- **process.argv** - to get the arguments from the command line
- **process.exit** - to exit the process
- **recursive function** - to calculate the sum of the nested array
- **chalk** - to color the output (vendor package)

## Unit tests
**To run the unit tests use command** ```yarn run test```

## Commands for run
```node ./lesson-1_start/index.js "[1, 2, [3, 4, [5]], 6]"``` 
<br>
```node ./lesson-1_start "[1, 2, [3, 4, [5]], 6]"```
