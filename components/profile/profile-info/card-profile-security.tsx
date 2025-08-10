import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

const CardProfileSecurity = () => {
  const decodedToken = useAuthStore((state) => state.decodedToken);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keamanan Akun</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Password</h4>
            <p className="text-sm text-gray-600">
              Terakhir diubah 3 bulan lalu
            </p>
          </div>
          <Button variant="outline">Ubah Password</Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">Verifikasi Email</h4>
            {decodedToken?.isVerified ? (
              <p className="text-sm text-green-600">
                ✓ Email sudah terverifikasi
              </p>
            ) : (
              <p className="text-sm text-red-600">Email Belum terverifikasi</p>
            )}
          </div>

          {decodedToken?.isVerified ? (
            <Badge className="bg-green-100 text-green-800">Terverifikasi</Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800">
              Belum Terverifikasi
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProfileSecurity;
