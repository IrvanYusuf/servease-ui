import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";

const CardSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Butuh Bantuan?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-600">
          <p>Customer Service 24/7</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 cursor-pointer">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-transparent cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSupport;
