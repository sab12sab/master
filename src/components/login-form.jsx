import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useContext, useState } from "react";
import { signup } from "@/Services/userServices";
import { AuthContext } from "@/ContexT/ContextAPI";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin,setsadmin]=useState(false)

  const {signup_h}=useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    signup_h({firstName,lastName,email,password,isAdmin})
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">lastName</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            placeholder="lastName"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">lastName</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="firstName"
            type="text"
            placeholder="lastName"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
          />
        </div>
       
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <Mail></Mail>
          Login with Email
        </Button>
      </div>
      <div className="text-center text-sm">
        have an account?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="underline underline-offset-4"
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
