import {Container, ContainerHeader, ContainerHeaderTitle} from "component@/layout/Container.tsx";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/link";
import {Input} from "@nextui-org/input";
import {LockIcon, MailIcon} from "lucide-react";
import {Checkbox} from "@nextui-org/checkbox";

export const Login = () => {
  return (
    <Container>
      <ContainerHeader>
        <ContainerHeaderTitle className="text-center w-full">Login</ContainerHeaderTitle>
      </ContainerHeader>
      <Card className="max-w-md mx-auto p-2">
        <CardBody className="space-y-4">
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </CardBody>
        <CardFooter className="space-x-2 justify-end">
          <Button color="primary">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}