// here all api endpoints from server/BE

export const ENDPOINTS = {
  categories: {
    root: "/v1/categories",
    detail: (categoryId: string) => `/v1/categories/detail/${categoryId}`,
  },
  banners: {
    root: "/v1/banners",
  },
  videos: {
    root: "/v1/videos",
  },
  auths: {
    register: "/v1/auths/register",
    login: "/v1/auths/login",
  },
  users: {
    root: "/v1/users",
    detail: `/v1/users/detail`,
  },
  partners: {
    root: "/v1/partners",
    delete: (partnerId: string) => `/v1/partners/${partnerId}`,
  },
  services: {
    root: "/v1/services",
    search: "/v1/services/search",
    popular: "/v1/services/popular",
    findByCategory: (categoryId: string) =>
      `/v1/services/category/${categoryId}`,
    detail: (serviceId: string) => `/v1/services/detail/${serviceId}`,
    reviews: (serviceId: string) => `/v1/services/reviews/${serviceId}`,
  },
  addresses: {
    root: "/v1/addresses",
    setPrimary: (addressId: string) => `/v1/addresses/${addressId}/set-primary`,
    update: (addressId: string) => `/v1/addresses/${addressId}/update`,
    getPrimary: "/v1/addresses/primary",
  },
  paymentMethods: {
    root: "/v1/payment-methods",
  },
  bookings: {
    root: "/v1/bookings",
    totalBooking: "/v1/bookings/total-booking",
    totalBookingCompleted: "/v1/bookings/total-booking-completed",
    totalBookingNotReviewed: "/v1/bookings/total-booking-not-reviewed",
    detail: (bookingId: string) => `/v1/bookings/detail/${bookingId}`,
    uploadPaymentProof: (bookingId: string) =>
      `/v1/bookings/payment-proof/${bookingId}`,
    completeBooking: (bookingId: string) =>
      `/v1/bookings/complete/${bookingId}`,
  },
  reviews: {
    root: "/v1/reviews",
    totalReview: "/v1/reviews/total-review",
    update: (reviewId: string) => `/v1/reviews/${reviewId}`,
    delete: (reviewId: string) => `/v1/reviews/${reviewId}`,
  },

  userLocation: {
    root: (latitude: number, longitude: number) =>
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  },

  dashboard: {
    partners: {
      bookings: {
        root: "/v1/dashboard/partners/bookings",
        confirm: (customer_id: string, booking_id: string) =>
          `/v1/dashboard/partners/bookings/confirm/${customer_id}/${booking_id}`,
        totalBooking: "/v1/dashboard/partners/bookings/total-booking",
        totalRevenue: "/v1/dashboard/partners/bookings/total-revenue",
        totalRevenuePending:
          "/v1/dashboard/partners/bookings/total-revenue-pending",
        totalMonthlyRevenue:
          "/v1/dashboard/partners/bookings/total-monthly-revenue",
        totalCompletedBooking:
          "/v1/dashboard/partners/bookings/total-completed-booking",
        totalCompletedBookingUser: (userId: string) =>
          `/v1/dashboard/partners/bookings/total-completed-booking-user/${userId}`,
        totalPendingBooking:
          "/v1/dashboard/partners/bookings/total-pending-booking",
        totalCancelledBooking:
          "/v1/dashboard/partners/bookings/total-cancelled-booking",
        totalConfirmedBooking:
          "/v1/dashboard/partners/bookings/total-confirmed-booking",
      },
      services: {
        root: "/v1/dashboard/partners/services",
        totalServices: "/v1/dashboard/partners/services/total-services",
      },
      reviews: {
        root: "/v1/dashboard/partners/reviews",
        totalNotReviewed: "/v1/dashboard/partners/reviews/total-not-reviewed",
        totalAllReviewed: "/v1/dashboard/partners/reviews/total-all-review",
      },
      earnings: {
        history: "/v1/dashboard/partners/earnings/earning-history",
        historyWithdraw: "/v1/dashboard/partners/earnings/withdraw-history",
        withdraw: "/v1/dashboard/partners/earnings/withdraw",
        balance: "/v1/dashboard/partners/earnings/balance",
        totalMonthlyWithdraw:
          "/v1/dashboard/partners/earnings/total-monthly-withdraw",
      },
    },
  },
};
