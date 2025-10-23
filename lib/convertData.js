export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        farmerId: item.farmerId ? item.farmerId.toString() : undefined,
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj) return null;
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

// export const replaceMongoIdInObject = (obj) => {
//   if (!obj) return null; // <- guard!

//   const rawId = obj._id;
//   const id =
//     rawId && typeof rawId.toString === "function"
//       ? rawId.toString()
//       : String(rawId ?? "");

//   const { _id, __v, ...rest } = obj;
//   return { id, ...rest };
// };
