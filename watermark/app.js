const jimp = require('jimp');
const inquirer = require('inquirer');

const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
    const image = await jimp.read(inputFile);
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);

    const textData = {
        text,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_MIDDLE,
    };

    image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
    await image.quality(100).writeAsync(outputFile);
};

const addImageWatermrkToImage = async function (inputFile, outputFile, waterMarkFile) {
    const image = await jimp.read(inputFile);
    const watermark = await jimp.read(waterMarkFile);
    const x = image.getWidth() / 2 - watermark.getWidth() / 2;
    const y = image.getHeight() / 2 - watermark.getHeight() / 2;

    image.composite(watermark, x, y, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,
    });

    await image.quality(100).writeAsync(outputFile);
}

const startApp = async () => {
    //Ask if user is ready
    const answer = await inquirer.prompt([{
        name: 'start',
        message: 'Hi! Welcome to "Watermark manager". Copy your image files to `/img` folder. Then you\`ll be able to use them in the app. Are you ready?',
        type: 'confirm'
    }]);

    //if answer is no, just quit the app
    if (!answer.start) process.exit();

    //ask about input file and watermark type
    const options = await inquirer.prompt([{
        name: 'inputImage',
        type: 'input',
        message: 'What file do you want to mark?',
        default: 'test.jpg',
    }, {
        name: 'watermarkType',
        type: 'list',
        choices: ['Text watermark', 'Image watermark'],
    }]);

    if (options.watermarkType == 'Text watermark') {
        const text = await inquirer.prompt([{
            name: 'value',
            type: 'input',
            message: 'Type yor watermark text:',
        }]);
        options.watermarkText = text.value;

        const inputFile = './img/' + options.inputImage;
        const outputFile = './test-with-watermark.jpg';

        addTextWatermarkToImage(inputFile, outputFile, options.watermarkText);
    }
    else {
        const image = await inquirer.prompt([{
            name: 'filename',
            type: 'input',
            message: 'Type your watermark name:',
            default: 'logo.jpg',
        }]);

        options.watermarkImage = image.filename;

        const inputFile = './img/' + options.inputImage;
        const outputFile = './test-with-watermarkImage.jpg';
        const logoFile = './img/' + options.watermarkImage;

        addImageWatermrkToImage(inputFile, outputFile, logoFile);
    }
}

startApp();