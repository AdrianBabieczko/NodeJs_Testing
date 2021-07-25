const Jimp = require('jimp');

const addTextWatermarkToImage = async function(inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const textData = {
      text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };

  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);
};

const addImageWatermrkToImage = async function(inputFile, outputFile, waterMarkFile){
    const image = await Jimp.read(inputFile);
    const watermark = await Jimp.read(waterMarkFile);
    const x = image.getWidth()/2 - watermark.getWidth()/2; 
    const y = image.getHeight()/2 - watermark.getHeight()/2;

    image.composite(watermark,x,y, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,
    });

    await image.quality(100).writeAsync(outputFile);
}

addTextWatermarkToImage('./test.jpg', './test-with-watermark.jpg', 'Hello world');

addImageWatermrkToImage('./test.jpg', './test-with-watermarkImage.jpg', './watermark.jpg');