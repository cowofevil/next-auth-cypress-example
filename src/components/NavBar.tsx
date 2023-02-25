import { Link } from "./Link";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
  const { status } = useSession();

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} href="/">
          Note Taker
        </Navbar.Brand>
        {status === "authenticated" && (
          <Button
            aria-label="logout-button"
            className="d-flex"
            variant="outline-success"
            onClick={() => void signOut()}
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
