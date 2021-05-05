import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '01eb4e384a4440269521ec2fc28521e0',
});

export const getImageColors = (imgURL) => {
  console.log('imgURL', imgURL)
  return app.models
    .predict(Clarifai.COLOR_MODEL, imgURL)
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
      console.log(err)
      // return ['#cae0e0', '#0edfe3', '#f0ec0c']
      return ['Failed Request', 'Failed Request'];
    });
};
