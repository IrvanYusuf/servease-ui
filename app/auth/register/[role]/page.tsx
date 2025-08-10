import RegisterPage from "@/components/auth/register/register-page";

type Params = Promise<{ role: string }>;
export default async function CustomerRegisterPage({
  params,
}: {
  params: Params;
}) {
  const { role } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <RegisterPage role={role} />
    </div>
  );
}
