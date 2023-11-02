# admin-ui-dashboard

![image](https://github.com/clinckzone/admin-dashboard-ui/assets/28980632/5a91049c-871b-4d2a-8d1a-2acbf3e51ed1)

## Features

**1. Dynamic Search Bar:**

- A search bar is present at the top to filter results based on any property or attribute present within the rows.

**2. In-Place Row Editing & Deletion:**

- Users have the flexibility to directly edit or delete rows within the main interface.

**3. Pagination System:**

- The application displays a maximum of 10 rows per page.
- Pagination controls are positioned at the bottom of the page, offering users easy navigation options.
- The system provides specialized buttons for swift navigation: First Page, Previous Page, Next Page, and Last Page.
- The pagination system dynamically adjusts based on search and filtering results. For instance, if a search yields 25 relevant records, the pagination controls will offer a maximum of 3 pages.

**5. Row Selection & Bulk Deletion:**

- Users can select individual or multiple rows within the application.
- Upon selection, rows are highlighted with a subtle gray background to indicate their active status.
- For bulk actions, a 'Delete Selected' button will be situated at the bottom left, allowing users to remove multiple rows in one action.

**6. Select/Deselect All Shortcut:**

- A checkbox will be positioned at the top left corner of the application.
- Activating this checkbox will select or deselect all rows currently displayed on that specific page (limited to the 10 rows per page).
- This action will not affect rows on other pages, ensuring users have precise control over their selections.

## Setup for local development

Nothing new here. Do the usual steps:

```js
   npm install
   npm run dev
```

Since we are using Vite here, you don't really need to build the project for local development
