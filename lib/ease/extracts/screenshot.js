const options = {
  fullpage: true,
  type: 'png'
};

async function screenshot(page, captureScreenshotImage) {
  let error = null;
  let screenshot = null;
  let timestamp = +new Date();
  let dataURI = function(imageBuffer) {
    return [
      'data:image/png;base64',
      imageBuffer.toString('base64')
    ].join(',');
  };

  if (captureScreenshotImage) {
    try {
      screenshot = dataURI(await page.screenshot(options));
    } catch (e) {
      error = e;
    }
  }

  return {screenshot, timestamp, error};
}

module.exports = screenshot;
