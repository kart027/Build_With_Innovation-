To Run clone this repo and run command npm install and after that field file config.env with all details. And then run node index.js
Below are endpoints
User Routes

Register User
Route: POST /user/register
Middleware: singleupload, register function from UserConstroller
Purpose: Registers a new user in the system.

User Login
Route: POST /user/login
Controller: login function from UserConstroller
Purpose: Authenticates user login credentials.

User Logout
Route: GET /user/logout
Controller: logout function from UserConstroller
Purpose: Logs out the currently authenticated user.

Get User Profile
Route: GET /user/getmyprofile
Middleware: isAuthenticated
Controller: getMyprofile function from UserConstroller
Purpose: Retrieves the profile of the authenticated user.

Delete User Profile
Route: GET /user/deletemyProfile
Middleware: isAuthenticated
Controller: deleteMyprofile function from UserConstroller
Purpose: Deletes the profile of the authenticated user.
Update User Profile Picture

Route: PUT /user/updateprofilepicture/:id
Middleware: isAuthenticated, singleupload
Controller: Updateprofilepicture function from UserConstroller
Purpose: Updates the profile picture of a specific user.

Admin Routes
Register Admin
Route: POST /admin/registerAdmin
Middleware: singleupload
Controller: register function from AdminControllers
Purpose: Registers a new admin in the system.
Get All Users (Admin Access)

Route: GET /admin/getUsers
Middleware: isAuthenticated, isAuthorizedadmin
Controller: getallUser function from AdminControllers
Purpose: Fetches all user profiles accessible to admins.

Update User Role (Admin Access)
Route: GET /admin/updaterole/:id
Middleware: isAuthenticated, isAuthorizedadmin
Controller: updateUserrole function from AdminControllers
Purpose: Modifies the role of a specific user.

Delete User (Admin Access)
Route: DELETE /admin/deleteusers/:id
Middleware: isAuthenticated, isAuthorizedadmin
Controller: deleteUser function from AdminControllers
Purpose: Deletes a specific user.

Delete All Users (Except Admins)
Route: DELETE /admin/deleteusers
Middleware: isAuthenticated, isAuthorizedadmin
Controller: deleteAllUser function from AdminControllers
Purpose: Deletes all users except admin accounts.

Delete Admin Profile
Route: DELETE /admin/deleteMyProfile
Middleware: isAuthenticated, isAuthorizedadmin
Controller: deleteMyprofile function from AdminControllers
Purpose: Deletes the profile of the authenticated admin.

Update Admin Profile Picture
Route: PUT /admin/updateprofile/:id
Middleware: isAuthenticated, isAuthorizedadmin, singleupload
Controller: Updateprofilepicture function from UserControllers
Purpose: Updates the profile picture of a specific admin.




Now Some of the functionalites include
Authentication with JWT
JWT Token Generation
Functionality: Users are authenticated using JWT tokens upon login.
Implementation:
When a user successfully logs in, a JWT token is generated and sent to the client.
This token is used for subsequent authenticated requests.

Protected Routes
Functionality: Certain routes are protected and require authentication to access.
Implementation:
Middleware function isAuthenticated verifies the presence and validity of the JWT token in the request cookies.
If the token is valid, the user's details are extracted from the token and attached to the request object (req.user).

Admin Authorization
Functionality: Admin-specific functionalities require elevated access.
Implementation:
Middleware function isAuthorizedadmin ensures that the user accessing certain routes has an "admin" role.
Protects admin-specific routes and actions.

2. Secure Password Handling
Password Encryption
Functionality: User passwords are securely encrypted before storing in the database.
Implementation:
The UserSchema.pre('save') middleware hashes the user's password using bcrypt before saving it in the database.
Ensures password confidentiality and security.

4. File Upload Security
Cloudinary Integration
Functionality: Allows secure file uploads and management using Cloudinary.
Implementation:
Utilizes Cloudinary for storing and managing user profile images.
Middleware singleupload handles file uploads, ensuring secure storage and retrieval.

6. Error Handling for Security Measures
Error Middleware
Functionality: Proper error handling for security-related issues.
Implementation:
Error handling middleware (ErrorMiddleware) is used to manage and respond appropriately to authentication and authorization errors.
Custom error messages are sent back for various security-related issues (e.g., unauthorized access, invalid tokens).
