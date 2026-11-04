export const allowedServices = new Set([
  "3D Motion Design",
  "Product Animation",
  "CGI Advertising",
  "Brand Animation",
  "Visual Effects",
  "Creative Direction",
  "Something else entirely",
]);

export async function saveInquiry(db, inquiry) {
  return db.collection("enquiries").insertOne(inquiry);
}
