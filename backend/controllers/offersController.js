const OfferService = require('../service/offersService');

const handleGetOffert = async (req,res) => {
  const offerId = req.params.id;

  const resultDb = await OfferService.getOffert(offerId);
  if (!resultDb) return res.status(204).json({"message": "Nie znalezio oferty"});
  res.status(200).json(resultDb);
}

const handleGetAllOffers = async (req,res) => {
  const resultDb = await OfferService.getOffers();
  if (!resultDb) return res.status(204).json({"message": "Nie znalezio oferty"});
  res.status(200).json(resultDb);
}

// const handleAddOffert = async (req,res) => {
  
// }

module.exports = { handleGetOffert, handleGetAllOffers }