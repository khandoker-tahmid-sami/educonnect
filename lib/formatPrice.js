export const formatPrice = (price) => {
  return Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "nok",
  }).format(price);
};

// shows currency in english ex: Nok
// export const formatPrice = (price) => {
//   return Intl.NumberFormat("en-NO", {
//     style: "currency",
//     currency: "nok",
//   }).format(price);
// };
