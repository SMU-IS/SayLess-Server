module.exports.getFood = async (res, parameter) => {
  const addFoodRef = db.collection("Food");
  addFoodRef
    .get()
    .then((snapshot) => {
      const formattedListings = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          cardImage: data.cardImage,
          cardTitle: data.cardTitle,
          cardSubTitle: data.cardSubTitle,
          details: data.details,
          pickUpTime: data.pickUpTime,
          distance: data.distance,
        };
      });

      return res.json(formattedListings);
    })
    .catch((error) => {
      return res.status(404).send("Resource not found");
    });
};
