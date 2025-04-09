import { userRouter } from "./user_routes.js";

export const routes = (app) => {
  app.use("/", (req, res) => {
    res.render("home", {
      isShow: true,
      helpers: {
        message() {
          return "LAP TRINH THAT DE";
        },
        noti() {
          return "ERROR";
        },
      },
    });
  });

  app.use("/user", userRouter);

  app.use("/login", (req, res) => {
    res.render("login");
  });
};
