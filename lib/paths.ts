export const PATHS = {
  auth: {
    login: "/auth/login",
    register: {
      root: (role: string) => `/auth/register/${role}`,
      choose: "/auth/register/choose",
    },
  },
  home: {
    root: "/",
    category: {
      listServicesByCategory: (categoryId: string) => `/category/${categoryId}`,
    },
    service: {
      detail: (serviceId: string) => `/service/${serviceId}`,
    },
    booking: {
      root: "/booking",
      payment: (bookingId: string) =>
        `/booking/payment?booking_id=${bookingId}`,
    },
  },

  profile: {
    root: "/profile",
    booking: {
      root: "/profile/orders",
      detail: (bookingId: string) => `/profile/orders/${bookingId}`,
    },
    order: {
      root: "/profile/orders",
    },
    review: {
      root: "/profile/reviews",
    },
    address: {
      root: "/profile/addresses",
    },
  },
  dashboard: {
    root: "/dashboard",
    bookings: {
      root: "/dashboard/bookings",
      detail: (bookingId: string) => `/dashboard/bookings/${bookingId}`,
    },
    reviews: {
      root: "/dashboard/reviews",
    },
    earnings: {
      root: "/dashboard/earnings",
      withdrawalDetail: (withdrawalId: string) =>
        `/dashboard/earnings/withdrawals/${withdrawalId}`,
    },
    partners: {
      root: "/dashboard/partners",
    },
    services: {
      root: "/dashboard/services",
    },
  },
};
