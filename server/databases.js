const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const placeSchema = {
  id: String,
  name: String,
  temperature: Number,
  image: String,
  description: String,
};

const Place = mongoose.model("Place", placeSchema);

const getRecentPlaces = () => {
  let availablePlaces;
  Place.find({}, function (err, places) {
    availablePlaces = places;
  });

  return availablePlaces;
};

const addCurrentPlace = (place) => {
  //First search if the current place already exists
  const newPlace = new Place({
    name: place.name,
    temperature: place.temperature,
    image: place.image,
    description: place.description,
  });

  newPlace.save(function (err) {
    if (!err) {
      return;
    }
  });
};

const deleteSelectedPlace = (id) => {
  Place.deleteOne({ _id: id.toString() }, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  getRecentPlaces,
  addCurrentPlace,
  deleteSelectedPlace,
};
