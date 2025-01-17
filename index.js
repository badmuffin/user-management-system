import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  // Start services
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    //simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "Steve",
      email: "steve@gmail.com",
    });
    console.log("New user created: ", newUser);

    const users = await UserService.call("user.getUsers");
    console.log("All user: ", users);

    //simulate sending email - welcome email to new user
    const Email = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform!",
      content: "Thankyou for Signing up",
    });
    console.log(Email);

    // simulate auth
    const authResult = await AuthService.call("auth.authUser", {
        username: newUser.username, // use 'admin' to pass the auth
        password: 'password',
    });
    console.log('Auth result: ', authResult)
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
