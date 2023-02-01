# Full-Stack / Frontend homework (Typescript, React, Drag & Drop)
Welcome to the Digication work sample for Frontend developers (TypeScript, React, Drag & Drop)! This is our way to get some experience working with you and to gauge your skill in using TypeScript, React, and HTML DnD. For an experienced frontend developer, we estimate this project to take between 2 to 4 hours in total. We understand that you may have a busy schedule and can only work on this during your free time. For that reason, we hope you can complete it within a week. We encourage you to take the time you need in order to provide quality work that best reflects your skills.

## Context
We have implemented a basic Frontend React app in TypeScript to render and manage a grid layout system. This system contains of a 12 column grid where modules can be placed within the grid. We have provided a base code that includes this setup. The modules can currently move around freely via drag and drop. Your goal is to extend the algorithm, so a module can move within the layout container while matching the following requirements.

## Definition
1. **Layout container:** The 12 columns grid layout with 10px of gutter size. The container can contain multiple module objects.
2. **Module:** A module is a rectangle object, it has boundary properties relative to the layout container.
3. **Module boundary properties:**
    - **x:** The left coordinate value of the module relative to the layout container. The value unit is the grid column.
    - **y:** The top coordinate value of the module relative to the layout container. The value unit is a pixel.
    - **w:** The width of the object. The value unit is the grid column.
    - **h:** The height of the object. The value unit is a pixel.

 ![Layout Definition](https://campus.digication.com/srvs/filemanager/campus/4hcVVBD8SvqZDkVXYdGh/original?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiI0aGNWVkJEOFN2cVpEa1ZYWWRHaC5wbmciLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTYzNTcwNDEyNX0.dbaBWQImUw6LSfR-5nKhpxfaKM-44VvYzKtgrSqttVA) 

## Requirements
1. **Module movement:**
    - The module can't move outside of the top, right, and left edges of the layout container. The bottom edge behaves differently. When a module is moved downwards beyond the bottom edge, the bottom edge should also move downwards to extend the height of the layout container. This way, no matter how far down a module is moved, it would still be within the layout container.
    - **x** and **w** will snap to the grid column unit.
2. **Collision:**
    - Module objects cannot overlap each other.
    - The spacing between module objects must be more than 10px (gutter size).

## Demo
Animation GIF

![Grid Layout DnD](https://campus.digication.com/srvs/filemanager/campus/plEbboizSyTvMBtHHsoD/original?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJwbEViYm9pelN5VHZNQnRISHNvRC5naWYiLCJleHAiOjk5OTk5OTk5OTksImlhdCI6MTYzNTc0OTcxM30.zsWJO_2a922OitP0ltWsdkHTv1qek2WvuBcqSEhIXS0)

[Video](https://vimeo.com/641041193/130e68ae3e)

## Technical Requirements
You have to use TypeScript 4.4 and React Hooks.
For DnD, you can use HTML Drag and Drop API or any low-level DnD library (e.g [React DnD](https://react-dnd.github.io/react-dnd/)) but don't use any ready-to-use library such as [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout).

## Final Notes
Some documentation and good unit tests will be much appreciated. Please make sure to apply common design patterns and best practices like you would do for any of your professional projects.

Are you usually using additional tools in your projects? We can’t wait to hear about your best practices and why you think it's important to use them!

## Encouragement
Digication team members have worked through this work sample to make sure we are not asking for too much of your time. This shouldn't take you longer than 2 to 4 hours depending on your knowledge and the bells and whistles you want to add. We are looking forward to hearing from you!
