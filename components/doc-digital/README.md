## Nuxt auto import components here: 

All components created under /components/doc-digital will be auto imported by nuxtjs.
 
### Auto import rules
- ComponentName is taken from file name.
  ```
  // Example MyComponent.vue
  <MyComponent></MyComponent>
  ```
- Components can be nested. On such cases the name of the parent folder need to be prepended to component filename.
  ```
  // Example MyFolder/MyComponent.vue
  <MyFolderMyComponent></MyFolderMyComponent>
  ```
- If you like o import the component as lazy you can additionally prepend the Lazy keyword. 
  ```
  // Example MyFolder/MyComponent.vue, lazy loaded
  <LazyMyFolderMyComponent></LazyMyFolderMyComponent>
  ```
  
### Advantages and Disadvantages of nuxt auto imported components

The advantages are:
 - Out of the box lazy loading by prepending Lazy on components name
 - No need of manually importing on any page or auto imported component
 
Disadvantages: 
 - Require developers to have a good understanding of naming conventions for auto imported components.
 - Restricted naming conventions
 - Prevent component nesting above 2 levels, as it can become a bit confusing to guess the proper component name.  
  
