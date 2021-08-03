import AuthenticatedOnly from "../components/authentication/AuthenticatedOnly";

export default function Index() {
  return (
    <>
      <AuthenticatedOnly></AuthenticatedOnly>
    </>
  );
}
