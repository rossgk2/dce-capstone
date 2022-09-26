# DCE Project

The customer story here is the teacher's students struggle, and she wants to set them up for success, so they have to pass a practice test before they can take the final. 
She has a practice test that she wants digitized so she can just have the students go to the student portal and generate it as needed.
In addition, she wants the questions randomized, so generating the document on the fly would be needed. 

The app does this in a low-code approach by offloading the heavy lifting to a Power Automate flow. This keeps the development time low, and a portion of it is able to be done by non-developers. 
This allows for the functionality to be changed with little effort, since all that would need to change on the app side is the JSON sent to Power Automate, and everything else would change in Power Automate. Some of the things that could be easily changed via the JSON sent and a Flow update would be what template is used, and the list of questions, among other things.

We would use an Agile methodology and prioritize use cases during discovery meetings with the customer.

- Angular app is in the dce-capstone folder, Angular-specific README is in there. Once built and started, the app should work as it calls a Power Automate flow and no APIs directly. No authentication keys needed, it is all handled in Power Automate. 
- Zip file is the Microsoft Power Automate flow. If you install and want to use your flow, you just need to replace the URL in the practice test component code. 
- The no-array JSON file is used for the document tagging plugin, as the Doc Gen API does not know how to handle JSON arrays, which isn't in the documentation and is a good thing to know!
- The sample data JSON is used to pull random questions (a version of this is also in the app)
- The schema file is the same schema used in the Power Automate flow. 
