import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

export const getImageColors = (imgURL) =>
  app.models
    .predict(Clarifai.COLOR_MODEL, `https://image.tmdb.org/t/p/w92${imgURL}`)
    .then((response) => {
      let color = response.outputs[0].data.colors.sort(
        (a, b) => a.value - b.value
      )[response.outputs[0].data.colors.length - 1].raw_hex;
      let color1 = response.outputs[0].data.colors.sort(
        (a, b) => a.value - b.value
      )[response.outputs[0].data.colors.length - 2].raw_hex;
      let newColor = color.toUpperCase().split('');
      newColor.splice(7, 0, 'E6');
      return [newColor.join(''), color, color1];
    })
    .catch((err) => {
      // console.log(err);
      return ['#212121e7', '#212121', '#ffc107'];
    });
