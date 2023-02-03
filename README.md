# Frontend homework (Typescript, React, Drag & Drop)

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

