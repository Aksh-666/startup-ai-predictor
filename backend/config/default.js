module.exports = {
  port: process.env.PORT || 5000,
  mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:8000/predict',
};
