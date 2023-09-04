import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RegistrationPage from "./components/RegistrationPage";

import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import CompletedTaskMetrics from "./pages/CompletedTaskMetrics";
import TaskDetails from "./pages/TaskDetails";
import LayoutContainer from "./containers/Layout";
import axios from "axios";
import GlobalProvider from "./providers/GlobalProvider";
import LoginPageContainer from "./containers/LoginPageContainer";
import PrivateContainer from "./containers/PrivateContainer";

const App = () => {
  const [user, setUser] = useState(null);

  const handleRegister = (username, password, role) => {
    axios
      .post("/api/auth/register", { username, password, roles: [role] })
      .then(({ data: { token, user } }) => {
        localStorage.setItem("token", token);
        setUser(user);
      })
      .catch(err => console.error(err));
  };

  return (
    <Router>
      <GlobalProvider>
        <Switch>
          <Route path="/login" render={() => <LoginPageContainer />} />
          <Route path="/register" render={() => <RegistrationPage onRegister={handleRegister} />} />
          <LayoutContainer user={user}>
            <PrivateContainer path="/users" component={Users} allowRoles={["admin", "employee"]} />
            <PrivateContainer
              path="/users/:userId/completedTaskMetrics"
              component={CompletedTaskMetrics}
              allowRoles={["admin", "employee"]}
            />
            <PrivateContainer path="/tasks" component={Tasks} exact allowRoles={["admin", "employee"]} />
            <PrivateContainer path="/tasks/:taskId" component={TaskDetails} allowRoles={["admin", "employee"]} />
          </LayoutContainer>
        </Switch>
      </GlobalProvider>
    </Router>
  );
};

export default App;
