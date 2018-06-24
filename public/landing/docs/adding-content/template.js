/*
  To add a new content section, you will essentially be:

    1. Creating a new .md file for the content
    2. Adding a new list item to the sidebar
    3. Adding a new 'route' that renders a 
       component with the content of the referenced
       .md file.

  All the pieces to do this are given to you in this
  file; you just have to tweak some values, copy & paste 
  as described in the following steps.
*/

/////////////////////////
///   MAJOR STEP 1   ///
///////////////////////
/* 
  1. Inside the docs directory, create a new directory
     with the name of the new section you're adding.
     Please sure to follow the naming conventions; if
     the title of your section consists of more than one
     word, use dashes instead of spaces in the name of 
     the directory.
  2. Create a README.md file inside the new directory.
  3. Add content, and save. Keep in mind, you will be
     wriging Markdown!
*/

/////////////////////////
///   MAJOR STEP 2   ///
///////////////////////
/* 
  1. Copy the example <li> below and paste it
     in the <ul> in the Sidebar.js file inside
     src/components.
  2. Add the title of the new section between the
    <Link> components.
  3. Replace 'section-name' in the to='' attribute
     with the title of the new section, but use
     dashes instead of spaces.
  4. Save.
*/
<li>
  <Link to="/docs/section-name">
    Section title goes here (e.g. Resources)
  </Link>
</li>


/////////////////////////
///   MAJOR STEP 3   ///
///////////////////////

/*
  1. Copy the object below and add it to the array
      of objects in the content-routes.js files inside
      the docs directory.
  2. Replace 'section-name' with THE SAME value you
      used above in the <Link> component. These values
      MUST match.
  3. Inside content-routes.js, at the top of the file,
     paste the import statement provided below and
      - Using camelCase, change DirName to the name
        of the respective directory (or section).
      - Change '/directory-name/ so that it points to
        the right directory.
  4. Pass the imported reference to the section's content
     (Dirname) as a prop to the <Content> component.
  5. Save.
*/
import DirName from './directory-name/README.md';

[
  {
    path: `${root}/section-name`,
    main: () => <Content mdfPath={FileName} />
  }
]

/*
  A title for the newly added section should now
  appear in the docs page. When clicked, its content
  will be rendered.
*/
