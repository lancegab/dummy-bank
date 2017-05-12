# Lab Exercise 4: Improving the Dummy Bank

(members: )

There are several things in the **Dummy Bank** application which can be improved. Your goal is to complete the following checklist of tasks that need to be implemented/fixed/refactored.


Tasks:

1. **Eliminate deprecation warnings when running the server**
1. **Implement deposit functionality**
   - In the profile page, add a form wherein the user can deposit an amount to his/her account.
1. **Implement withdraw functionality**
   - In the profile page, add a form wherein the user can withdraw an amount to his/her account.
1. **Create `Account` instance on sign up**
   - Currently, when signing up only a `User` instance is created. Modify the signup workflow to also create an `Account` instance for that user after the user signs up.
   - Make sure to do them within a database transaction to make sure that all changes are discarded if either operation fails.
1. **Implement `retrieveSignedInUser` middleware**
   - This middleware should add the currently signed in user's `User` instance to `req.user`.
   - Also use the middleware in parts of the existing code wherein it would add improvements in terms of removing repetitive code, etc.
1. **Move Twitter sign in routes to `routes/twitter.js`**
   - Make sure sign in with Twitter still works.
1. **Move `auth-routes.js` to `routes/auth.js`**
   - Make sure authentication still works.
1. **Add `name` field to the `User` model.**
   - This field will contain the user's full name retrieved from Twitter sign in.
1. **Display user's name in profile page**
   - If the name is not available, display email instead.
1. **Optimize the database queries in the `/transfer` route**
   - There are four queries that could be optimized:
     - Getting the sender `User` instance
     - Getting the receiver `User` instance
     - Getting the sender `Account` instance using the id from the `User` instance
     - Getting the receiver `Account` instance using the id from the `User` instance
   - Reduce them to a fewer number of queries.
   - Hint: You can use SQL JOINs or sub-queries.
   - You may run [raw SQL queries](http://sequelize.readthedocs.io/en/v3/docs/raw-queries/) if you want to.


Bonus Tasks:

- [ ] Make the dummy bank pages look good.
- [ ] Implement another social authentication besides Twitter
  - You can do signin with Google, Facebook, Github, etc.


Instructions:

- This lab exercise will be done by group.
  - You may choose your own groupmates.
  - Each group must have a maximum of three members.
  - Update `(members: )` at the top of this file with a comma-separated list of your group's Gitlab usernames.
- Fork this repository into one group member's personal account.
- Indicate which bonus tasks did you implement.
  - Change `[ ]` in the **Bonus Tasks** list to `[x]`


Due Date: **May 12, 2017 (Friday), 11:59PM**


Good luck! :)
