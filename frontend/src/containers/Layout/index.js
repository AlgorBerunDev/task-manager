import React, { useContext } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import GlobalContext from "../../providers/GlobalContext";
import Container from "../../components/Container";

const LayoutSidebar = styled.div`
  height: 100vh;
  width: 200px;
`;

const LayoutMainContent = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 20px 10px;
  overflow: auto;
  flex-grow: 1;
`;

const Layout = styled.div`
  margin-top: 70px;
  display: flex;
  width: 100%;
`;

export default function LayoutContainer({ children }) {
  const {
    globalState: { user },
  } = useContext(GlobalContext);

  return (
    <Container>
      <Layout>
        {user && (
          <LayoutSidebar>
            <Sidebar user={user} />
          </LayoutSidebar>
        )}
        <LayoutMainContent>{children}</LayoutMainContent>
      </Layout>
    </Container>
  );
}
