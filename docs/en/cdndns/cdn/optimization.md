# Optimization

In this section, a set of practical and automated features are provided to optimize the performance of all your website's subpages. By enabling these features, you can significantly increase the loading speed and user experience of your website.

:::tip[Inclusion and Exclusion of Optimization Rules]
The rules applied in this tab **affect all pages of your website globally**.  
If you need to **exclude specific pages from these rules** or **apply separate settings**, please refer to the [Rules](../rules) section.
:::

![CDN: cdn optimization](../img/cdn-optimization.png)

## Optimizable Items

### CSS and JavaScript Optimization

By enabling this feature, your CSS and JavaScript files are automatically optimized. This optimization includes compression, removal of whitespace and comments, and sometimes file concatenation, which reduces the overall resource size, resulting in faster page load times.

### CSS File Compression

All CSS files are made lighter by removing extra spaces, blank lines, and comments, allowing them to load faster.

### JavaScript File Compression

JavaScript scripts are similarly compressed to reduce their overall size. This improves client-side performance and enhances loading speed.

### Image Compression

By enabling this option, images are automatically converted to modern, lower-size formats like WebP. This reduces image size without noticeable quality loss, improving user experience.  
Images in JPG/JPEG/PNG formats are converted to WebP or similar formats to reduce their size.  
Animated GIFs are also compressed or converted to alternative formats with better performance to reduce bandwidth consumption.

### Image Resizing

By enabling this option, the size of uploaded or existing images on the website is adjusted to specified dimensions (e.g., based on device type or template design). This ensures that only an appropriately sized image is loaded on-the-fly for display, preventing the loading of unsuitable sizes. Benefits include reduced page size, improved performance on mobile and tablet devices, lower bandwidth usage, faster loading speeds, and better PageSpeed scores.

Examples of on-the-fly image resizing system:

| Request Type | Description                                                                                                                    | Example                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| crop         | `x,y`: Coordinates of the cropped rectangle's corner in the input image `width, height`: Width and height of the cropped image | `https://pa.th/to/image.png?commands=crop=x:y::widthxheight`                                     |
| grayscale    | Converts the image to black and white (grayscale)                                                                              | `https://pa.th/to/image.png?commands=grayscale`                                                  |
| rotate       | Rotates the image clockwise                                                                                                    | `https://pa.th/to/image.png?commands=rotate=degree`                                              |
| blur         | `degree`: Degree of image blur                                                                                                 | `https://pa.th/to/image.png?commands=blur=degree`                                                |
| resize       | `width, height`: Width and height of the output image                                                                          | `https://pa.th/to/image.png?commands=resize=widthxheight`                                        |
| pipe         | Executes a chain of multiple commands separated by commas (`,`)                                                                | `https://pa.th/to/image.png?commands=crop=150:150::200x200,grayscale,blur=1,rotate=10,rotate=40` |
