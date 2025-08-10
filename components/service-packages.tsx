"use client"

import { useState } from "react"
import { CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const packages = [
  {
    id: "basic",
    name: "Basic Service",
    price: 150000,
    duration: "2 jam",
    description: "Service dasar untuk maintenance rutin AC",
    features: [
      "Pembersihan filter AC",
      "Pembersihan indoor unit",
      "Pengecekan freon",
      "Pengecekan sistem kelistrikan dasar",
    ],
    notIncluded: ["Pembersihan outdoor unit", "Isi freon", "Perbaikan komponen rusak"],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Service",
    price: 250000,
    duration: "3 jam",
    description: "Service lengkap dengan pembersihan menyeluruh",
    features: [
      "Semua fitur Basic Service",
      "Pembersihan outdoor unit",
      "Pembersihan evaporator",
      "Pengecekan tekanan freon",
      "Tune-up sistem",
      "Garansi 30 hari",
    ],
    notIncluded: ["Isi freon (jika diperlukan)", "Perbaikan komponen rusak"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Service",
    price: 350000,
    duration: "4 jam",
    description: "Service premium dengan garansi extended",
    features: [
      "Semua fitur Standard Service",
      "Isi freon (jika diperlukan)",
      "Pembersihan dengan chemical wash",
      "Penggantian filter (jika diperlukan)",
      "Pengecekan menyeluruh semua komponen",
      "Garansi 60 hari",
      "Follow-up service gratis",
    ],
    notIncluded: ["Perbaikan komponen rusak berat"],
    popular: false,
  },
]

interface ServicePackagesProps {
  onPackageSelect: (packageId: string) => void
}

export default function ServicePackages({ onPackageSelect }: ServicePackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState("standard")

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    onPackageSelect(packageId)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Pilih Paket Layanan</h3>
        <p className="text-gray-600">Pilih paket yang sesuai dengan kebutuhan Anda</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedPackage === pkg.id ? "ring-2 ring-blue-600 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            {pkg.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Paling Populer</Badge>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">Rp {pkg.price.toLocaleString("id-ID")}</div>
                <div className="text-sm text-gray-600">{pkg.duration}</div>
              </div>
              <p className="text-sm text-gray-600">{pkg.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-3 text-green-700">✓ Yang Termasuk:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.notIncluded.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-red-700">✗ Tidak Termasuk:</h4>
                  <ul className="space-y-2">
                    {pkg.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <X className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className={`w-full ${
                  selectedPackage === pkg.id ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => handleSelectPackage(pkg.id)}
              >
                {selectedPackage === pkg.id ? "Terpilih" : "Pilih Paket"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">💡 Tips Memilih Paket:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            • <strong>Basic:</strong> Cocok untuk AC yang rutin diservice (3-6 bulan sekali)
          </li>
          <li>
            • <strong>Standard:</strong> Ideal untuk AC yang jarang diservice (6-12 bulan)
          </li>
          <li>
            • <strong>Premium:</strong> Terbaik untuk AC bermasalah atau belum pernah diservice
          </li>
        </ul>
      </div>
    </div>
  )
}
