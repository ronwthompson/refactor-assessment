# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Ticket 1: Perform a migration to the Agents table to add a customId column
- Ticket 2: New backend endpoints to update an Agent in the Agents table to have a customId
- Ticket 3: Update the `getShiftsByFacility` function to add the customId to the Agent metadata
- Ticket 4: Update the frontend UI on the platform to include a page to update an Agent's customId

### Ticket #1 - Perform a migration to the Agents table to add a customId column
Write, test, and execute SQL code to add a new column called `customId` to the Agents table in the database. The value is optional and can only be a string of up to 255 characters.

Acceptance criteria:
- I can see that the Agents table has an optional `customId` column in dev and prod environments
- I can execute code to INSERT a string up to 255 characters long into an Agent's `customId` column

Estimated time/effort:
- 1 day

### Ticket #2 - New backend endpoints to update an Agent in the Agents table to have a customId

Write, test, and deploy a new backend endpoint to service the new `customId` column in the Agents table. The new endpoints should be:

- GET: `/agent/:id` Retrieve an Agent's `customId` from their `internalId` On success, return 200 with the `customId`
- PUT: `/agent/:id/:customId` Update an Agent's `customId` from their `internalId` On success, return 200 with the new `customId`
- DELETE: `/agent/:id/:customId` Delete an Agent's `customId` from their `internalId` On success, return 200 with no body.

Acceptance criteria:
Using a tool such as Postman to utilize these new endpoints, someone should be able to:
- I can retrieve an Agent's `customId`. If no `customId` exists then an empty body should be returned with a 200 response.
- I can update an Agent's `customId`.
- I can delete an Agent's `customId`. If no `customId` exists, a 200 should be returned.

Estimated time/effort:
- 3 days

### Ticket #3 - Update the `getShiftsByFacility` function to add the customId to the Agent metadata

Update the `getShiftsByFacility` function's Agent metadata to include the Agent's `customId`. If an Agent does not have a `customId`, continue to use the `internalId`.  If an Agent has a `customId`, show the `customId` on the Shift report instead of the `internalId`.

Acceptance criteria:
- I can generate a Shift report and I should see any Agent's `customId` if it exists and `internalId` if it doesn't.

Estimated time/effort:
- 1 day

### Ticket #4 - Update the frontend UI on the platform to include a page to update an Agent's customId

Add a button to any Agent's profile page that opens a modal to change the Agent's ID. The modal should be simple, displaying the current ID of the Agent, a text box with placeholder text ("Enter a custom ID"), and a submit button. If the user wants to cancel the change, they can close the modal by clicking outside of the modal or in a little "x" button in the upper right corner of the modal. When they click submit, the modal should close while the Agent's ID is updated. The new ID should be reflected on the Agent's profile page. If no ID is entered into the text box, a `customId` exists for said Agent, and someone presses the submit button, a warning to delete the custom ID should replace the modal with an additional confirmation button that says "DELETE".

Acceptance criteria:
- I can open a new modal on the Agent's profile page to update their ID
- I can delete an Agent's `customID` by submitting a blank text box and clicking "DELETE"
- I can close the new modal by clicking outside of the modal or by clicking on the "x" in the corner

Estimated time/effort:
- 2 days