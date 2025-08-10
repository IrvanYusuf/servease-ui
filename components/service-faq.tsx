"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    id: 1,
    question: "Berapa lama waktu yang dibutuhkan untuk service AC?",
    answer:
      "Waktu service AC bervariasi tergantung kondisi dan paket yang dipilih. Untuk service basic biasanya 2 jam, standard 3 jam, dan premium 4 jam. Teknisi akan memberikan estimasi waktu yang lebih akurat setelah melihat kondisi AC.",
  },
  {
    id: 2,
    question: "Apakah teknisi membawa peralatan sendiri?",
    answer:
      "Ya, teknisi akan membawa semua peralatan dan tools yang diperlukan untuk service AC. Namun jika diperlukan spare part pengganti, akan dikonfirmasi terlebih dahulu kepada pelanggan.",
  },
  {
    id: 3,
    question: "Bagaimana jika AC masih bermasalah setelah service?",
    answer:
      "Kami memberikan garansi service sesuai paket yang dipilih (30-60 hari). Jika dalam masa garansi AC masih bermasalah, teknisi akan datang kembali tanpa biaya tambahan untuk memperbaikinya.",
  },
  {
    id: 4,
    question: "Apakah bisa service di hari yang sama?",
    answer:
      "Tergantung ketersediaan teknisi. Untuk service same day, silakan hubungi customer service kami atau pilih slot 'Tersedia Hari Ini' saat booking. Biasanya tersedia untuk area Jakarta dengan tambahan biaya urgent.",
  },
  {
    id: 5,
    question: "Metode pembayaran apa saja yang diterima?",
    answer:
      "Kami menerima pembayaran tunai, transfer bank, dan e-wallet (GoPay, OVO, DANA). Pembayaran dilakukan setelah service selesai untuk cash, atau sebelum teknisi datang untuk transfer/e-wallet.",
  },
  {
    id: 6,
    question: "Apakah ada biaya tambahan selain yang tertera?",
    answer:
      "Harga yang tertera sudah termasuk jasa service sesuai paket. Biaya tambahan hanya berlaku untuk spare part pengganti (jika diperlukan) dan akan dikonfirmasi terlebih dahulu kepada pelanggan.",
  },
  {
    id: 7,
    question: "Bagaimana cara membatalkan atau reschedule booking?",
    answer:
      "Pembatalan atau reschedule dapat dilakukan maksimal 2 jam sebelum jadwal service melalui WhatsApp atau telepon ke customer service. Untuk pembatalan mendadak, mungkin dikenakan biaya administrasi.",
  },
  {
    id: 8,
    question: "Apakah teknisi sudah divaksin dan menerapkan protokol kesehatan?",
    answer:
      "Ya, semua teknisi kami sudah divaksin lengkap dan selalu menerapkan protokol kesehatan. Teknisi akan menggunakan masker, membawa hand sanitizer, dan menjaga jarak saat bekerja.",
  },
]

export default function ServiceFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h3>
        <p className="text-gray-600">Temukan jawaban untuk pertanyaan umum tentang layanan kami</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.id} className="overflow-hidden">
            <CardContent className="p-0">
              <button
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 pr-4">{faq.question}</h4>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h4 className="font-medium mb-2">Masih ada pertanyaan?</h4>
        <p className="text-gray-600 mb-4">Tim customer service kami siap membantu Anda</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+622112345678"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Telepon: +62 21 1234 5678
          </a>
          <a
            href="https://wa.me/6281234567890"
            className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            WhatsApp: +62 812 3456 7890
          </a>
        </div>
      </div>
    </div>
  )
}
