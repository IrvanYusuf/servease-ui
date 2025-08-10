import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

const BookingDetailQuickAction = () => {
  const handleCallCustomer = () => {
    window.open(`tel:123444344`);
  };

  const handleWhatsAppCustomer = () => {
    const message = `Halo john, terkait pesanan #1234434. Ada yang bisa saya bantu?`;
    window.open(`https://wa.me/12920821810811818`);
  };
  return (
    <div className="flex space-x-3 justify-end">
      <Button
        onClick={handleCallCustomer}
        className="flex items-center cursor-pointer bg-green-600 hover:bg-green-700"
      >
        <Phone className="w-6 h-6" />
        <span className="text-sm font-medium">Telepon Customer</span>
      </Button>
      <Button
        onClick={handleWhatsAppCustomer}
        variant="outline"
        className="flex items-center cursor-pointer hover:bg-green-50 bg-transparent"
      >
        <MessageCircle className="w-6 h-6 text-green-600" />
        <span className="text-sm font-medium">WhatsApp</span>
      </Button>
    </div>
  );
};

export default BookingDetailQuickAction;
