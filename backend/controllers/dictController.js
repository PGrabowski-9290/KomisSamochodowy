const DictService = require('../service/dictService');

const handleGetFuels = async (req,res) => {
  const fuels = await DictService.getFuels();
  console.log(fuels)
  res.status(200).json({fuels});
}

const handleGetBrands = async (req,res) => {
  const brands = await DictService.getBrands();
  console.log(brands)
  res.status(200).json({brands});
}

module.exports = { handleGetFuels, handleGetBrands }